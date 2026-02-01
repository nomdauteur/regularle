class Text {
	constructor(text) {
		this.text=text;
	}

	value() {
		return this.text;
	}

	length() {
		return this.text.length;
	}

	hyphenToDash(dash) {
		this.text = this.text.replaceAll(/- /gm, dash+" ");
	}

	dashToDash(badDash, goodDash) {
		this.text = this.text.replace(new RegExp(badDash,"gm"), goodDash);
	}

	trimSpaces() {
		this.text = this.text.replace(new RegExp(" {2,}","gm"), " ");
		this.text = this.text.replace(new RegExp("^ +","gm"), "");
		this.text = this.text.replace(new RegExp(" +$","gm"), "");
	}

	setQuotes(left, right) {
		var allLefts="«„'\"";
		var allRights="»“'\"";
		var wrongLefts = allLefts.replace(left,"");
		var wrongRights = allRights.replace(right,"");
		this.text = this.text.replace(new RegExp("( |^|\\\()["+wrongLefts+"]","gm"),"$1"+left);
		this.text = this.text.replace(new RegExp("["+wrongRights+"]","gm"),right);
		
	}

	fixSpaces() {
		this.text = this.text.replace(/([\?!\.])([^\. \n»”'"]|$)/gm, "$1 $2");
		this.text = this.text.replace(/([^ ])([«“'"\(])/gm, "$1 $2");
		this.text = this.text.replace(/([»”'"\),])([^ ])/gm, "$1 $2");
		this.text = this.text.replace(/([«“'"\(]) /gm, "$1");
		this.text = this.text.replace(/ ([»”'"\),\?!])/gm, "$1");
		this.text = this.text.replace(/([^ \n])([–—])/gm, "$1 $2");
		this.text = this.text.replace(/([–—])([^ \n]|$)/gm, "$1 $2");
		this.text = this.text.replace(/ \.([^\.])/gm, ".$1");
	}

	fixDots() {
		this.text = this.text.replace(/([^\.?!]|$)\.\.([^\.]|$)/gm, "$1\.$2");
		this.text = this.text.replace(/([\?\!])\.{3,}/gm, "$1\.\.");
		this.text = this.text.replace(/\.{3,}/gm, "…");
	}

	fixCapitalLetters() {
		if (/[а-яё]/.test(this.text.at(0))) this.text = this.text.substring(0,1).toUpperCase()+this.text.substring(1);
		this.text = this.text.replace(/([\.\?\!…] |[\.\?\!…]$\n|^— |^– |^- )([а-яё])/gm, 
			(match, g1,g2) => {return g1+g2.toUpperCase()});
	}

	listToList() { // 1) а -> 1. А
		this.text = this.text.replace(/^([0-9]+)\) ([а-я])/gmi, (match, g1,g2) => {return g1+". "+g2.toUpperCase()});
	}

	fixAroundQuotes(right) {
		this.text = this.text.replace(new RegExp("([^\\\.])([,\\\.])(["+right+"])","gm"),"$1$3$2");
	}

	fixSpeechRemarks(dashType) { // . — сказал -> , — сказал
		this.text = this.text.replace(new RegExp("\\\. "+dashType+" ([а-яё])","gm"), ", — $1");
	}

}