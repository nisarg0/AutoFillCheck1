function genMessage(
	site,
	username,
	password,
	userNameFieldName,
	passwordFieldName
) {
	return {
		site: site,
		username: username,
		password: password,
		userNameFieldName: userNameFieldName,
		passwordFieldName: passwordFieldName,
	};
}

console.log("added window.omload4");
window.onload = function () {
	document.getElementById("myBtn").addEventListener("click", function () {
		console.log("Sending info to extension");

		// For now hard coded fields but we need to retieve them from database.
		Message = genMessage(
			"https://services.gst.gov.in/services/login",
			"nisarg",
			"12345678",
			"username",
			"user_pass"
		);

		// we get extension id from extension store after publisjing it.
		// Currently its local extensin id and you may need to change it.
		var editorExtensionId = "eanfbmfpilfndlojhlhmmneakpaoggak";
		chrome.runtime.sendMessage(
			editorExtensionId,
			Message,
			function (response) {
				console.log("msg sent");
			}
		);
	});
};
