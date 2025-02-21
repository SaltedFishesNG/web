{
	const patchSheet = s => {
		for (let rule of s.cssRules) {
			if (rule.styleSheet && patchSheet(rule.styleSheet)) return true;
			if (rule.conditionText === "(prefers-color-scheme: dark)") {
				for (let r of rule.cssRules) {
					s.insertRule(`${r.selectorText}[data-theme="dark"] {${r.style.cssText}}`, s.cssRules.length);
				}
				return true;
			}
		}
		return false;
	};

	const patchAll = () => [...document.styleSheets].some(patchSheet);	

	if (!patchAll()) {
		console.error("Couldn't patch sheets while loading, deferring to onload");
		addEventListener("load", function onload(e) {
			if (patchAll()) removeEventListener(e.type, onload, true);
		}, true);
	}
}
{
	const prefers = theme => matchMedia(`(prefers-color-scheme: ${theme})`).matches;
	const root = document.documentElement;
	root.dataset.theme = sessionStorage.getItem("color-scheme") || (prefers("light") ? "light" : "dark");
	document.addEventListener("DOMContentLoaded", () => {
		const toggle = document.querySelector(".darklight");
		toggle.style.display = "block";
		toggle.addEventListener("click", () => {
			const theme = root.dataset.theme === "light" ? "dark" : "light";
			root.dataset.theme = theme;
			sessionStorage.setItem("color-scheme", theme);
		});
	});
}