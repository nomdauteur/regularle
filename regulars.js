var dashType='—';
var leftQuote="«";
var rightQuote="»";
var quotesDict={
	"елочки":{"left":"«","right":"»"},
	"лапки":{"left":"„","right":"“"},
	"одинарные":{"left":"'","right":"'"},
	"двойные":{"left":'"',"right":'"'}
};

var allLefts="«„'\"";
var allRights="»“'\"";

/*Settings*/

function load() {
	dashType=document.getElementById("dash-select").value;
	leftQuote=quotesDict[document.getElementById("quotes-select").value]["left"];
	rightQuote=quotesDict[document.getElementById("quotes-select").value]["right"];
	document.getElementById("counter").innerHTML="<b>Символов:</b> 0";
	//console.log(leftQuote+dashType+rightQuote);
}

function setDash() {
	dashType=document.getElementById("dash-select").value;
	//console.log(leftQuote+dashType+rightQuote);
}

function setQuotes() {
	leftQuote=quotesDict[document.getElementById("quotes-select").value]["left"];
	rightQuote=quotesDict[document.getElementById("quotes-select").value]["right"];
	//console.log(leftQuote+dashType+rightQuote);
}

/*Logic*/

function getText() {
	var txt = new Text(document.getElementById("text").value);
	return txt;
}

function setText(txt) {
	document.getElementById("text").value = txt.value();
}

function hyphensToDashes() {
	var txt = getText();
	txt.hyphenToDash(dashType);
	setText(txt);	
}

function adjustDash() {
	var goodDash = dashType;
	var badDash = '–—'.replace(goodDash,'');
	console.log("Bad dash is: "+badDash);
	var txt = getText();
	txt.dashToDash(badDash,goodDash);
	setText(txt);
}

function trimExtraSpaces() {
	var txt = getText();
	txt.trimSpaces();
	setText(txt);
}

function fixQuotes() {
	var txt = getText();
	txt.setQuotes(leftQuote,rightQuote);
	setText(txt);
}

function fixSpacesAround() {
	var txt = getText();
	txt.fixSpaces();
	setText(txt);
}

function fixDots() {
	var txt = getText();
	txt.fixDots();
	setText(txt);
}

function fixCapitalLetters() {
	var txt = getText();
	txt.fixCapitalLetters();
	setText(txt);
}

function listToList() {
	var txt = getText();
	txt.listToList();
	setText(txt);
}

function fixSpeechRemarks() {
	var txt = getText();
	txt.fixSpeechRemarks(dashType);
	setText(txt);
}

function fixAroundQuotes() {
	var txt = getText();
	txt.fixAroundQuotes(rightQuote);
	setText(txt);
}

function count() {
	var txt = getText();
	document.getElementById("counter").innerHTML="<b>Символов:</b> "+txt.length();
}
