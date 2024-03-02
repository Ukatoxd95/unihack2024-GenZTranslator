document.getElementById('translateBtn').addEventListener('click', function() {
    var sourceText = document.getElementById('sourceText').value;
    translateText(sourceText);
});

document.getElementById('toggleTranslation').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleTranslation"});
    });
});

function translateText(sourceText) {
    // Example translation logic
    const dictionary = {
        "lit": "exciting",
        "fam": "close friends",
        // Add more slang terms and their translations
    };

    let translationResult = sourceText.split(' ').map(word => {
        return dictionary[word.toLowerCase()] || word;
    }).join(' ');

    document.getElementById('translationResult').textContent = translationResult;
}