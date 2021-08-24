import express from 'express'
import { error } from '../../common/functions/common.function'
import debug from 'debug'
import ActorService from '../services/actors.service'

const log: debug.IDebugger = debug('app:actors-controller')

class ActorController {
    async answer(req: express.Request, res: express.Response) {
        try {
            const alreadyAsked = ActorService.cacheAnswer(req.actorID)
            if(alreadyAsked)
                return res.json({[req.actor]: alreadyAsked})

            const movieList = await ActorService.getMovieListAndSave(req.actorID)
            return res.json({[req.actor]: movieList})
        } catch (e) {
            error(e, req, res)
        }
    }
}

export default new ActorController()
