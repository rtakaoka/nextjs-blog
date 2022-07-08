import { gql } from "@apollo/client";

export const GET_POSTS = gql`
query GetPosts {
  posts(orderBy: publishedAt_DESC, stage: PUBLISHED) {
    id
    slug
    title
    publishedAt
    createdAt
    locale
  }
}
`;

