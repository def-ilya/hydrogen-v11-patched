import { getLoggerWithContext, collectQueryCacheControlHeaders, } from '../../utilities/log';
import { deleteItemFromCache, generateSubRequestCacheControlHeader, getItemFromCache, isStale, setItemInCache, } from '../../framework/cache';
import { runDelayedFunction } from '../../framework/runtime';
import { useRequestCacheData, useServerRequest } from '../ServerRequestProvider';
/**
 * The `useQuery` hook is a wrapper around Suspense calls and
 * global runtime's Cache if it exists.
 * It supports Suspense calls on the server and on the client.
 */
export function useQuery(
/** A string or array to uniquely identify the current query. */
key, 
/** An asynchronous query function like `fetch` which returns data. */
queryFn, 
/** Options including `cache` to manage the cache behavior of the sub-request. */
queryOptions) {
    const withCacheIdKey = ['__QUERY_CACHE_ID__', ...key];
    return useRequestCacheData(withCacheIdKey, cachedQueryFnBuilder(withCacheIdKey, queryFn, queryOptions));
}
function cachedQueryFnBuilder(key, queryFn, queryOptions) {
    const resolvedQueryOptions = {
        ...(queryOptions !== null && queryOptions !== void 0 ? queryOptions : {}),
    };
    /**
     * Attempt to read the query from cache. If it doesn't exist or if it's stale, regenerate it.
     */
    async function cachedQueryFn() {
        // Call this hook before running any async stuff
        // to prevent losing the current React cycle.
        const request = useServerRequest();
        const log = getLoggerWithContext(request);
        const cacheResponse = await getItemFromCache(key);
        async function generateNewOutput() {
            return await queryFn();
        }
        if (cacheResponse) {
            const [output, response] = cacheResponse;
            collectQueryCacheControlHeaders(request, key, response.headers.get('cache-control'));
            /**
             * Important: Do this async
             */
            if (isStale(response)) {
                log.debug('[useQuery] cache stale; generating new response in background');
                const lockKey = `lock-${key}`;
                runDelayedFunction(async () => {
                    log.debug(`[stale regen] fetching cache lock`);
                    const lockExists = await getItemFromCache(lockKey);
                    if (lockExists)
                        return;
                    await setItemInCache(lockKey, true);
                    try {
                        const output = await generateNewOutput();
                        await setItemInCache(key, output, resolvedQueryOptions === null || resolvedQueryOptions === void 0 ? void 0 : resolvedQueryOptions.cache);
                    }
                    catch (e) {
                        log.error(`Error generating async response: ${e.message}`);
                    }
                    finally {
                        await deleteItemFromCache(lockKey);
                    }
                });
            }
            return output;
        }
        const newOutput = await generateNewOutput();
        /**
         * Important: Do this async
         */
        runDelayedFunction(async () => await setItemInCache(key, newOutput, resolvedQueryOptions === null || resolvedQueryOptions === void 0 ? void 0 : resolvedQueryOptions.cache));
        collectQueryCacheControlHeaders(request, key, generateSubRequestCacheControlHeader(resolvedQueryOptions === null || resolvedQueryOptions === void 0 ? void 0 : resolvedQueryOptions.cache));
        return newOutput;
    }
    return cachedQueryFn;
}
