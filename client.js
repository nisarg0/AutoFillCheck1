console.log("added window.omload4");
window.onload = async function () {
	document
		.getElementById("myBtn")
		.addEventListener("click", async function () {
			var id = 1;
			var encyyptedMsgLvl1 = await EncryptLevel1(id);
			var encryptedMsgLvl2 = await EncryptLevel2(encyyptedMsgLvl1);
			await sendMessageToExtension(encryptedMsgLvl2);
		});
};

// added Wheeler & Needham’s Tiny Encryption Algorithm only to username and password
async function EncryptLevel1(id) {
	var key = "1234";
	// Will get element by id
	return genMessage(
		"https://services.gst.gov.in/services/login",
		encrypt("nisarg", key),
		encrypt("12345678", key),
		"username",
		"user_pass"
	);
}

// Added a base-64 encoding
async function EncryptLevel2(Msg) {
	var a = JSON.stringify(Msg);
	return btoa(a);
}

// Sends message to the extension
async function sendMessageToExtension(Message) {
	// we get extension id from extension store after publisjing it.
	// Currently its local extensin id and you may need to change it.
	var editorExtensionId = "eanfbmfpilfndlojhlhmmneakpaoggak";
	await chrome.runtime.sendMessage(
		editorExtensionId,
		Message,
		function (response) {
			if (response)
				alert(
					"Only click on extenion when you see the login and password boxes"
				);
			else alert("Something went wrong");
		}
	);
}

function genMessage(
	url,
	username,
	password,
	userNameFieldName,
	passwordFieldName
) {
	return {
		url: url,
		username: username,
		password: password,
		userNameFieldName: userNameFieldName,
		passwordFieldName: passwordFieldName,
	};
}

// ---------------------------------------Wheeler & Needham’s Tiny Encryption Algorithm--------------

// Encryption algorithm
// use (16 chars of) 'password' to encrypt 'plaintext'
// https://www.movable-type.co.uk/scripts/tea.html
function encrypt(plaintext, password) {
	var v = new Array(2),
		k = new Array(4),
		s = "",
		i;

	plaintext = encodeURI(plaintext); // use escape() so only have single-byte chars to encode

	// build key directly from 1st 16 chars of password
	for (var i = 0; i < 4; i++)
		k[i] = Str4ToLong(password.slice(i * 4, (i + 1) * 4));

	for (i = 0; i < plaintext.length; i += 8) {
		// encode plaintext into s in 64-bit (8 char) blocks
		v[0] = Str4ToLong(plaintext.slice(i, i + 4)); // ... note this is 'electronic codebook' mode
		v[1] = Str4ToLong(plaintext.slice(i + 4, i + 8));
		code(v, k);
		s += LongToStr4(v[0]) + LongToStr4(v[1]);
	}

	return escCtrlCh(s);
	// note: if plaintext or password are passed as string objects, rather than strings, this
	// function will throw an 'Object doesn't support this property or method' error
}

function code(v, k) {
	// Extended TEA: this is the 1997 revised version of Needham & Wheeler's algorithm
	// params: v[2] 64-bit value block; k[4] 128-bit key
	var y = v[0],
		z = v[1];
	var delta = 0x9e3779b9,
		limit = delta * 32,
		sum = 0;

	while (sum != limit) {
		y += (((z << 4) ^ (z >>> 5)) + z) ^ (sum + k[sum & 3]);
		sum += delta;
		z += (((y << 4) ^ (y >>> 5)) + y) ^ (sum + k[(sum >>> 11) & 3]);
		// note: unsigned right-shift '>>>' is used in place of original '>>', due to lack
		// of 'unsigned' type declaration in JavaScript (thanks to Karsten Kraus for this)
	}
	v[0] = y;
	v[1] = z;
}

// supporting functions

function Str4ToLong(s) {
	// convert 4 chars of s to a numeric long
	var v = 0;
	for (var i = 0; i < 4; i++) v |= s.charCodeAt(i) << (i * 8);
	return isNaN(v) ? 0 : v;
}

function LongToStr4(v) {
	// convert a numeric long to 4 char string
	var s = String.fromCharCode(
		v & 0xff,
		(v >> 8) & 0xff,
		(v >> 16) & 0xff,
		(v >> 24) & 0xff
	);
	return s;
}

function escCtrlCh(str) {
	// escape control chars which might cause problems with encrypted texts
	return str.replace(/[\0\t\n\v\f\r\xa0'"!]/g, function (c) {
		return "!" + c.charCodeAt(0) + "!";
	});
}
