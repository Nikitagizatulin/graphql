export const Query = {
    posts: async (_, { filter }, { prisma }) => {
        const where = {
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
    post: async (_, { postId }, { prisma, userInfo }) => {
        return prisma.post.findUnique({
            where: {
                id: Number(postId),
                OR: [{ published: true }, { authorId: userInfo?.userId }],
            },
        });
    },
    me: async (_, __, { prisma, userInfo }) => {
        if (!userInfo)
            return null;
        return prisma.user.findUnique({
            where: {
                id: userInfo.userId,
            },
        });
    },
    profile: async (_, { userId }, { prisma }) => {
        return prisma.profile.findUnique({
            where: {
                userId: Number(userId),
            },
        });
    },
};
