import { PrismaClient, Prisma } from '@prisma/client';

interface IcanUserUpdateThePost {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;
  postId: string;
  userInfo: null | { userId: number };
}

export const canUserMutatePost = async ({
  prisma,
  postId,
  userInfo,
}: IcanUserUpdateThePost): Promise<[string | null, boolean]> => {
  let error = null;
  let userCanMutatePost = false;
  const existingPost = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
  });
  if (!existingPost) {
    error = "Post with such ID doesn't exists";
  } else if (!userInfo) {
    error = 'Forbidden access (unauthenticated)';
  } else if (userInfo.userId !== existingPost.authorId) {
    error = 'This post is not owned by this user';
  } else {
    userCanMutatePost = true;
  }
  return [error, userCanMutatePost];
};
