"use strict";
document.addEventListener("DOMContentLoaded", () => {
	const menu = document.querySelector("header");
	const menuNav = document.getElementById("menu-open");
	const isMobile = () => window.innerWidth <= 700;
	const isMenuOpen = () => window.location.hash === "#menu-open";
	let lastScrollTop = 0;
	function handleScroll() {
		const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (currentScrollTop > lastScrollTop) {
			if (isMobile() && isMenuOpen()) {
				window.location.hash = "#close";
			}
			menu.classList.add("menu-hidden");
		} else {
			menu.classList.remove("menu-hidden");
		}
		lastScrollTop = Math.max(0, currentScrollTop);
	}
	window.addEventListener("scroll", handleScroll);

	function updateMenuDisplay() {
		if (isMobile()) {
			if (isMenuOpen()) {
				menuNav.classList.remove("menu-hidden");
			} else {
				menuNav.classList.add("menu-hidden");
			}
			menuNav.style.display = "block";
		} else {
			menuNav.style.display = "";
			menuNav.classList.remove("menu-hidden");
		}
	}
	updateMenuDisplay();
	window.addEventListener("resize", updateMenuDisplay);
	window.addEventListener("popstate", updateMenuDisplay);

	document.querySelector(".menu-open").addEventListener("click", () => {
		if (isMenuOpen()) {
			setTimeout(() => { window.location.hash = "#close"; }, 30);
		}
	});
});
