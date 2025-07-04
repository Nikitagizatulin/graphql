export const profileResolver = {
    user: async (parent, __, { prisma }) => {
        return prisma.user.findUnique({
            where: {
                id: parent.userId,
            },
        });
    },
};
