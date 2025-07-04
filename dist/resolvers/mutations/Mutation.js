import * as postResolvers from './post.js';
import * as authResolvers from './auth.js';
export const Mutation = {
    ...postResolvers,
    ...authResolvers,
};
