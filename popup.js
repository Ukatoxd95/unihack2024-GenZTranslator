document.addEventListener("DOMContentLoaded", function () {
  // Default direction: translation to Gen Z
  var translateToGenZ = true;

  // Retrieve selected text from storage, if any, and populate the English text area
  chrome.storage.local.get("selectedText", (data) => {
    const selectedText = data.selectedText;
    if (selectedText) {
      document.getElementById("englishText").value = selectedText;
    }
  });

  // Event listener for the switch direction button
  document
    .getElementById("switchDirectionBtn")
    .addEventListener("click", function () {
      var btn = document.getElementById("switchDirectionBtn");
      // Correctly toggles the translation direction
      translateToGenZ = !translateToGenZ;
      console.log(translateToGenZ ? "Left to Right" : "Right to Left");
      var isArrowRight = btn.innerHTML === "&#8594;" || btn.innerHTML === "→";
      // Change button icon based on the translation direction
      btn.innerHTML = isArrowRight ? "&#8592;" : "&#8594;";
    });

  // Event listener for the translate button
  document
    .getElementById("translateBtn")
    .addEventListener("click", function () {
      // Determine which text area to use based on the direction of translation
      var sourceTextId = translateToGenZ ? "englishText" : "genzText";
      var sourceText = document.getElementById(sourceTextId).value;
      console.log("Translating: " + sourceText);
      translateText(sourceText, translateToGenZ);
    });
});

function translateText(text, toGenZ) {
  // Get json data
  if (toGenZ) {
    // Translate from English to Gen Z
    // Implement the translation
    fetch("./wordtranslation.json")
      .then((response) => response.json())
      .then((json) => {
        var translationResultText = translateEnglishToGenz(text, json);
        //replace genz textbox with result
        document.getElementById("genzText").textContent = translationResultText;
      })
      .catch((error) => {
        console.error("Error loading JSON file:", error);
      });
  } else {
    fetch("./wordtranslationreversed.json")
      .then((response) => response.json())
      .then((json) => {
        // Translate from Gen Z to English
        // Implement the translation
        var translationResultText = translateGenzToEnglish(text, json);
        //replace genz textbox with result
        document.getElementById("englishText").textContent =
          translationResultText;
      })
      .catch((error) => {
        console.error("Error loading JSON file:", error);
      });
  }
}

function translateWebPage() {
  //Redirects user to .com
  window.location.href = ".com";
}

function translateEnglishToGenz(text, json) {
  // Go through each key and check if it can replace any sub strings
  var newString = text.toLowerCase();
  for (let key in json) {
    if (newString.includes(key)) {
      newString = newString.replaceAll(key, json[key]);
    }
  }
  return newString;
}

function translateGenzToEnglish(text, json) {
  var newString = text.toLowerCase();
  // Checks if the key exists in the json file and replaces gen z slang with a random word
  newString = newString.split(" ");
  for (let i = 0; i < newString.length; i++) {
    filteredString = newString[i].replace(/[^a-zA-Z]+/g, "");
    if (filteredString in json) {
      currValue = json[filteredString];
      let max = currValue.length;
      let randInt = Math.floor(Math.random() * max);
      let newSubString = currValue[randInt];
      newString[i] = newString[i].replace(filteredString, newSubString);
    }
  }
  return newString.join(" ");
}
