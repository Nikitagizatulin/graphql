export const posts = async (parent, _, { prisma, userInfo }) => {
    const isOwner = parent.id === userInfo?.userId;
    const where = {
        authorId: parent.id,
        published: true
    };
    if (isOwner) {
        delete where.published;
    }
    return prisma.post.findMany({
        where,
        orderBy: [{ createdAt: 'desc' }],
    });
};
export const profile = async (parent, _, { prisma }) => {
    return prisma.profile.findUnique({
        where: { userId: parent.id },
    });
};
