export const canUserUpdateThePost = ({ prisma, postId }) => {
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
    else if (!userInfo) {
        userErrors.push({
            message: 'Forbidden access (unauthenticated)',
        });
    }
    else if (userInfo.userId !== existingPost.authorId) {
        userErrors.push({
            message: 'This post is not owned by this user',
        });
    }
};
