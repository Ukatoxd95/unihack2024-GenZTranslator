// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.text) {
    var translatedText = translateGenzToEnglish(request.text);
    sendResponse({ translation: translatedText });
  }
});
