import { postResolvers } from './post.js';
import { profileResolver } from './profile.js';
import { userResolver } from './user.js';
export const Resolvers = {
    Post: postResolvers,
    Profile: profileResolver,
    User: userResolver,
};
