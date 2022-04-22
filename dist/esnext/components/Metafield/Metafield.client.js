import React from 'react';
import { useShop } from '../../foundation';
import { getMeasurementAsString } from '../../utilities';
import { RawHtml } from '../RawHtml';
import { MetafieldFragment as Fragment } from '../../graphql/graphql-constants';
import { Image } from '../Image';
/**
 * The `Metafield` component renders the value of a Storefront
 * API's [Metafield object](/api/storefront/reference/common-objects/metafield).
 *
 * Renders a smart default of the
 * Metafield's `value`. For more information, refer to the [Default Output](#default-output) section.
 */
export function Metafield(props) {
    var _a;
    const { data, children, as, ...passthroughProps } = props;
    const { locale } = useShop();
    if (data.value == null) {
        console.warn(`No metafield value for ${data}`);
        return null;
    }
    switch (data.type) {
        case 'date': {
            const Wrapper = as !== null && as !== void 0 ? as : 'time';
            return (React.createElement(Wrapper, { ...passthroughProps }, data.value.toLocaleDateString(locale)));
        }
        case 'date_time': {
            const Wrapper = as !== null && as !== void 0 ? as : 'time';
            return (React.createElement(Wrapper, { ...passthroughProps }, data.value.toLocaleString(locale)));
        }
        case 'weight':
        case 'dimension':
        case 'volume': {
            const Wrapper = as !== null && as !== void 0 ? as : 'span';
            return (React.createElement(Wrapper, { ...passthroughProps }, getMeasurementAsString(data.value, locale)));
        }
        case 'rating': {
            const Wrapper = as !== null && as !== void 0 ? as : 'span';
            return (React.createElement(Wrapper, { ...passthroughProps }, data.value.value));
        }
        case 'single_line_text_field': {
            return (React.createElement(RawHtml, { ...passthroughProps, as: as !== null && as !== void 0 ? as : 'span', string: data.value }));
        }
        case 'multi_line_text_field': {
            return (React.createElement(RawHtml, { ...passthroughProps, as: as !== null && as !== void 0 ? as : 'span', string: data.value.split('\n').join('<br/>') }));
        }
        case 'url':
            return (React.createElement("a", { href: data.value, ...passthroughProps }, data.value));
        case 'json':
            const Wrapper = as !== null && as !== void 0 ? as : 'span';
            return (React.createElement(Wrapper, { ...passthroughProps }, JSON.stringify(data.value)));
        case 'file_reference': {
            if (((_a = data.reference) === null || _a === void 0 ? void 0 : _a.__typename) === 'MediaImage') {
                const ref = data.reference;
                return ref.data ? (React.createElement(Image, { data: ref.data, ...passthroughProps })) : null;
            }
        }
        default: {
            const Wrapper = as !== null && as !== void 0 ? as : 'span';
            return React.createElement(Wrapper, { ...passthroughProps }, data.value.toString());
        }
    }
}
Metafield.Fragment = Fragment;
export const MetafieldFragment = Fragment;
