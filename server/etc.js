const Path=require("path")
const Fs=require("fs")

function isNumeric(str) {
	return !isNaN(parseFloat(str)) && isFinite(str)
}

function naming() {
	const timing=(Date.now()).toString()
	let mixing=(Math.round(Math.random()*10**8)).toString()
	
	for (const l=mixing.length;l<8;l++) mixing="0"+mixing
	
	return timing + "_" + mixing
}

function parsing(url) {
	return Object.fromEntries(new URLSearchParams(url.replace("/","")))
}

function timing(itu) {
	const key=Fs.readFileSync("./res/sancheck.key","utf8").split(",").map((x)=>parseInt(x))
	const chain={
		itu:parseInt(itu.toString().slice(0,key[1])),
		now:parseInt((Date.now()*key[0]).toString().slice(0,key[1]))
	}
	chain.sa=Math.abs(chain.itu-chain.now)

	return chain.sa < 3000
}

function redacting(string) {
	const a=string.indexOf("'/")
	const b=string.indexOf("/san")
	const c=string.slice(0,a)
	const d=string.slice(b)
	return c+".."+d
}s

function nikkiYomi() {
	Fs.access(nikkifile,(err)=>{
		if (err) {
			Fs.writeFileSync(nikkiFile,JSON.parse("[]"))
			e.message="Wrote Placeholder Content"
			return err
		}
	})
	Fs.readFile(nikkiFile,"utf8",(err,data)=>{
		if (err) {
			e.message="Unknown JSON Error"
			return err
		}
		const load=JSON.parse(data,{encoding:"utf8"})
		console.log(load)
		return load
	})
}

function nikkiKaki(naiyou) {
	Fs.writeFile(nikkiFile,JSON.stringify(naiyou,null,2),err=>{
		console.log("nikkiKaki: ",err.message)
	})
}

module.exports={
	isNumeric,
	naming,
	parsing,
	timing,
	redacting,
	nikkiYomi,
	nikkiKaki
}
