function isNumeric(digit) {
	return !isNaN(parseFloat(digit)) && isFinite(digit)
}

function naming() {
	const timing=(Date.now()).toString()
	let mixing=(Math.round(Math.random()*10**8)).toString()
	
	for (const l=mixing.length;l<8;l++) mixing="0"+mixing
	
	return timing + "_" + mixing
}

function otherwise(ua) {
	const allow=[
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
	]
	
	if (allow.length===1 && ua===allow[0]) return true
	
	return false
}

module.exports={
	isNumeric,
	naming,
	otherwise,
}