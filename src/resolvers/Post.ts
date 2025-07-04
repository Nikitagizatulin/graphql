import { User, Post } from '@prisma/client';
import { Context } from '../index';

type IPostResolver<Return, Args = {}> = (
  parent: Post,
  args: Args,
  context: Context
) => Promise<Return>;

export const author: IPostResolver<User, {}> = async (
  parent,
  _,
  { prisma }
) => {
  return prisma.user.findUnique({
    where: {
      id: parent.authorId,
    },
  });
};
