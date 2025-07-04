import JWT from 'jsonwebtoken';
export const getUserFromToken = (token) => {
    try {
        return JWT.verify(token, process.env.JWT_SIGNATURE);
    }
    catch (error) {
        return null;
    }
};
