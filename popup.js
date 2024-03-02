let translateToGenZ = true; // Default direction

document.getElementById('switchDirectionBtn').addEventListener('click', function() {
    let btn = document.getElementById('switchDirectionBtn');
    translateToGenZ = !translateToGenZ; // Correctly toggles the translation direction
    let isArrowRight = btn.innerHTML === "&#8594;" || btn.innerHTML === "→";
    btn.innerHTML = isArrowRight ? "&#8592;" : "&#8594;";
});

document.getElementById('translateBtn').addEventListener('click', function() {
    // Determine which text area to use based on the direction of translation
    var sourceTextId = translateToGenZ ? 'englishText' : 'genzText';
    var sourceText = document.getElementById(sourceTextId).value;
    translateText(sourceText, translateToGenZ);
});

document.getElementById('translateWebPageBtn').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "translateWebPage"});
    });
});

function translateText(text, toGenZ) {
    if(toGenZ) {
        // Translate from English to Gen Z
        console.log("Translating to Gen Z:", text); // Implement
    } else {
        // Translate from Gen Z to English
        console.log("Translating to English:", text); // Implement 
    }
    document.getElementById('translationResult').textContent = "Translated Text";
}

function translateWebPage() {
    //
}