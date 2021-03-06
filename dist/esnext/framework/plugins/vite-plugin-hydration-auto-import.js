import { normalizePath } from 'vite';
import path from 'path';
import MagicString from 'magic-string';
const HYDROGEN_ENTRY_FILE = 'hydrogen-entry-client.jsx';
export default () => {
    let config;
    return {
        name: 'vite-plugin-hydration-auto-import',
        enforce: 'pre',
        configResolved(_config) {
            config = _config;
        },
        resolveId(id, importer) {
            if ((/^\/?@shopify\/hydrogen\/entry-client$/.test(id) ||
                id.endsWith(path.sep + HYDROGEN_ENTRY_FILE)) &&
                normalizePath(importer || '').endsWith('/index.html')) {
                // Make this virtual import look like a local project file
                // to enable React Refresh normally.
                return path.join(config.root, HYDROGEN_ENTRY_FILE + '?virtual');
            }
            return null;
        },
        load(id) {
            if (id.includes(HYDROGEN_ENTRY_FILE + '?virtual')) {
                const code = new MagicString(`import renderHydrogen from '@shopify/hydrogen/entry-client';\n` +
                    `export default renderHydrogen((props) => props.children);`);
                return {
                    code: code.toString(),
                    map: code.generateMap({
                        file: HYDROGEN_ENTRY_FILE,
                        source: HYDROGEN_ENTRY_FILE,
                    }),
                };
            }
            return null;
        },
    };
};
