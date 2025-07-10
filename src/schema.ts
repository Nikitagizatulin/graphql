// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

 # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    posts(filter: PostFilter): [Post!]!
    post(postId: ID!): Post
    me: User
    profile(userId: ID!): Profile
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDelete(postId: ID!): Boolean!
    postPublishSwitch(postId: ID!, publish: Boolean!): PostPayload!
    signup(email: String!, bio: String!, name: String!, password: String!): AuthPayload!
    signin(email: String!, password: String!): AuthPayload!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    author: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    profile: Profile
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }
  type PostDeletePayload {
    userErrors: [UserError!]!
    postDeleted: Boolean!
  }
  type UserError {
    message: String!
  }
  input PostInput {
    title: String
    content: String
  }
  input PostFilter {
    title: String
  }
  type AuthPayload {
    userErrors: [UserError!]!
    token: String
  }
`;
