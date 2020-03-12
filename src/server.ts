import express from 'express';
import { Server } from '@overnightjs/core';
import { CarController } from './controllers/carController';
import { AuthController } from './controllers/authController';
import Mongoose from 'mongoose';

export default class FSTServer extends Server {

    constructor() {
        super(true);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.setupControllers();
        this.setupDatabase();
    }

    /**
     * Start the OvernightJS's controllers
     */
    private setupControllers(): void {
        const carController = new CarController();
        const authController = new AuthController();
        super.addControllers([carController, authController]);
    }

    /**
     * Setup the database configurations.
     */
    private setupDatabase(): void {
        const connString = 'connection string from mongo';

        Mongoose.connect(connString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    }
    /**
     * 
     * @param {Integer} port - Port which the server will listen.
     */
    public start(port: number): void {
        this.app.listen(port);
    }
}
''