import { User, Profile } from '@prisma/client';
import { Context } from '../index';

type IProfileResolver<Return, Args = {}> = (
  parent: Profile,
  args: Args,
  context: Context
) => Promise<Return>;

export const user: IProfileResolver<User, {}> = async (
  parent,
  _,
  { prisma }
) => {
  return prisma.user.findUnique({
    where: {
      id: parent.userId,
    },
  });
};
