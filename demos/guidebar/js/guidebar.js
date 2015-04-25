var Guidebar = {
  guidebar: "",
  documentHeight: 0,
  sectionheaders:[],
  selector: "",

  // Get vertical position of the guide element within the guidebar
  // Returns percentage used in vertical positioning
  getElementOffset: function (el) {
    return (el.offsetTop / documentHeight * 100);
  },

  getDocumentHeight: function () { //  Needed for cross-browser compatibility
    return height =
      Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
  },

  getSectionHeaders: function (selector) {
    // If the first char is a period, assume a class, otherwise assume a tag
    if ( selector[0] == "." ) {
      return document.getElementsByClassName("x");
    } else {
      return document.getElementsByTagName(selector);
    }
  },

  initialize: function (selector) {
    var guide; // the element to be added to the DOM
    var sectionText; // the section text

    // Add the guidebar to the page
    guidebar = document.createElement("div");
    guidebar.setAttribute("id","guidebar");
    document.body.appendChild(guidebar);

    // Get the section header objects and extract header text
    Guidebar.selector = selector;
    sectionHeaders = Guidebar.getSectionHeaders(selector);

    documentHeight = Guidebar.getDocumentHeight();


    for ( var i = 0; i < sectionHeaders.length; i++ ) {

      guide = document.createElement("p");
      sectionText = document.createTextNode(sectionHeaders[i].innerHTML);

      // Add the element to the DOM
      guide.appendChild(sectionText);
      guidebar.appendChild(guide);

      // Position the guide within the guidebar
      guide.style.top = Guidebar.getElementOffset(sectionHeaders[i]) + "%";

      // Make the guide clickable
      guide.setAttribute("data-offset",sectionHeaders[i].offsetTop);
      guide.addEventListener("click", function () { window.scrollTo(0,this.getAttribute("data-offset")) }, false);

    }
  },

  reset: function () {
    guidebar = document.getElementById("guidebar");
    while (guidebar.firstChild) {
        guidebar.removeChild(guidebar.firstChild);
    }
    Guidebar.initialize(Guidebar.selector);
  }
};

// If content is responsive, we need to recalculate positions on resize
window.addEventListener("resize", Guidebar.reset);
