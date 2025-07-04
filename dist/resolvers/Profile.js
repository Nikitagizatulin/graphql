export const user = async (parent, _, { prisma }) => {
    return prisma.user.findUnique({
        where: {
            id: parent.userId,
        },
    });
};
