if (!location.href.includes("chrome://")) {
    // Retrieve the stored word list from chrome.storage.local
    chrome.storage.local.get(['wordsToMatch'], (result) => {
        const wordsToMatch = result.wordsToMatch || []; // Use the stored words or an empty array if none are found

        // If there are no words to match, exit the script
        if (wordsToMatch.length === 0) {
            chrome.runtime.sendMessage({ action: "updateBadge", count: "0%" });
            return;
        }

        // Function to normalize text by removing spaces, special characters, and converting to lowercase
        const normalizeText = (text) => {
            return text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        };

        // Normalize each word in the wordsToMatch array
        const normalizedWords = wordsToMatch.map(word => normalizeText(word));

        // Temporarily remove the floating UI if it exists
        let floatingContainer = document.getElementById('floatingMatchedUnmatched');
        if (floatingContainer) {
            floatingContainer.remove();
        }


     

        let normalizedBodyText = "";
if (location.href.includes("linkedin.com")) {
    normalizedBodyText = normalizeText(document.querySelector("[class*='jobs-search__job-details']").innerText);
} else if (location.href.includes("monster.com")) {
    normalizedBodyText = normalizeText(document.querySelector("[class*=splitview][class*='style__JobContainer']").innerText);
} else if (location.href.includes("indeed.com")) {
    normalizedBodyText = normalizeText(document.querySelector("#job-full-details").innerText);
} else {
    normalizedBodyText = normalizeText(document.body.innerText || document.body.textContent);
}


        // Initialize arrays for matched and unmatched words
        let matchedWords = [];
        let unmatchedWords = [];

        // Check if each word from the list is present in the body text
        normalizedWords.forEach((word, index) => {
            if (normalizedBodyText.includes(word)) {
                matchedWords.push(wordsToMatch[index]); // Use the original word
            } else {
                unmatchedWords.push(wordsToMatch[index]); // Use the original word
            }
        });

        // If no words matched, set percentage to 0
        if (matchedWords.length === 0) {
            chrome.runtime.sendMessage({ action: "updateBadge", count: "0%" });
            return;
        }

        // Calculate the percentage of words found
        let percentage = (matchedWords.length / normalizedWords.length) * 100;

        // Round the percentage to the nearest whole number
        percentage = Math.round(percentage);

        // Send the percentage to the background script to update the badge
        chrome.runtime.sendMessage({ action: "updateBadge", count: percentage.toString() + "%" });

        // Store matched and unmatched words for the popup
        chrome.storage.local.set({ matchedWords, unmatchedWords });

        // Check if the floating container already exists (it was removed earlier, so re-create it)
        if (!floatingContainer) {
            // Create floating UI container if it doesn't exist
            floatingContainer = document.createElement('div');
            floatingContainer.id = 'floatingMatchedUnmatched';
            floatingContainer.style.position = 'fixed';
            floatingContainer.style.top = '10px';
            floatingContainer.style.right = '10px';
            floatingContainer.style.backgroundColor = 'white';
            floatingContainer.style.border = '2px solid #ccc';
            floatingContainer.style.borderRadius = '8px';
            floatingContainer.style.padding = '10px';
            floatingContainer.style.zIndex = '9999';
            floatingContainer.style.width = '250px';
            floatingContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
            floatingContainer.style.cursor = 'move';
            floatingContainer.style.userSelect = 'none'; // Prevent text selection

            // Improved Dragging Logic
            let offsetX, offsetY;
            let isDragging = false;

            floatingContainer.onmousedown = function(event) {
                isDragging = true;
                offsetX = event.clientX - floatingContainer.getBoundingClientRect().left;
                offsetY = event.clientY - floatingContainer.getBoundingClientRect().top;
                document.addEventListener('mousemove', onMouseMove);
                floatingContainer.style.cursor = 'grabbing';
            };

            document.onmouseup = function() {
                if (isDragging) {
                    isDragging = false;
                    document.removeEventListener('mousemove', onMouseMove);
                    floatingContainer.style.cursor = 'move';
                }
            };

            function onMouseMove(event) {
                if (isDragging) {
                    floatingContainer.style.left = `${event.clientX - offsetX}px`;
                    floatingContainer.style.top = `${event.clientY - offsetY}px`;
                }
            }

            floatingContainer.ondragstart = function() {
                return false;
            };
        }

        // Update the content of the floating container
        floatingContainer.innerHTML = `
            <div style="background-color: #28a745; color: white; border-radius: 5px; padding: 8px; text-align: center; margin-bottom: 8px;">
                Matched Words: ${matchedWords.join(', ')}
            </div>
            <div style="background-color: #dc3545; color: white; border-radius: 5px; padding: 8px; text-align: center;">
                Unmatched Words: ${unmatchedWords.join(', ')}
            </div>
        `;

        // Re-append the floating container to the body
        document.body.appendChild(floatingContainer);

        // Debugging information
        console.log("Matched Words:", matchedWords);
        console.log("Unmatched Words:", unmatchedWords);
        console.log("Normalized Words:", normalizedWords);
        console.log("Normalized Body Text:", normalizedBodyText);
        console.log("Percentage:", percentage);
    });
}
