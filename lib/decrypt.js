"use strict";
document.addEventListener("DOMContentLoaded", () => {
	function decrypt(url, index = 0) {
		var output = "";
		var key = parseInt(url.substr(index, 2), 16);
		for (var i = index + 2; i < url.length; i += 2) {
			var hex = parseInt(url.substr(i, 2), 16) ^ key;
			output += String.fromCharCode(hex);
		}
		return decodeURIComponent(escape(output));
	}

	var tags = document.getElementsByTagName("a");
	for (var i = 0; i < tags.length; i++) {
		try {
			var tag = tags[i];
			var foundIndex = tag.href.indexOf("/pages/Email/#@!");
			if (foundIndex > -1) {
				tag.href = decrypt(tag.href, foundIndex + 16);
			}
		} catch (e) {}
	}
});
