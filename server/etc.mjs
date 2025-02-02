import Path from 'node:path'
import Fs from 'node:fs'
import {readFile} from 'fs/promises'

export const basePath=import.meta.dirname
const keyChainPath=Path.join(basePath,'./key.chain')
export const keyChain = JSON.parse(await readFile(keyChainPath))
const nikkiFile=Path.join(basePath,'./public/nikki.chou')

export function claim(...about) {
  console.log('ㅡ'.repeat(1), ...about)
  return 
}

export function isNumeric(str) {
  return !isNaN(parseFloat(str)) && isFinite(str)
}

export function naming() {
  const timing = Date.now().toString()
  let mixing = (Math.round(Math.random() * 10 ** 8)).toString()
  for (let l=mixing.length; l<8; l++) mixing='0'+mixing
  return timing + '_' + mixing
}

export function parsing(url) {
  return Object.fromEntries(new URLSearchParams(url))
}

export function timing(itu) {
  const pass = Object.values(keyChain.pass).map(q => parseInt(q))
  const passChain = {
    itu: parseInt(itu.toString().slice(0, pass[1])),
    now: parseInt((Date.now() * pass[0]).toString().slice(0, pass[1])),
  }
  return Math.abs(passChain.itu - passChain.now) < (Math.floor(pass[1]) * 1000 + 1000)
}

export function redact(string) {
  if (string.includes("'")) {
    const path_intern=string.slice(
      string.indexOf("'"),
      string.lastIndexOf("'") + 1
    )
    return string.replace(
      path_intern,'..'+path_intern.slice(Math.floor(path_intern.length/2)-1)
    )
  }
  else {
    return string
  }
}

export function nikkiNew() {
  const naiyou={'naiyou':[]}
  Fs.writeFileSync(
    nikkiFile,
    JSON.stringify(naiyou),
    {encoding:'utf8',flags:'w+'}
  )
  console.log('New nikkiFile been written.')
  return naiyou
}

export function nikkiMi(string) {
  let nikkiContent
  try {
    nikkiContent=JSON.parse(string)
  }
  catch {
    nikkiContent={'naiyou':[]}
  }
  return nikkiContent
}

export function nikkiYomi(cb) {
  Fs.readFile(nikkiFile,'utf8',
    (err,nikkiContent)=>{
      if (err) {
        cb(null,nikkiNew())
      }
      else {
        cb(null,nikkiMi(nikkiContent).naiyou)
      }
    }
  )
}

export function nikkiKaki(ato) {
  nikkiYomi(
    (err,naiyou)=>{
      let _naiyou
      
      if (naiyou.length>0) {
        _naiyou={'naiyou':ato.concat(naiyou)}
      }
      else {
        _naiyou={'naiyou':ato}
      }

      Fs.writeFileSync(
        nikkiFile,
        JSON.stringify(_naiyou),
        {encoding:'utf8',flags:'w'}
      )
    }
  )
}

export const contentJson=JSON.parse(
  await readFile(Path.join(basePath,'./content.json'))
)

export default {
    basePath,
    keyChain,
    claim,
    isNumeric,
    naming,
    parsing,
    timing,
    redact,
    nikkiYomi,
    nikkiKaki,
    contentJson
}
