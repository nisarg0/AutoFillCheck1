// function sendMsgToExtension() {
// 	console.log("In extension");
// 	if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
// 		chrome.runtime.sendMessage(
// 			"feneepekkegnbffjepdhkdiggmebjifo",
// 			{ greeting: "yes" },
// 			onAccessApproved
// 		);
// 	} else {
// 		console.log("No chrome");
// 	}
// }

// window.onload = function () {
// 	const url = "https://www.facebook.com/";
// 	document.getElementById("theButton").addEventListener(
// 		"click",
// 		function () {
// 			window.postMessage(
// 				{
// 					type: "FROM_PAGE_TO_CONTENT_SCRIPT",
// 					text: "Hello from the webpage!",
// 				},
// 				"*"
// 			);
// 		},
// 		false
// 	);
// };

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

console.log("added window.omload2");
window.onload = function () {
	document.getElementById("myBtn").addEventListener("click", function () {
		console.log("Sending info to extension");
		Messege = genMessage(
			url,
			"nisarg",
			"12345678",
			"username",
			"user_pass"
		);
		// if (chrome) console.log("chrome is defined");
		var editorExtensionId = "eanfbmfpilfndlojhlhmmneakpaoggak";
		chrome.runtime.sendMessage(
			editorExtensionId,
			Messege,
			function (response) {
				console.log("msg sent");
				if (!response.success) handleError(url);
			}
		);

		// if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
		// 	chrome.runtime.sendMessage(
		// 		"feneepekkegnbffjepdhkdiggmebjifo",
		// 		{ greeting: "yes" },
		// 		onAccessApproved
		// 	);
		// } else {
		// 	console.log("No chrome");
		// }
	});
};

// window.addEventListener('load',function(){
// 	document.getElementById("id1").addEventListener("click", click_handler1, false);
// 	document.getElementById("id2").addEventListener("click", click_handler2, false);
// });
