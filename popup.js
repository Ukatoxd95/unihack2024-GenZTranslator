document.getElementById('toggleTranslation').addEventListener('click', function() {
    // Send a message to the content script to toggle the translation on the page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleTranslation"});
    });
});