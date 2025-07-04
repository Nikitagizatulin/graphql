import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
export const signup = async (_, { name, password, bio, email }, { prisma }) => {
    let userErrors = [];
    let token = null;
    const isEmail = validator.isEmail(email);
    if (!isEmail) {
        userErrors.push({
            message: 'Invalid email!',
        });
    }
    const isPasswordValid = validator.isLength(password, {
        min: 5,
    });
    if (!isPasswordValid) {
        userErrors.push({
            message: 'Invalid password. Min 5 character length!',
        });
    }
    if (!name) {
        userErrors.push({
            message: 'Invalid name. Can`t be an empty!',
        });
    }
    if (!bio) {
        userErrors.push({
            message: 'Invalid bio. Can`t be an empty!',
        });
    }
    if (!userErrors.length) {
        const hashedPassowrd = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                password: hashedPassowrd,
                email,
                profile: {
                    create: {
                        bio,
                    },
                },
            },
        });
        token = JWT.sign({
            userId: user.id,
        }, process.env.JWT_SIGNATURE, { expiresIn: 3600000 });
    }
    return {
        token,
        userErrors,
    };
};
export const signin = async (_, { password, email }, { prisma }) => {
    const response = { userErrors: [], token: null };
    try {
        const isEmail = validator.isEmail(email);
        if (!isEmail) {
            throw new Error('Invalid email!');
        }
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error('Invalid credentials!');
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
            throw new Error('Invalid credentials!');
        }
        response.token = JWT.sign({
            userId: user.id,
        }, process.env.JWT_SIGNATURE, { expiresIn: 3600000 });
    }
    catch (error) {
        let message = 'Something went wrong';
        if (error instanceof Error) {
            message = error.message;
        }
        response.userErrors.push({ message });
    }
    return response;
};
