export const postResolvers = {
    author: async (parent, __, { prisma }) => {
        return prisma.user.findUnique({
            where: {
                id: parent.authorId,
            },
        });
    },
};
