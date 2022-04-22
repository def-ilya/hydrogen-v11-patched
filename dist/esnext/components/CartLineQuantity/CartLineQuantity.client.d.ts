import { ElementType } from 'react';
import { Props } from '../types';
/**
 * The `CartLineQuantity` component renders a `span` element (or the type of HTML element
 * specified by the `as` prop) with the cart line's quantity. It must be a descendent of a `CartLineProvider` component.
 */
export declare function CartLineQuantity<TTag extends ElementType>(props: Props<TTag> & {
    /** An HTML tag to be rendered as the base element wrapper. The default is `div`. */
    as?: ElementType;
}): JSX.Element;
