chrome.contextMenus.create({
    id: "trans",
    title: "Translate to Gen Z",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    const selectedText = info.selectionText;
    console.log("Selected text:", selectedText);

    // Store the selected text for access in the popup
    chrome.storage.local.set({ selectedText: selectedText }, () => {
        // Open the popup window
        chrome.windows.create({
            url: chrome.runtime.getURL("popup2.html"),
            type: "popup",
            focused: true,
            width: 400,
            height: 300,
            state: "normal"
        })
        .catch((error) => {
            console.error("Error opening popup:", error);
        });
    });
}); 