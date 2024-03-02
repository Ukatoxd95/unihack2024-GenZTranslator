// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.text) {
    var translatedText = translateGenzToEnglish(request.text);
    sendResponse({ translation: translatedText });
  }
});

// function translateToGenZ(text) {
//   // Convert the selected text to lowercase to ensure case-insensitive matching
//   text = text.toLowerCase();

//   // Split the text into individual words
//   var words = text.split(" ");

//   // Initialize an empty array to store the translated words
//   var translatedWords = [];

//   // Iterate through each word in the selected text
//   words.forEach(function (word) {
//     // Check if the word exists in the translation dictionary
//     if (translationDictionary[word]) {
//       // If the word exists, add its Gen Z slang equivalent to the translated words array
//       translatedWords.push(translationDictionary[word]);
//     } else {
//       // If the word doesn't exist in the translation dictionary, keep the original word
//       translatedWords.push(word);
//     }
//   });

//   // Join the translated words array back into a single string
//   var translatedText = translatedWords.join(" ");

//   return translatedText;
// }
