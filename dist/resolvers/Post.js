export const author = async (parent, _, { prisma }) => {
    return prisma.user.findUnique({
        where: {
            id: parent.authorId,
        },
    });
};
