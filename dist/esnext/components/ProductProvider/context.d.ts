import { ProductOptionsHookValue } from '../../hooks';
import { ParsedMetafield } from '../../types';
import { ProductProviderFragmentFragment } from './ProductProviderFragment';
import { Product } from './types';
import { Collection, Image } from '../../graphql/types/types';
import type { Variant } from '../../hooks/useProductOptions';
export declare const ProductContext: import("react").Context<ProductContextType | null>;
export declare type ProductContextType = Omit<Product, 'media' | 'metafields' | 'images' | 'collections' | 'variants' | 'sellingPlanGroups' | 'options'> & {
    media?: ProductProviderFragmentFragment['media']['edges'][0]['node'][];
    mediaConnection?: Product['media'];
    metafields?: ParsedMetafield[];
    metafieldsConnection?: Product['metafields'];
    images?: Partial<Image>[];
    imagesConnection?: Product['images'];
    collections?: Partial<Collection>[];
    collectionsConnection?: Product['collections'];
    variants?: Partial<Variant>[];
    variantsConnection?: Product['variants'];
};
export declare const ProductOptionsContext: import("react").Context<ProductOptionsHookValue | null>;