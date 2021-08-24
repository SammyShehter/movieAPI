import { debug } from 'debug'
import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config'
import CommonMiddleware from '../common/middleware/common.middleware'
import ActorController from './controllers/actors.controller'
import ActorMiddleware from './middleware/actors.middleware'


const log: debug.IDebugger = debug('app:actor-routes')

export class ActorRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ActorsRoutes')
    }

    configureRoutes() {
        this.app
            .route('/')
            .all(
                CommonMiddleware.trimString,
                ActorMiddleware.validActor,
            )
            .post(ActorController.answer)
        return this.app
    }
}
