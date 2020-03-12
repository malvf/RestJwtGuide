
import { Request, Response } from 'express';
import { Controller, Get, Post, ClassMiddleware } from '@overnightjs/core';
import { CarDao } from "../daos/carDao";
import { BAD_REQUEST, OK } from "http-status-codes";
import auth from '../middlewares/authentication';

// Defines the endpoint for this resource
@Controller('api/cars')
@ClassMiddleware(auth)
export class CarController {
    private carDao = new CarDao();

    // This decorator maps the internal methods routes
    // Ex: this maps to api/cars/all
    @Get('all')
    private async fetchAllCars(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.carDao.fetchAll();
            return res.status(OK).json(users);
        } catch (err) {
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }

    @Post('new')
    private async createNewCar(req: Request, res: Response): Promise<Response> {
        try {
            const { year, carModel, make } = req.body;

            const users = await this.carDao.create({ year, carModel, make });
            return res.status(OK).json(users);
        } catch (err) {
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }

}