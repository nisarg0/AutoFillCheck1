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
const url = "https://www.facebook.com/";

window.onload = function () {
	document.getElementById("myBtn").addEventListener("click", function () {
		console.log("Sending info to extension");

		chrome.runtime.sendMessage(
			editorExtensionId,
			{ openUrlInEditor: url },
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
