import debug from 'debug'
import express from 'express'
import { error } from '../functions/common.function'
const log: debug.IDebugger = debug('app:common-middleware')

export class CommonMiddleware {

    trimString(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if(typeof req.body.name !== 'string') throw new Error('invalid name')
            req.actor = req.body.name.trim()
            next()    
        } catch (e) {
            error(e, req, res)
        }
        
    }

}

export default new CommonMiddleware()
