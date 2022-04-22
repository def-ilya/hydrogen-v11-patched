/// <reference types="node" />
import type { ServerResponse } from 'http';
import type { Logger } from './utilities/log/log';
import type { ServerComponentRequest } from './framework/Hydration/ServerComponentRequest.server';
import type { ServerComponentResponse } from './framework/Hydration/ServerComponentResponse.server';
import type { Metafield, Image, MediaContentType } from './graphql/types/types';
declare type CommonOptions = {
    App: any;
    pages?: ImportGlobEagerOutput;
    request: ServerComponentRequest;
    componentResponse: ServerComponentResponse;
    log: Logger;
    dev?: boolean;
};
export declare type RendererOptions = CommonOptions & {
    template: string;
    nonce?: string;
};
export declare type StreamerOptions = CommonOptions & {
    response?: ServerResponse;
    template: string;
    nonce?: string;
};
export declare type HydratorOptions = CommonOptions & {
    response?: ServerResponse;
    isStreamable: boolean;
};
export declare type ShopifyConfig = {
    defaultLocale?: string;
    storeDomain: string;
    storefrontToken: string;
    storefrontApiVersion: string;
};
export declare type Hook = (params: {
    url: URL;
} & Record<string, any>) => any | Promise<any>;
export declare type ImportGlobEagerOutput = Record<string, Record<'default' | 'api', any>>;
export declare type ServerHandlerConfig = {
    pages?: ImportGlobEagerOutput;
    shopifyConfig: ShopifyConfig;
};
export declare type ClientHandlerConfig = {
    shopifyConfig: ShopifyConfig;
};
export declare type ClientHandler = (App: any, config: ClientHandlerConfig) => Promise<void>;
export interface GraphQLConnection<T> {
    edges?: {
        node: T;
    }[];
}
export interface MediaImage {
    __typename?: string;
    id?: string;
    mediaContentType?: MediaContentType;
    data?: Pick<Image, 'altText' | 'url' | 'id' | 'width' | 'height'>;
}
interface ProductVariant {
    __typename?: string;
}
interface Product {
    __typename?: string;
}
export declare type RawMetafield = Omit<Partial<Metafield>, 'reference'> & {
    reference?: MediaImage | ProductVariant | Product | null;
};
export declare type ParsedMetafield = Omit<Partial<Metafield>, 'value' | 'reference'> & {
    value?: string | number | boolean | Record<any, string> | Date | Rating | Measurement;
    reference?: MediaImage | ProductVariant | Product | null;
};
export interface Rating {
    value: number;
    scale_min: number;
    scale_max: number;
}
export interface Measurement {
    unit: string;
    value: number;
}
export declare type QueryKey = string | readonly unknown[];
export declare type NoStoreStrategy = {
    mode: string;
};
export interface AllCacheOptions {
    mode?: string;
    maxAge?: number;
    staleWhileRevalidate?: number;
    sMaxAge?: number;
    staleIfError?: number;
}
export declare type CachingStrategy = NoStoreStrategy | AllCacheOptions;
export interface HydrogenVitePluginOptions {
    devCache?: boolean;
    purgeQueryCacheOnBuild?: boolean;
}
export {};
