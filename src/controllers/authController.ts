
import { Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';
import { sign } from 'jsonwebtoken';

@Controller('api/auth')
export class AuthController {
    @Post('')
    private async authUser(req: Request, res: Response): Promise<Response> {
        const { login, password } = req.body;

        // Random hash and expiration timer.
        const jwtConfig = {
            hash: '9eb71ab7420eb452a22787ca4fab501b',
            options: {
                expiresIn: 1800,
            },
        };

        try {
            if (login === 'admin' && password === 'admin') {
                const admToken = sign({ id: 'admin' }, jwtConfig.hash, jwtConfig.options);

                return res.status(OK).json({ jwt: admToken });
            } else {
                return res.status(UNAUTHORIZED).json({
                    error: `Authentication Error`,
                });

            }
        } catch (err) {
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }
}