// // floatingUI.js

// function createOrUpdateFloatingUI(matchedWords, unmatchedWords) {
//     // Check if the floating container already exists
//     let floatingContainer = document.getElementById('floatingMatchedUnmatched');

//     if (!floatingContainer) {
//         // Create floating UI container if it doesn't exist
//         floatingContainer = document.createElement('div');
//         floatingContainer.id = 'floatingMatchedUnmatched';
//         floatingContainer.style.position = 'fixed';
//         floatingContainer.style.top = '10px';
//         floatingContainer.style.right = '10px';
//         floatingContainer.style.backgroundColor = 'white';
//         floatingContainer.style.border = '2px solid #ccc';
//         floatingContainer.style.borderRadius = '8px';
//         floatingContainer.style.padding = '10px';
//         floatingContainer.style.zIndex = '9999';
//         floatingContainer.style.width = '250px';
//         floatingContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
//         floatingContainer.style.cursor = 'move';
//         floatingContainer.style.userSelect = 'none'; // Prevent text selection

//         // Append the container to the body
//         document.body.appendChild(floatingContainer);

//         // Improved Dragging Logic
//         let offsetX, offsetY;
//         let isDragging = false;

//         floatingContainer.onmousedown = function(event) {
//             isDragging = true;
//             offsetX = event.clientX - floatingContainer.getBoundingClientRect().left;
//             offsetY = event.clientY - floatingContainer.getBoundingClientRect().top;
//             document.addEventListener('mousemove', onMouseMove);
//             floatingContainer.style.cursor = 'grabbing';
//         };

//         document.onmouseup = function() {
//             if (isDragging) {
//                 isDragging = false;
//                 document.removeEventListener('mousemove', onMouseMove);
//                 floatingContainer.style.cursor = 'move';
//             }
//         };

//         function onMouseMove(event) {
//             if (isDragging) {
//                 floatingContainer.style.left = `${event.clientX - offsetX}px`;
//                 floatingContainer.style.top = `${event.clientY - offsetY}px`;
//             }
//         }

//         floatingContainer.ondragstart = function() {
//             return false;
//         };
//     }

//     // Update the content of the floating container
//     floatingContainer.innerHTML = `
//         <div style="background-color: #28a745; color: white; border-radius: 5px; padding: 8px; text-align: center; margin-bottom: 8px;">
//             Matched Words: ${matchedWords.join(', ')}
//         </div>
//         <div style="background-color: #dc3545; color: white; border-radius: 5px; padding: 8px; text-align: center;">
//             Unmatched Words: ${unmatchedWords.join(', ')}
//         </div>
//     `;
// }

// // Initialize and update the floating UI
// chrome.storage.local.get(['matchedWords', 'unmatchedWords'], (result) => {
//     createOrUpdateFloatingUI(result.matchedWords || [], result.unmatchedWords || []);
// });



// floatingUI.js

export function createOrUpdateFloatingUI(matchedWords, unmatchedWords) {
    // Check if the floating container already exists
    let floatingContainer = document.getElementById('floatingMatchedUnmatched');

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

        // Append the container to the body
        document.body.appendChild(floatingContainer);

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
}
