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

async function getDetails(id) {
	// Will get element by id
	Message = genMessage(
		"https://infinity.icicibank.com/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=ICI&ITM=nli_personalb_personal_login_btn&_ga=2.136565301.449586349.1622022497-455473517.1622022497&_gl=1*c0o5z3*_ga*NDU1NDczNTE3LjE2MjIwMjI0OTc.*_ga_SKB78GHTFV*MTYyMjAyMjQ5OC4xLjEuMTYyMjAyMjkzMy42MA..",
		btoa("nisarg"),
		btoa("12345678"),
		"DUMMY1",
		"dummypwd1"
	);

	// Message = genMessage(
	// 	"https://services.gst.gov.in/services/login",
	// 	btoa("nisarg"),
	// 	btoa("12345678"),
	// 	"username",
	// 	"user_pass"
	// );

	return Message;
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

console.log("added window.omload4");
window.onload = async function () {
	document
		.getElementById("myBtn")
		.addEventListener("click", async function () {
			var Msg = await getDetails(1);
			await sendMessageToExtension(Msg);
		});
};
