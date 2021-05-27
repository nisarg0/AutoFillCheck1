console.log("added window.omload4");
window.onload = async function () {
	document
		.getElementById("myBtn")
		.addEventListener("click", async function () {
			var Msg = await getDetails(1);
			await sendMessageToExtension(Msg);
		});
};

async function getDetails(id) {
	var key = "1234";
	// Will get element by id
	var encodedMsg = genMessage(
		"https://services.gst.gov.in/services/login",
		CryptoJS.AES.encrypt("nisarg", key),
		CryptoJS.AES.encrypt("12345678", key),
		"username",
		"user_pass"
	);
	var e = JSON.stringify(encodedMsg);

	// console.log(encodedMsg);
	// var decodedusername = CryptoJS.AES.decrypt(encodedMsg.username, key);
	// var decodedpass = CryptoJS.AES.decrypt(encodedMsg.password, key);

	// console.log(
	// 	decodedpass.toString(CryptoJS.enc.Utf8) +
	// 		"   " +
	// 		decodedusername.toString(CryptoJS.enc.Utf8)
	// );
	return e;
}

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
