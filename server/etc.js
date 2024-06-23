const Fs=require("fs")

const key=Fs.readFileSync("./res/sancheck.key","utf8").split(",").map((x)=>parseInt(x))

function isNumeric(digit) {
	return !isNaN(parseFloat(digit)) && isFinite(digit)
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
	const chain={
		itu:parseInt(itu.toString().slice(0,key[1])),
		now:parseInt((Date.now()*key[0]).toString().slice(0,key[1]))
	}
	chain.sa=Math.abs(chain.itu-chain.now)

	return chain.sa < 3000
}

function redacting(string) {
	return string.slice(0,25)+"..."
}

module.exports={
	isNumeric,
	naming,
	parsing,
	timing,
	redacting
}
