document.addEventListener("DOMContentLoaded", ()=> {

	const hamburgerBtn = document.getElementById("hamburger-btn");
	const menu = document.querySelector(".menu");
	const nav = document.querySelector(".nav");
	const prev = document.getElementById("prev");
	const next = document.getElementById("next");

	const navHeight = nav.clientHeight;

	i = 0;
	spaImgCounter = 0;
	conferenceImgCounter = 0;


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
 		setInterval(()=> {
 			slide(1);
 		}, 5000);

 		prev.addEventListener("click", ()=> {
 			slide(2);
 		}, false);


 		next.addEventListener("click", ()=> {
 			slide(1);
 		}, false);
	 } else {

			next.addEventListener("click", ()=> {
				let picture = document.querySelectorAll(".picture");
				picture = [...picture];

				i = (i + 1) % 3;

				picture.forEach((imgs)=> {
					imgs.setAttribute("src", `_assets/img/image${i+3}.png`)
					i = (i + 1) % 3;
				});

			}, false);

			prev.addEventListener("click", ()=> {
				let picture = document.querySelectorAll(".picture");
				picture = [...picture];

				i = (i + 1) % 3;

				picture.forEach((imgs)=> {
					imgs.setAttribute("src", `_assets/img/image${i}.png`)
					i = (i + 1) % 3;
				});

			}, false);

	 }
	 

	// SPA_SLIDER
	const spaPrevBtn = document.querySelector(".spa .slider .navigation .prev");
	const spaStopBtn = document.querySelector(".spa .slider .navigation .stop");
	const spaNextBtn = document.querySelector(".spa .slider .navigation .next");

	spaPrevBtn.addEventListener("click", ()=> {
		spaSlider(2);
	}, false);

	spaStopBtn.addEventListener("click", ()=> {
		clearInterval(spaAutoSlider);
	}, false);

	spaNextBtn.addEventListener("click", ()=> {
		spaSlider(1);
	}, false);

	// AUTO_SLIDER
	const spaAutoSlider = setInterval(()=> {
		spaSlider(1);
	}, 7000);


	// CONFERENCE_SLIDER
	const conferencePrevBtn = document.querySelector(".conference .slider .navigation .prev");
	const conferenceStopBtn = document.querySelector(".conference .slider .navigation .stop");
	const conferenceNextBtn = document.querySelector(".conference .slider .navigation .next");

	conferencePrevBtn.addEventListener("click", ()=> {
		conferenceSlider(2);
	}, false);

	conferenceStopBtn.addEventListener("click", () => {
		clearInterval(conferenceAutoSlider);
	}, false);

	conferenceNextBtn.addEventListener("click", ()=> {
		conferenceSlider(1);
	}, false);

	// AUTO_SLIDER
	const conferenceAutoSlider = setInterval(()=> {
		conferenceSlider(1);
	}, 7000);
	

}, false);


// SLIDE
function slide(d) {
	
	let picture = document.querySelectorAll(".picture");
	picture = [...picture];

	i = (i + d) % 3;

	picture.forEach((imgs)=> {
		imgs.setAttribute("src", `_assets/img/image${i}.png`);
	});

}


// SPA_SLIDER
function spaSlider(d) {
	const spaImg = document.getElementById("spaImg");
	spaImgCounter = (spaImgCounter+d) % 3;
	spaImg.setAttribute("src", `_assets/img/spa_img${spaImgCounter}.png`);
}


// CONFERENCE_SLIDER
function conferenceSlider(d) {
	const conferenceImg = document.getElementById("conferenceImg");
	conferenceImgCounter = (conferenceImgCounter + d) % 3;
	conferenceImg.setAttribute("src", `_assets/img/conference_img${conferenceImgCounter}.png`);
}