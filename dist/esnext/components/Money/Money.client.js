import React from 'react';
import { useMoney } from '../../hooks';
import { MoneyFragment as Fragment } from '../../graphql/graphql-constants';
/**
 * The `Money` component renders a string of the Storefront API's
 * [`MoneyV2` object](/api/storefront/reference/common-objects/moneyv2) according to the
 * `defaultLocale` in the `shopify.config.js` file.
 */
export function Money(props) {
    const { data, as, ...passthroughProps } = props;
    const moneyObject = useMoney(data);
    const Wrapper = as !== null && as !== void 0 ? as : 'div';
    return React.createElement(Wrapper, { ...passthroughProps }, moneyObject.localizedString);
}
Money.Fragment = Fragment;
export const MoneyFragment = Fragment;
