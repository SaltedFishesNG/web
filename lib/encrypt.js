"use strict";
function encrypt(plaintext) {
	var output = "";
	var key = Math.floor(Math.random() * 256);
	output += ("0" + Number(key).toString(16)).slice(-2);
	var escapedPlaintext = unescape(encodeURIComponent(plaintext));
	for (var i = 0; i < escapedPlaintext.length; i++) {
		var ciphertext = escapedPlaintext.charCodeAt(i) ^ key;
		output += ("0" + Number(ciphertext).toString(16)).slice(-2);
	}
	return output;
}
