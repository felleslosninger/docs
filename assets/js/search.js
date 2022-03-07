//

var markInstance = new Mark(document.getElementById('search-results'));

(function () {
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
          preview = preview.replace(new RegExp("(" + parts.join("|") + ")", "gi"), "<div style=\"background-color:yellow; display: inline\"><strong>$1</strong></div>");
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

    document.addEventListener('DOMContentLoaded', function() {
      initializeJekyllSearch();
      var value = document.getElementById('search-box').value;
      if(value) {
        // Use this to search
        setTimeout(() => {
          window.simpleJekyllSearch.search(value);
        }, 200)
      }
    }, false);

    function initializeJekyllSearch() {
      window.simpleJekyllSearch = SimpleJekyllSearch({
        searchInput: document.getElementById('search-box'),
        resultsContainer: document.getElementById('search-results'),
        searchResultTemplate: "<h4 class='search-result-title'><a href={url}>{title}</a></h4>" +
            "<p class='search-result-url'><small>" + "Produkt: {product}</small></p>" +
            "<div><p class='search-result-snippet'>{content}</p></div>",
        json: '../search.json',        
        debounceTime: 200,
        templateMiddleware: function(prop, value, template) {
          if(prop === 'content') {
            if(value) {
              console.log('added: ' + value);
              return getPreview(document.getElementById('search-box').value, value, 170);
            }            
            template = '';
            console.log('removed: ' + value);
            return template;
          } else if(prop === 'product') {
            if(value) {
              return value;
            }
            return '';
          } else if(prop === 'title') {
              return getPreview(document.getElementById('search-box').value, value, 170);
          }

          return value;
        },
        success: function() {          
          console.log('success search');
        }
        });
    }

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);
    }
}

)();
