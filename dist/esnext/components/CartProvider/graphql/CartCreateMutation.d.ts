import * as Types from '../../../graphql/types/types';
import { CartFragmentFragment } from './CartFragment';
export declare type CartCreateMutationVariables = Types.Exact<{
    input: Types.CartInput;
    numCartLines?: Types.Maybe<Types.Scalars['Int']>;
    country?: Types.Maybe<Types.CountryCode>;
}>;
export declare type CartCreateMutation = {
    __typename?: 'Mutation';
} & {
    cartCreate?: Types.Maybe<{
        __typename?: 'CartCreatePayload';
    } & {
        cart?: Types.Maybe<{
            __typename?: 'Cart';
        } & CartFragmentFragment>;
    }>;
};
