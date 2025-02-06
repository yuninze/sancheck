import Express from 'express'
import Limit from 'express-rate-limit'
import Http from 'node:http'
import Https from 'node:https'
import Path from 'node:path'
import {readFileSync} from 'node:fs'
import {
    basePath,
    keyChain,
    claim,
    redact
} from './etc.mjs'

import sieve from './route/sieve.mjs'
import dispatch from './route/dispatch.mjs'
import kura from './route/kura.mjs'

class Cert {
    constructor() {
        this.key=readFileSync(
            keyChain.path.key,
            'utf8'
        )
        this.cert=readFileSync(
            keyChain.path.cert,
            'utf8'
        )
        this.ca=readFileSync(
            keyChain.path.ca,
            'utf8'
        )
    }
}

const app=Express()
const dog=Path.join(basePath,'./public/dog.png')

process.chdir(basePath)
claim(`Running At: ${basePath}`)

app.use(Limit({windowMs:1000*10,max:100}))
app.use(Express.static('./public'))
app.use(Express.json())

app.use('*',sieve)
app.use('/',dispatch)
app.use('/article',dispatch)
app.use('/about',dispatch)
app.use('/kura',kura)

app.use((err,req,res,next)=>{
    if (err) {
        const errRedacted = redact(err.message)
        claim('Was an Error', err.message)
        res.json({error:{
            result:1,
            msg:errRedacted,
        }})
    }
    else {
        next()
    }
})

app.use((req,res)=>{
    claim('The request been reached.','(dog)')
    res.sendFile(dog)
})

const ports=[4430,8023]
const addr='0.0.0.0'

let server
let port

try {
    const httpsCert=new Cert()
    server=Https.createServer(httpsCert,app)
    port=ports[0]
}
catch (err) {
    claim(`Fallback to HTTP: ${err.message}`)
    server=Http.createServer(app)
    port=ports[1]
}
finally {
    server.listen(port,addr,()=>{
        claim('Port:', port)
    })
}
