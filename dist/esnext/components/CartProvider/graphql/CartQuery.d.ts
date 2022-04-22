import * as Types from '../../../graphql/types/types';
import { CartFragmentFragment } from './CartFragment';
export declare type CartQueryQueryVariables = Types.Exact<{
    id: Types.Scalars['ID'];
    numCartLines?: Types.Maybe<Types.Scalars['Int']>;
    country?: Types.Maybe<Types.CountryCode>;
}>;
export declare type CartQueryQuery = {
    __typename?: 'QueryRoot';
} & {
    cart?: Types.Maybe<{
        __typename?: 'Cart';
    } & CartFragmentFragment>;
};
