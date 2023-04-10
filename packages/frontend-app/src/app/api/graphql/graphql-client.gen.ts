import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ConvertPlaylistData = {
  __typename?: "ConvertPlaylistData";
  url: Scalars["String"];
};

export type ConvertPlaylistPayload = {
  __typename?: "ConvertPlaylistPayload";
  data?: Maybe<ConvertPlaylistData>;
  error?: Maybe<PlaylistError>;
  success: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  convertPlaylistUsingAdminAuthToken: ConvertPlaylistPayload;
};

export type MutationConvertPlaylistUsingAdminAuthTokenArgs = {
  fromPlatform: Scalars["String"];
  link: Scalars["String"];
  toPlatform: Scalars["String"];
};

export type PlaylistError = {
  __typename?: "PlaylistError";
  /** Message sent with the error */
  message: Scalars["String"];
  /** Name of the error */
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  ok: Scalars["Boolean"];
};

export type ConvertPlaylistUsingAdminAuthTokenMutationVariables = Exact<{
  fromPlatform: Scalars["String"];
  toPlatform: Scalars["String"];
  link: Scalars["String"];
}>;

export type ConvertPlaylistUsingAdminAuthTokenMutation = {
  __typename?: "Mutation";
  convertPlaylistUsingAdminAuthToken: {
    __typename?: "ConvertPlaylistPayload";
    success: boolean;
    data?: { __typename?: "ConvertPlaylistData"; url: string } | null;
    error?: {
      __typename?: "PlaylistError";
      name: string;
      message: string;
    } | null;
  };
};

export const ConvertPlaylistUsingAdminAuthTokenDocument = gql`
  mutation convertPlaylistUsingAdminAuthToken(
    $fromPlatform: String!
    $toPlatform: String!
    $link: String!
  ) {
    convertPlaylistUsingAdminAuthToken(
      fromPlatform: $fromPlatform
      toPlatform: $toPlatform
      link: $link
    ) {
      success
      data {
        url
      }
      error {
        name
        message
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    convertPlaylistUsingAdminAuthToken(
      variables: ConvertPlaylistUsingAdminAuthTokenMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<ConvertPlaylistUsingAdminAuthTokenMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ConvertPlaylistUsingAdminAuthTokenMutation>(
            ConvertPlaylistUsingAdminAuthTokenDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "convertPlaylistUsingAdminAuthToken",
        "mutation",
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
