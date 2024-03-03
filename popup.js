document.addEventListener('DOMContentLoaded', function() {

let translateToGenZ = true; // Default direction

chrome.storage.local.get("selectedText", (data) => {
    const selectedText = data.selectedText;
    if (selectedText) {
        document.getElementById("englishText").value = selectedText;
    }
});

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

});

function translateText(text, toGenZ) {
    // Get json data
    if (toGenZ) {
        // Translate from English to Gen Z
        // Implement the translation
        fetch('./wordtranslation.json')
        .then(response => response.json())
        .then(json => {
            var translationResultText = translateEnglishToGenz(text, json)
            //replace genz textbox with result 
            document.getElementById('genzText').textContent = translationResultText;
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        });
    } else {
        fetch('./wordtranslationreversed.json')
        .then(response => response.json())
        .then(json => {
            // Translate from Gen Z to English
            // Implement the translation
            var translationResultText = translateGenzToEnglish(text, json)
            //replace genz textbox with result 
            document.getElementById('englishText').textContent = translationResultText;
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        });
    }
    
    
}

function translateWebPage() {
    //Redirects user to .com
    window.location.href = '.com';
}

function translateEnglishToGenz(text, json) {
    //
    var newString = text.toLowerCase();
    for (let key in json) {
        if (newString.includes(key)){
            newString = newString.replaceAll(key, json[key])
            console.log(key)
        }   
    }

    return newString
}

function translateGenzToEnglish(text, json) {
    var newString = text.toLowerCase();

    newString = newString.split(' ');
    for (let i = 0; i < newString.length; i++) {
        if (newString[i] in json) {
            currValue = json[newString[i]]
            let max = currValue.length
            let randInt = Math.floor(Math.random() * max)
            let newSubString = currValue[randInt]
            newString[i] = newSubString
        }
    }

    return newString.join(' ')
}
