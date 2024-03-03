// Listens for messages from the extension's background script.
// When it receives a message, it checks if the message contains text (request.text). 
// If it does, it calls the translateGenzToEnglish function to translate the text
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.text) {
    var translatedText = translateGenzToEnglish(request.text);
    sendResponse({ translation: translatedText });
  }
});
