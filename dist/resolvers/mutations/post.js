import { canUserMutatePost } from '../../utils/canUserMutatePost.js';
export const postCreate = async (_, { post: { title, content } }, { prisma, userInfo }) => {
    let userErrors = [];
    let post = null;
    if (!title || !content) {
        userErrors.push({
            message: 'You must porvide a title and a content',
        });
    }
    else if (!userInfo) {
        userErrors.push({
            message: 'Forbidden access (unauthenticated)',
        });
    }
    else {
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
export const postUpdate = async (_, { postId, post: { title, content } }, { prisma, userInfo }) => {
    let post = null;
    let userErrors = [];
    if (!title && !content) {
        userErrors.push({
            message: 'Should have at least one field to update',
        });
    }
    else {
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
            const data = {};
            if (title)
                data.title = title;
            if (content)
                data.content = content;
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
export const postDelete = async (_, { postId }, { prisma, userInfo }) => {
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
export const postPublishSwitch = async (_, { postId, publish }, { prisma, userInfo }) => {
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
    }
    else if (canUpdate) {
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
