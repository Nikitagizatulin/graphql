import { Post, Profile, User } from '@prisma/client';
import { Context } from '../index';
import { Prisma } from '@prisma/client';

interface IPostFilter {
  filter: {
    title?: string;
  };
}

export const Query = {
  posts: async (
    _: any,
    { filter }: IPostFilter,
    { prisma }: Context
  ): Promise<Array<Post>> => {
    const where: {
      title?: string | Prisma.StringFilter<'Post'>;
      published?: boolean | Prisma.BoolFilter<'Post'>;
    } = {
      published: true,
    };
    if (filter && 'title' in filter) {
      where.title = { contains: filter.title.toLocaleLowerCase() };
    }
    return prisma.post.findMany({
      where,
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  },
  post: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<Post> => {
    return prisma.post.findUnique({
      where: {
        id: Number(postId),
        OR: [{ published: true }, { authorId: userInfo?.userId }],
      },
    });
  },
  me: async (_: any, __: any, { prisma, userInfo }: Context): Promise<User> => {
    if (!userInfo) return null;
    return prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  profile: async (
    _: any,
    { userId }: { userId: number },
    { prisma }: Context
  ): Promise<Profile> => {
    return prisma.profile.findUnique({
      where: {
        userId: Number(userId),
      },
    });
  },
};
