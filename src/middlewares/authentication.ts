import { verify, VerifyErrors } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';

const auth = (req: any, res: Response, next: NextFunction) => {
    const authToken: string | undefined = req.headers.authorization;

    const jwtConfig = {
        hash: '9eb71ab7420eb452a22787ca4fab501b',
        options: {
            expiresIn: 1800,
        },
    };

    if (!authToken) {
        return res.status(UNAUTHORIZED).json({
            error: 'No authentication token found!',
        });
    }

    if (authToken) {
        verify(authToken, jwtConfig.hash, (err: VerifyErrors) => {
            if (err) {
                return res.status(UNAUTHORIZED).json({
                    error: 'Invalid authentication token!',
                });
            }
        });
        return next();
    }
};

export default auth;
