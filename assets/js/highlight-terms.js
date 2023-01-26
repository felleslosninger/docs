(function () {
 window.onload = function(){ // When the page has finished loading.
    $(".docnav").each(function(){ // Check every "ul" 
    if($(this).children().length == 0){ 
        $(".sidebar-inner").remove(); 
        } else{
        $(this).show();
        $(this).css("display", "block");
        }
     }
)}
    
     window.onload = function(){ // When the page has finished loading.
    $("#entrypages").each(function(){ // Check every "ul" 
    if($(this).children().length == 0){ 
        $("#entrypages").remove(); 
        } else{
        $(this).show();
        $(this).css("display", "block");
        }
     }
)}  
	
	
	
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
			firstMark.scrollIntoView({behavior: "auto", block: "center", inline: "nearest"});
			window.preventAutofocusScroll = true;
		}
	}
})();


//http://localhost:4000/saml_hurtigguide.html?h=test
