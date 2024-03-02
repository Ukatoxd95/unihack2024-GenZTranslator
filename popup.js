let translateToGenZ = true; // Default direction

document.getElementById('switchDirectionBtn').addEventListener('click', function() {
    let btn = document.getElementById('switchDirectionBtn');
    //change the state of the translation language
    translateToGenZ = !translateToGenZ;
    let isArrowRight = btn.innerHTML === "&#8594;" || btn.innerHTML === "→"; // Check if the arrow points right
    btn.innerHTML = isArrowRight ? "&#8592;" : "&#8594;"; // Switch between right (→) and left (←) arrows
});

document.getElementById('translateBtn').addEventListener('click', function() {
    var sourceText = document.getElementById('sourceText').value;
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