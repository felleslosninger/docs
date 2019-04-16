//

var markInstance = new Mark(document.getElementById('search-results'));

(function () {
  function displaySearchResults(results, store) {

    var searchResults = document.getElementById('search-results');



    if (results.length) { // Are there any results?
      var appendString = '';

       // for (var i = 0; i < results.length; i++) {  // Iterate over the results
        for (var i = 0; i < results.length && i < 10; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        contentPreview = getPreview(searchTerm, item.content, 170),
        urlPreview = getPreview(searchTerm, item.url),
        titlePreview = getPreview(searchTerm, item.title),
        productPreview= getPreview(searchTerm, item.product);

        // appendString += '<a href="' + item.url + '"><h4>' + item.title + '</h4></a>';
        // appendString += '<p>' + contentPreview + '</p>';
        appendString +=

        "<h4 class='search-result-title'><a href='" + item.url.trim() + "?h=" + encodeURIComponent(searchTerm).replace(/'/g, "%27") + "'>" + titlePreview + "</a></h4>" +
            "<p class='search-result-url'><small>" + "Produkt: " + productPreview + "</small></p>" +
            "<p class='search-result-snippet'>" + contentPreview + "</p>";

      }

      searchResults.innerHTML = appendString, performMark();
    } else {
      // this is a hack for the inability to submit different language strings here
      searchResults.innerHTML = '<span style="color: red"><i class="fa fa-times" aria-hidden="true"></i><i class="fa fa-times" aria-hidden="true"></i><i class="fa fa-times" aria-hidden="true"></i><i class="fa fa-times" aria-hidden="true"></i><i class="fa fa-times" aria-hidden="true"></i></span><p><br/>{{site.uistring.no_search_results_found}}</p>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  function getPreview(searchTerm, content, previewLength) {
      previewLength = previewLength || (content.length * 2);

      var parts = searchTerm.split(" "),
          loweredContent = content.toLowerCase(),
          match = content.toLowerCase().indexOf(searchTerm.toLowerCase()),
          matchLength = searchTerm.length,
          preview;

      // Find a relevant location in content
      for (var i = 0; i < parts.length; i++) {
          if (match >= 0) {
              break;
          }

          match = loweredContent.indexOf(parts[i].toLowerCase());
          matchLength = parts[i].length;
      }

      // Create preview
      if (match >= 0) {
          var start = match - (previewLength / 2),
              end = start > 0 ? match + matchLength + (previewLength / 2) : previewLength;

          preview = content.substring(start, end).trim();

          if (start > 0) {
              preview = "..." + preview;
          }

          if (end < content.length) {
              preview = preview + "...";
          }

          // Highlight query parts
          preview = preview.replace(new RegExp("(" + parts.join("|") + ")", "gi"), "<strong>$1</strong>");
      } else {
          // Use start of content if no match found
          preview = content.substring(0, previewLength).trim() + (content.length > previewLength ? "..." : "");
      }

      return preview;
  }

  // Read the keyword
  var searchTerm = getQueryVariable('query');


  function performMark() {
          markInstance.mark(searchTerm);
      }


  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    //document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('product');
      this.field('tags');
      this.field('content');

    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'tags': window.store[key].tags,
        'content': window.store[key].content,
        'product': window.store[key].product
      });
      // Listen to input and option changes


      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store, searchTerm); // We'll write this in the next section

    }
  }

}

)();
