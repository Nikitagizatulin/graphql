import { User, Post, Profile } from '@prisma/client';
import { Context } from '../index';

type IUserResolver<Return, Args = {}> = (
  parent: User,
  args: Args,
  context: Context
) => Promise<Return>;

export const posts: IUserResolver<Array<Post>, {}> = async (
  parent,
  _,
  { prisma, userInfo }
) => {
  const isOwner = parent.id === userInfo?.userId;
  const where = {
    authorId: parent.id,
    published: true
  };
  if (isOwner) {
    delete where.published
  }
  return prisma.post.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }],
  });
};
export const profile: IUserResolver<Profile, {}> = async (
  parent,
  _,
  { prisma }
) => {
  return prisma.profile.findUnique({
    where: { userId: parent.id },
  });
};
