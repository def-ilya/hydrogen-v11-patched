import { ReactNode } from 'react';
/**
 * The `LocalizationProvider` component automatically queries the Storefront API's
 * [`localization`](/api/storefront/reference/common-objects/queryroot) field
 * for the `isoCode` and `name` of the `country` and `availableCountries` and keeps this information in a context.
 *
 * Any descendents of this provider can use the `useCountry` and `useAvailableCountries` hooks.
 * The `isoCode` of the `country` can be used in the Storefront API's
 * `@inContext` directive as the `country` value.
 */
export declare function LocalizationProvider({ children }: {
    children: ReactNode;
}): JSX.Element;
