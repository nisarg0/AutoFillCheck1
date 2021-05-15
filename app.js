const axios = require("axios");
const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const { response } = require("express");
const app = express();
const DomParser = require("dom-parser");
const { constants } = require("buffer");
const env = require("dotenv").config();

const CardAttributes = [
	"autoCompleteType",
	"data-stripe",
	"htmlName",
	"htmlID",
	"label-tag",
	"placeholder",
	"label-left",
	"label-top",
	"data-recurly",
];

const IdentityAttributes = [
	"autoCompleteType",
	"data-stripe",
	"htmlName",
	"htmlID",
	"label-tag",
	"placeholder",
	"label-left",
	"label-top",
	"data-recurly",
];

const UsernameFieldNames = [
	"username",
	"user name",
	"email",
	"email address",
	"e-mail",
	"e-mail address",
	"userid",
	"user id",
	"customer id",
	"login id",
];

const ExcludedAutofillTypes = [
	"radio",
	"checkbox",
	"hidden",
	"file",
	"button",
	"image",
	"reset",
	"search",
];

// function findUsernameField(
//   pageDetails,
//   passwordField,
//   canBeHidden,
//   canBeReadOnly,
//   withoutForm
// ) {
//   let usernameField = null;
//   for (let i = 0; i < pageDetails.fields.length; i++) {
//     const f = pageDetails.fields[i];
//     if (f.elementNumber >= passwordField.elementNumber) {
//       break;
//     }

//     if (
//       !f.disabled &&
//       (canBeReadOnly || !f.readonly) &&
//       (withoutForm || f.form === passwordField.form) &&
//       (canBeHidden || f.viewable) &&
//       (f.type === "text" || f.type === "email" || f.type === "tel")
//     ) {
//       usernameField = f;

//       if (this.findMatchingFieldIndex(f, UsernameFieldNames) > -1) {
//         // We found an exact match. No need to keep looking.
//         break;
//       }
//     }
//   }

//   return usernameField;
// }

class AutofillPageDetails {
	constructor() {
		documentUUID: string;
		title: string;
		url: string;
		documentUrl: string;
		tabUrl: string;
		// forms: { [id: string]: AutofillForm; };
		fields: AutofillField;
		collectedTimestamp: number;
	}
}
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
async function parsePage(data, url) {
	console.log("103");
	// var temp = "<strong>Beware of the leopard</strong>";
	const parser = new DomParser();
	const doc = parser.parseFromString(data, "text/hmtl");
	console.dir("107" + Object.keys(doc));

	var txt_box = doc.getElementsByTagName("input");

	// console.log(txt_box.textContent);

	for (i = 0; i < txt_box.length; i++) {
		console.log("------------------------------------------------");
		var valid = false;
		// console.log("118 " + txt_box[i].attributes.length);

		for (j = 0; j < txt_box[i].attributes.length; j++) {
			// console.log("120 name  : " + txt_box[i].attributes[j].name);
			// console.log("120 value : " + txt_box[i].attributes[j].value);
			if (txt_box[i].attributes[j].name === "type") {
				if (txt_box[i].attributes[j].value === "text") {
					valid = true;
				}
			}
		}

		// console.log("129 Valid : " + valid);
		if (valid) {
			for (j = 0; j < txt_box[i].attributes.length; j++) {
				console.log(
					txt_box[i].attributes[j].name +
						" = " +
						txt_box[i].attributes[j].value
				);
			}
		}
	}
	return genMessage(url, "nisarg", "12345678", "username", "user_pass");
}
// IMP LINK -> https://developer.chrome.com/docs/extensions/mv3/messaging/#external-webpage
// https://krasimirtsonev.com/blog/article/Send-message-from-web-page-to-chrome-extensions-background-script#:~:text=addEventListener(%22hello%22%2C%20function,one%20to%20the%20background%20script.
// function SendData(url) {
// 	// console.log(url);
// 	if (typeof window === "undefined") {
// 		console.log("Oops, `window` is not defined");
// 		return;
// 	}
// 	window.postMessage(
// 		{
// 			type: "FROM_PAGE_TO_CONTENT_SCRIPT",
// 			text: "Hello from the webpage!",
// 		},
// 		"*"
// 	);
// }
// }

// ------------------------------------Server details---------------------------------
// Calls the site and seds its html body
var GetHtmlPage = async (url) => {
	const res = await axios.get(url);
	// console.log("128 ");.

	return res.data;
};

app.use(bodyParser.urlencoded({ extended: true }));

async function analyse(req, res) {
	console.log("URL : " + req.body.siteurl);
	// URL I recieve from site
	var url = req.body.siteurl;

	var html_page = await GetHtmlPage(url);
	var Message = await parsePage(html_page, url);
	console.dir(Message);
	// SendData(url);
	// callExtension();
	// res.redirect(307, "/sendMessage");

	res.send("success");
}

app.post("/", analyse);

app.listen(54321, function () {
	console.log("Listening at 54321");
});
