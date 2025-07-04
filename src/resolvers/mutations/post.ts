import { Post } from '@prisma/client';
import { Context } from '../../index';
import { canUserMutatePost } from '../../utils/canUserMutatePost.js';

interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
}

interface PostPayloadResponse {
  userErrors: Array<{ message: string }>;
  post: null | Post;
}

interface PostDeleteResponse {
  userErrors: Array<{ message: string }>;
  postDeleted: boolean;
}

type IPostResolver<Return, Args = {}> = (
  parent: Post,
  args: Args,
  context: Context
) => Promise<Return>;

export const postCreate: IPostResolver<PostArgs, PostPayloadResponse> = async (
  _,
  { post: { title, content } },
  { prisma, userInfo }
) => {
  let userErrors = [];
  let post = null;
  if (!title || !content) {
    userErrors.push({
      message: 'You must porvide a title and a content',
    });
  } else if (!userInfo) {
    userErrors.push({
      message: 'Forbidden access (unauthenticated)',
    });
  } else {
    post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userInfo.userId,
      },
    });
  }
  return {
    userErrors,
    post,
    asad: 'asad',
  };
};
export const postUpdate: IPostResolver<
  PostPayloadResponse,
  { postId: string; post: PostArgs['post'] }
> = async (_, { postId, post: { title, content } }, { prisma, userInfo }) => {
  let post = null;
  let userErrors = [];

  if (!title && !content) {
    userErrors.push({
      message: 'Should have at least one field to update',
    });
  } else {
    const [error, canUpdate] = await canUserMutatePost({
      prisma,
      userInfo,
      postId,
    });
    if (error) {
      userErrors.push({
        message: error,
      });
    }
    if (canUpdate) {
      const data: PostArgs['post'] = {};
      if (title) data.title = title;
      if (content) data.content = content;
      post = await prisma.post.update({
        where: {
          id: Number(postId),
        },
        data,
      });
    }
  }
  return {
    userErrors,
    post,
  };
};
export const postDelete: IPostResolver<
  PostDeleteResponse,
  { postId: string }
> = async (_, { postId }, { prisma, userInfo }) => {
  let userErrors = [];
  let postDeleted = false;
  let post = null;
  const [error, canUpdate] = await canUserMutatePost({
    prisma,
    userInfo,
    postId,
  });
  if (error) {
    userErrors.push({
      message: error,
    });
  }
  if (canUpdate) {
    post = prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
    postDeleted = Boolean(post);
  }
  return {
    userErrors,
    postDeleted,
  };
};
export const postPublishSwitch: IPostResolver<
  PostPayloadResponse,
  { postId: string; publish: boolean }
> = async (_, { postId, publish }, { prisma, userInfo }) => {
  let userErrors = [];
  let post = null;
  const [error, canUpdate] = await canUserMutatePost({
    prisma,
    userInfo,
    postId,
  });
  if (error) {
    userErrors.push({
      message: error,
    });
  } else if (canUpdate) {
    post = prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        published: publish,
      },
    });
  }
  return {
    userErrors,
    post,
  };
};
