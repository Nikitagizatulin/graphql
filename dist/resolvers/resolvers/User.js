export const UserResolver = {
    posts: async (parent, __, { prisma }) => {
        return prisma.post.findMany({
            where: {
                authorId: parent.id,
            },
        });
    },
};
