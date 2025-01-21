import Express from 'express'
import Path from 'node:path'
import {nikkiYomi} from '../etc.mjs'

const router=Express.Router()

router.get('/',(req,res)=>{
	res.sendFile(
    Path.join(__dirname,'..','index.html')
  )
})

router.get('/hx',(req,res)=>{
  nikkiYomi((err,data)=>{
    res.json(data)
  })
})

module.exports=router
