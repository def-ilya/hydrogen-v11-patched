import { ShopPayButtonProps } from '../ShopPayButton';
/**
 * The `CartShopPayButton` component renders a `ShopPayButton` for the items in the cart.
 * It must be a descendent of a `CartProvider` component.
 */
export declare function CartShopPayButton({ 
/** A string of classes to apply to the `div` that wraps the `shop-pay-button` web component. */
className, }: Omit<ShopPayButtonProps, 'variantIds'>): JSX.Element;
