function sendMsgToExtension() {
	console.log("In extension");
	if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
		chrome.runtime.sendMessage(
			"feneepekkegnbffjepdhkdiggmebjifo",
			{ greeting: "yes" },
			onAccessApproved
		);
	} else {
		console.log("No chrome");
	}
}

document.getElementById("myBtn").addEventListener("click", sendMsgToExtension);
