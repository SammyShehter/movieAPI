import express = require('express')

declare global {
    namespace Express {
        interface Request {
            actor: string
            actorID: number    
        }
    }
}
