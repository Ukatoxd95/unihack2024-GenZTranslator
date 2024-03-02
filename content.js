
// Right click on the selected text and it should pop up a context menu with the option to translate the selected text to Gen Z language.

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translateToGenZ" && info.selectionText) {
      translateTextToGenZ(info.selectionText, tab);
    }
  });
  
  function translateTextToGenZ(text, tab) {
    // Your translation logic here...
    // Example: Replace selected text with translated text
    const translatedText = translateText(text, translationMap);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (text) => {
        document.getSelection().toString() = text;
      },
      args: [translatedText]
    });
  }
  