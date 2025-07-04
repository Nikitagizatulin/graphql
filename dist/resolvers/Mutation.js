export const Mutation = {
    postCreate: async (_, { post: { title, content } }, { prisma }) => {
        let userErrors = [];
        let post = null;
        if (!title || !content) {
            userErrors.push({
                message: 'You must porvide a title and a content',
            });
        }
        else {
            post = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: 1,
                },
            });
        }
        return {
            userErrors,
            post,
        };
    },
    postUpdate: async (_, { postId, post: { title, content }, }, { prisma }) => {
        let post = null;
        let userErrors = [];
        if (!title && !content) {
            userErrors.push({
                message: 'Should have at least one field to update',
            });
        }
        else {
            const existingPost = await prisma.post.findUnique({
                where: {
                    id: Number(postId),
                },
            });
            if (!existingPost) {
                userErrors.push({
                    message: "Post with such ID doesn't exists",
                });
            }
            else {
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
    },
    postDelete: async (_, { postId }, { prisma }) => {
        let userErrors = [];
        let post = null;
        const existingPost = await prisma.post.findUnique({
            where: {
                id: Number(postId),
            },
        });
        if (!existingPost) {
            userErrors.push({
                message: "Post with such ID doesn't exists",
            });
        }
        else {
            post = prisma.post.delete({
                where: {
                    id: Number(postId),
                },
            });
        }
        return {
            userErrors,
            post,
        };
    },
};
