document.addEventListener("DOMContentLoaded", ()=> {

	const hamburgerBtn = document.getElementById("hamburger-btn");
	const menu = document.querySelector(".menu");
	const nav = document.querySelector(".nav");
	const prev = document.getElementById("prev");
	const next = document.getElementById("next");
	series = true;

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

			setInterval(imageSwitch, 5000);

			next.addEventListener("click", imageSwitch, false);
			prev.addEventListener("click", imageSwitch, false);

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

	conferenceStopBtn.addEventListener("click", ()=> {
		clearInterval(conferenceAutoSlider);
	}, false);

	conferenceNextBtn.addEventListener("click", ()=> {
		conferenceSlider(1);
	}, false);

	// AUTO_SLIDER
	const conferenceAutoSlider = setInterval(()=> {
		conferenceSlider(1);
	}, 7000);

	
	// SMOOTH_SCROLL_100VH_HEADER
	const slideDownBtn = document.getElementById("slide-down-btn");

	slideDownBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const header = document.getElementById("header");
		window.smoothScrollTo(0, header.clientHeight, 2000);
	}, false);


	// SMOOTH_SCROLL_TO_TOP
	const topBtn = document.getElementById("top-btn");

	topBtn.addEventListener("click", (e)=> {
		e.preventDefault();
		window.smoothScrollTo(0, 0, 2000);
	}, false);


	// #AJAX#
	const sendBtn = document.getElementById("send-btn");

	sendBtn.addEventListener("click", (e)=> {

		e.preventDefault();

		const url = "http://tomaszgrzyb.eu/projects/spa_hotel/zap.php";

		const request = new XMLHttpRequest();
		request.open("GET", url);

		request.onload = function () {

			if (request.status == 200) {

				pageRequest(request.responseText);

			}

		};

		request.error = function () {

			alert("Coś poszło nie tak!!");

		};

		request.send(null);

	}, false);

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


// IMAGE_SWITCH
function imageSwitch() {
	
	let picture = document.querySelectorAll(".picture");
	picture = [...picture];

	if (series) {
		picture.forEach((imgs) => {
			const srcImgs = imgs.getAttribute("src");
			let nrImgs = parseInt(srcImgs.substr(srcImgs.length - 5).split(".")[0], 10);
			const newSeries = nrImgs + picture.length;
			imgs.setAttribute("src", `_assets/img/image${newSeries}.png`);
			series = false;
		});
	} else {
		picture.forEach((imgs) => {
			const srcImgs = imgs.getAttribute("src");
			let nrImgs = parseInt(srcImgs.substr(srcImgs.length - 5).split(".")[0], 10);
			const newSeries = nrImgs - picture.length;
			imgs.setAttribute("src", `_assets/img/image${newSeries}.png`);
			series = true;
		});
	}

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


// PAGE_REQUEST
function pageRequest(obj) {	

	const data = JSON.parse(obj);

	alert(`${data.name} ${data.surname}\nZapisałeś się do newsletter-a!`);

}


// SMOOTH_SCROLL_EXTERNAL_SCRIPT
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
window.smoothScrollTo = function (endX, endY, duration) {
	var startX = window.scrollX || window.pageXOffset,
		startY = window.scrollY || window.pageYOffset,
		distanceX = endX - startX,
		distanceY = endY - startY,
		startTime = new Date().getTime();

	duration = typeof duration !== 'undefined' ? duration : 400;

	// Easing function
	var easeInOutQuart = function (time, from, distance, duration) {
		if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
		return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
	};

	var timer = window.setInterval(function () {
		var time = new Date().getTime() - startTime,
			newX = easeInOutQuart(time, startX, distanceX, duration),
			newY = easeInOutQuart(time, startY, distanceY, duration);
		if (time >= duration) {
			window.clearInterval(timer);
		}
		window.scrollTo(newX, newY);
	}, 1000 / 60); // 60 fps
};