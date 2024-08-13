// // textAnalysis.js

// function normalizeText(text) {
//     return text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
// }

// function analyzeTextAndSendMessage() {
//     // Retrieve the stored word list from chrome.storage.local
//     chrome.storage.local.get(['wordsToMatch'], (result) => {
//         const wordsToMatch = result.wordsToMatch || [];

//         // If there are no words to match, exit the script
//         if (wordsToMatch.length === 0) {
//             chrome.runtime.sendMessage({ action: "updateBadge", count: "0%" });
//             return;
//         }

//         const normalizedWords = wordsToMatch.map(word => normalizeText(word));

//         // Temporarily hide the floating UI if it exists
//         let floatingContainer = document.getElementById('floatingMatchedUnmatched');
//         if (floatingContainer) floatingContainer.style.display = 'none';

//         // Normalize the body text
//         let bodyText = document.body.innerText || document.body.textContent;
//         let normalizedBodyText = normalizeText(bodyText);

//         // Initialize arrays for matched and unmatched words
//         let matchedWords = [];
//         let unmatchedWords = [];

//         normalizedWords.forEach((word, index) => {
//             if (normalizedBodyText.includes(word)) {
//                 matchedWords.push(wordsToMatch[index]);
//             } else {
//                 unmatchedWords.push(wordsToMatch[index]);
//             }
//         });

//         // If no words matched, set percentage to 0
//         let percentage = matchedWords.length === 0 ? 0 : Math.round((matchedWords.length / normalizedWords.length) * 100);

//         // Send the percentage to the background script to update the badge
//         chrome.runtime.sendMessage({ action: "updateBadge", count: percentage.toString() + "%" });

//         // Store matched and unmatched words for the popup
//         chrome.storage.local.set({ matchedWords, unmatchedWords });

//         // Show the floating UI again after analysis
//         if (floatingContainer) floatingContainer.style.display = 'block';

//         // Return the matched and unmatched words
//         return { matchedWords, unmatchedWords };
//     });
// }


// // textAnalysis.js

// export function normalizeText(text) {
// 	debugger;
//     return text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
// }

// export function analyzeText() {
// 	debugger;
//     return new Promise((resolve) => {
//         // Retrieve the stored word list from chrome.storage.local
//         chrome.storage.local.get(['wordsToMatch'], (result) => {
//             const wordsToMatch = result.wordsToMatch || [];

//             // If there are no words to match, exit the script
//             if (wordsToMatch.length === 0) {
//                 chrome.runtime.sendMessage({ action: "updateBadge", count: "0%" });
//                 resolve({ matchedWords: [], unmatchedWords: [] });
//                 return;
//             }

//             const normalizedWords = wordsToMatch.map(word => normalizeText(word));

//             // Temporarily hide the floating UI if it exists
//             let floatingContainer = document.getElementById('floatingMatchedUnmatched');
//             if (floatingContainer) floatingContainer.style.display = 'none';

//             // Normalize the body text
//             let bodyText = document.body.innerText || document.body.textContent;
//             let normalizedBodyText = normalizeText(bodyText);

//             // Initialize arrays for matched and unmatched words
//             let matchedWords = [];
//             let unmatchedWords = [];

//             normalizedWords.forEach((word, index) => {
//                 if (normalizedBodyText.includes(word)) {
//                     matchedWords.push(wordsToMatch[index]);
//                 } else {
//                     unmatchedWords.push(wordsToMatch[index]);
//                 }
//             });

//             // If no words matched, set percentage to 0
//             let percentage = matchedWords.length === 0 ? 0 : Math.round((matchedWords.length / normalizedWords.length) * 100);

//             // Send the percentage to the background script to update the badge
//             chrome.runtime.sendMessage({ action: "updateBadge", count: percentage.toString() + "%" });

//             // Store matched and unmatched words for the popup
//             chrome.storage.local.set({ matchedWords, unmatchedWords });

//             // Show the floating UI again after analysis
//             if (floatingContainer) floatingContainer.style.display = 'block';

//             // Resolve with the matched and unmatched words
//             resolve({ matchedWords, unmatchedWords });
//         });
//     });
// }
