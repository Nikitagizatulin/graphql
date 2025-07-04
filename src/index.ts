import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient, Prisma } from '@prisma/client';
import { typeDefs } from './schema.js';
import { Query } from './resolvers/Query.js';
import { Mutation } from './resolvers/mutations/Mutation.js';
import { Post, User, Profile } from './resolvers/Resolvers.js';
import { getUserFromToken } from './utils/getUserFromToken.js';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
export interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;
  userInfo: null | { userId: number };
}
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Post,
    User,
    Profile,
  },
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }): Promise<Context> => {
    const userInfo = req.headers.authorization
      ? getUserFromToken(req.headers.authorization)
      : null;
    return { prisma, userInfo };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
