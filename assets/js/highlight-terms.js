(function () {

        var results,
       // the class that will be appended to the current
       // focused element
       currentClass = "current",
       // top offset for the jump (the search bar)
       offsetTop = 50,
       // the current index of the focused element
       currentIndex = 0;

	function getQueryVariable(variable) {

        var str = window.location.href,
         n = str.indexOf("?"),
         query = str.substring(n+1),
			vars = query.split("&");

		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");

			if (pair[0] === variable) {
				return pair[1];
			}
		}
	}
    var term = decodeURIComponent((getQueryVariable("h") || "").replace(/\+/g, "%20"));


	if (term) {
		var contentEl = document.querySelector(".main"),
			mark = new Mark(contentEl);


		mark.mark(term);

        var firstMark = document.querySelector("mark");
		if (firstMark) {
			firstMark.scrollIntoView(alignTo=false);
			window.preventAutofocusScroll = true;
		}
	}
})();


//http://localhost:4000/saml_hurtigguide.html?h=test
