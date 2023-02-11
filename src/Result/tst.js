
export function bodyScroll() {
	var scrollTimer = -1;
      document.body.style.backgroundColor = "white";

      if (scrollTimer != -1)
        clearTimeout(scrollTimer);

      scrollTimer = window.setTimeout(console.log("scrolled"), 500);
    }

    function scrollFinished() {
      document.body.style.backgroundColor = "red";
    }