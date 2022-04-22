import { ElementType } from 'react';
import { MoneyProps } from '../Money';
import { Props } from '../types';
export interface ProductPriceProps extends Omit<MoneyProps, 'data'> {
    /** The type of price. Valid values: `regular` (default) or `compareAt`. */
    priceType?: 'regular' | 'compareAt';
    /** The type of value. Valid values: `min` (default), `max` or `unit`. */
    valueType?: 'max' | 'min' | 'unit';
    /** The ID of the variant. */
    variantId?: string;
}
/**
 * The `ProductPrice` component renders a `Money` component with the product
 * [`priceRange`](/api/storefront/reference/products/productpricerange)'s `maxVariantPrice` or `minVariantPrice`, for either the regular price or compare at price range. It must be a descendent of the `ProductProvider` component.
 */
export declare function ProductPrice<TTag extends ElementType>(props: Props<TTag> & ProductPriceProps): JSX.Element | null;
