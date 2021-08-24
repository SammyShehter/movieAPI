import debug from 'debug'
import express from 'express'
import { error } from '../../common/functions/common.function'
import ActorService from '../services/actors.service'

const log: debug.IDebugger = debug('app:actors-middleware')

export class ActorMiddleware {
    private readonly actorsList = new Map([
        ['Robert Downey Jr.', 3223],
        ['Chris Evans', 16828],
        ['Mark Ruffalo', 103],
        ['Chris Hemsworth', 74568],
        ['Scarlett Johansson', 1245],
        ['Jeremy Renner', 17604],
        ['Don Cheadle', 1896],
        ['Paul Rudd', 22226],
        ['Brie Larson', 60073],
        ['Michael B. Jordan', 135651],
        ['Karen Gillan', 543261],
        ['Danai Gurira', 82104],
        ['Josh Brolin', 16851],
        ['Gwyneth Paltrow', 12052],
        ['Bradley Cooper', 51329],
        ['Tom Holland', 1136406],
        ['Zoe Saldana', 8691],
        ['Anthony Mackie', 53650],
        ['Tom Hiddleston', 91606],
        ['Chris Pratt', 73457],
        ['Samuel L. Jackson', 2231],
        ['Dave Bautista', 543530],
    ])

    validActor = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            req.actorID = this.actorsList.get(req.actor)
            
            if(!req.actorID) throw new Error('Not Marvel movie actor. Try another name')
            next()
        } catch (e) {
            error(e, req, res)
        }
    }

}

export default new ActorMiddleware()
