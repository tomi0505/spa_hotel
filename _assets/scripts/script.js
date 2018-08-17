document.addEventListener("DOMContentLoaded", ()=> {

	const hamburgerBtn = document.getElementById("hamburger-btn");
	const menu = document.querySelector(".menu");
	const nav = document.querySelector(".nav");
	const prev = document.getElementById("prev");
	const next = document.getElementById("next");

	const navHeight = nav.clientHeight;
	let i = 0;


	// DROPDOWN_MENU
	hamburgerBtn.addEventListener("click", ()=> {
	  if (menu.style.display === "none") {
	    menu.style.display = "block";
	    menu.style.top = `${navHeight}px`;
	  } else {
	    menu.style.display = "none";
	  }
	}, false);


	// STICKY_MENU
    document.addEventListener("scroll", function() {
	    if (window.pageYOffset > navHeight) {
	        menu.style.top = `${0}px`;
	    } else {
	        menu.style.top = `${navHeight}px`;
	    }
	}, false);


 	// SLIDER
 	if(window.outerWidth < 768) {
 		prev.addEventListener("click", ()=> {
 			const picture = document.getElementById("picture");
 			i = (i+2) % 3;
 			picture.setAttribute("src", `_assets/img/image${i}.png`);
 		}, false);


 		next.addEventListener("click", ()=> {
 			const picture = document.getElementById("picture");
 			i = (i+1) % 3;
 			picture.setAttribute("src", `_assets/img/image${i}.png`);
 		}, false);
 	}

}, false);