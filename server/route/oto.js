
const Etc=require('../etc')

// npm install node-media-server
const MediaServer = require("node-media-server")

const mediaPath="/media/yuninze/6468-2B5E/content"
const coderPath="/usr/bin/ffmpeg"

const config={
  http:{
    port:2330,
    allow_origin:"*",
    mediaroot:mediaPath
  },
  rtmp:{
    port:2330,
    chunk_size:1024 ** 3 * 5,
    gop_cache:true,
    ping:30,
    ping_timeout:60
  },
  trans:{
    ffmpeg:coderPath,
    tasks:[{
      app:"live",
      hls:true,
      hlsFlags:"[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
      hlsKeep:false
    }],
    MediaRoot:mediaPath
  }
}

const MediaServerCursor=new MediaServer(config)

MediaServerCursor.on("preConnect",(id,args)=>{
  Etc.claim(`preConnect id=${id} args=${JSON.stringify(args)}`)
})

MediaServerCursor.on("postConnect",(id,args)=>{
  Etc.claim(`postConnect id=${id} args=${JSON.stringify(args)}`)
})

MediaServerCursor.on("doneConnect",(id,args)=>{
  Etc.claim(`doneConnect id=${id} args=${JSON.stringify(args)}`)
})

MediaServerCursor.on("prePublish",(id,streamPath,args)=>{
  Etc.claim(`prePublish id=${id} streamPath=${streamPath} args=${JSON.stringify(args)}`)
})

MediaServerCursor.on("postPublish",(id,streamPath,args)=>{
  Etc.claim(`postPublish id=${id} streamPath=${streamPath} args=${JSON.stringify(args)}`)
})

MediaServerCursor.on("donePublish",(id,streamPath,args)=>{
  Etc.claim(`donePublish id=${id} streamPath=${streamPath} args=${JSON.stringify(args)}`)
})

MediaServerCursor.on("prePlay",(id,streamPath,args)=>{
  Etc.claim(`prePlay id=${id} streamPath=${streamPath} args=${JSON.stringify(args)}`)
})

MediaServerCursor.on("postPlay",(id,streamPath,args)=>{
  Etc.claim(`postPlay id=${id} streamPath=${streamPath} args=${JSON.stringify(args)}`)
})

MediaServerCursor.on("donePlay",(id,streamPath,args)=>{
  Etc.claim(`donePlay id=${id} streamPath=${streamPath} args=${JSON.stringify(args)}`)
})

