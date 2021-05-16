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

console.log("added window.omload");
window.onload = function () {
	document.getElementById("myBtn").addEventListener("click", function () {
		console.log("Sending info to extension");
		url = "https://www.google.com/";
		// if (chrome) console.log("chrome is defined");
		var editorExtensionId = "eanfbmfpilfndlojhlhmmneakpaoggak";
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
