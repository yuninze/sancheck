import Express from 'express'
import Limit from 'express-rate-limit'
import Http from 'node:http'
import Https from 'node:https'
import Path from 'node:path'
import Fs from 'node:fs'

import {claim} from './etc.mjs'

import sieve from './route/sieve.mjs'
import dispatch from './route/dispatch.mjs'
import kura from './route/kura.mjs'
import deta from './route/data.mjs'

class Cert {
    constructor() {
        this.key=Fs.readFileSync(
            '/etc/letsencrypt/live/sanbo.space/privkey.pem',
            'utf8'
        )
        this.cert=Fs.readFileSync(
            '/etc/letsencrypt/live/sanbo.space/fullchain.pem',
            'utf8'
        )
        this.ca=Fs.readFileSync(
            '/etc/letsencrypt/live/sanbo.space/fullchain.pem',
            'utf8'
        )
    }
}

const app=Express()
const dog=Path.join('/public/dog.png')

process.chdir(__dirname)

app.use(Limit({windowMs:1000*10,max:5}))
app.use(Express.static('./public'))
app.use(Express.json())
app.use('*',sieve)
app.use('/',dispatch)
app.use('/kura',kura)
app.use('/deta',deta)

app.use((err,req,res,next)=>{
	if (err) {
		console.log(`Was an Error (${err.message})`)
		const errRedacted = Etc.redact(err.message)
		res.json({
			'result':1,
			'msg':errRedacted,
		})
	}
	else {
		next()
	}
})

app.use((req,res)=>{
	console.log('Was an Error (dog)')
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
	claim(`HTTP Fallback: ${err.message}`)
	server=Http.createServer(app)
	port=ports[1]
}
finally {
	server.listen(port,addr,()=>{})
}
