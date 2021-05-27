const encoder = new TextEncoder("big5");
const decoder = new TextDecoder("big5");

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
	// Will get element by id
	var encodedMsg = genMessage(
		"https://services.gst.gov.in/services/login",
		encoder.encode("nisarg"),
		encoder.encode("12345678"),
		"username",
		"user_pass"
	);

	console.log(encodedMsg);
	var decodedusername = decoder.decode(encodedMsg.username);
	var decodedpass = decoder.decode(encodedMsg.password);
	console.log(decodedpass + "   " + decodedusername);
	return encodedMsg;
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
