import React from 'react';
import { CartFragmentFragment } from './graphql/CartFragment';
/**
 * The `CartProvider` component creates a context for using a cart. It creates a cart object and callbacks
 * that can be accessed by any descendent component using the `useCart` hook and related hooks. It also carries out
 * any callback props when a relevant action is performed. For example, if a `onLineAdd` callback is provided,
 * then the callback will be called when a new line item is successfully added to the cart.
 *
 * The `CartProvider` component must be a descendent of the `ShopifyProvider` component.
 * You must use this component if you want to use the `useCart` hook or related hooks, or if you would like to use the `AddToCartButton` component.
 */
export declare function CartProvider({ children, numCartLines, onCreate, onLineAdd, onLineRemove, onLineUpdate, onNoteUpdate, onBuyerIdentityUpdate, onAttributesUpdate, onDiscountCodesUpdate, data: cart, }: {
    /** Any `ReactNode` elements. */
    children: React.ReactNode;
    numCartLines?: number;
    /** A callback that is invoked when the process to create a cart begins, but before the cart is created in the Storefront API. */
    onCreate?: () => void;
    /** A callback that is invoked when the process to add a line item to the cart begins, but before the line item is added to the Storefront API. */
    onLineAdd?: () => void;
    /** A callback that is invoked when the process to remove a line item to the cart begins, but before the line item is removed from the Storefront API. */
    onLineRemove?: () => void;
    /** A callback that is invoked when the process to update a line item in the cart begins, but before the line item is updated in the Storefront API. */
    onLineUpdate?: () => void;
    /** A callback that is invoked when the process to add or update a note in the cart begins, but before the note is added or updated in the Storefront API. */
    onNoteUpdate?: () => void;
    /** A callback that is invoked when the process to update the buyer identity begins, but before the buyer identity is updated in the Storefront API. */
    onBuyerIdentityUpdate?: () => void;
    /** A callback that is invoked when the process to update the cart attributes begins, but before the attributes are updated in the Storefront API. */
    onAttributesUpdate?: () => void;
    /** A callback that is invoked when the process to update the cart discount codes begins, but before the discount codes are updated in the Storefront API. */
    onDiscountCodesUpdate?: () => void;
    /**
     * A cart object from the Storefront API to populate the initial state of the provider.
     */
    data?: CartFragmentFragment;
}): JSX.Element;
