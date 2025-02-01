import Express from 'express'
import {claim,nikkiYomi,nikkiKaki} from '../etc.mjs'

const router=Express.Router()
const session={}
const blockWord=[
    'php','cgi','asp','wget','chmod','remote',
    'vscode','sftp','..','/.','env','aws','git','config'
]

router.all('*',(req,res,next)=>{
        const ip=req.socket.remoteAddress
        
        session.datetime=new Date().toISOString()
        session.ip=ip.slice(ip.indexOf(':',2)+1)
        session.ua=req.get('User-Agent')
        session.method=req.method
        session.url=req.originalUrl
        session.result=0
        
        if (blockWord.some(word=>
            (session.url.toLowerCase()).includes(word)
        )) {
            session.result=1
        }
        
        if (!session.url.endsWith('.ico')) {
            claim(session)
            nikkiKaki([session])
        }
        
        if (session.result===1) return res.end()
        
        next()
})

router.get('/',(req,res)=>{
    res.sendFile('index.html', {root: '.'})
})

router.get('/hx',(req,res)=>{
    nikkiYomi((err,data)=>{
        res.json(data)
    })
})

export default router
