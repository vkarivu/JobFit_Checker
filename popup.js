document.addEventListener('DOMContentLoaded', () => {
    const wordListTextarea = document.getElementById('wordList');
    const saveButton = document.getElementById('saveWords');
    const editButton = document.getElementById('editWords');
    const removeButton = document.getElementById('removeWords');
    const matchedWordsDiv = document.getElementById('matchedWords');
    const unmatchedWordsDiv = document.getElementById('unmatchedWords');

    // Load the saved word list and matched/unmatched words on popup open
    chrome.storage.local.get(['wordsToMatch', 'matchedWords', 'unmatchedWords'], (result) => {
        if (result.wordsToMatch && result.wordsToMatch.length > 0) {
            wordListTextarea.value = result.wordsToMatch.join(', ');
            wordListTextarea.disabled = true;
            editButton.style.display = 'inline-block';
            removeButton.style.display = 'inline-block';
            saveButton.style.display = 'none';

            // Display matched and unmatched words
            matchedWordsDiv.innerText = `Matched Words: ${result.matchedWords.join(', ')}`;
            unmatchedWordsDiv.innerText = `Unmatched Words: ${result.unmatchedWords.join(', ')}`;
        } else {
            wordListTextarea.value = '';
            wordListTextarea.disabled = false;
            saveButton.style.display = 'inline-block';
            editButton.style.display = 'none';
            removeButton.style.display = 'none';
            matchedWordsDiv.innerText = 'Matched Words: None';
            unmatchedWordsDiv.innerText = 'Unmatched Words: None';
        }
    });

    // Save the word list when the user clicks the save button
    saveButton.addEventListener('click', () => {
        const words = wordListTextarea.value.split(',').map(word => word.trim());
        chrome.storage.local.set({ wordsToMatch: words }, () => {
            wordListTextarea.disabled = true;
            editButton.style.display = 'inline-block';
            removeButton.style.display = 'inline-block';
            saveButton.style.display = 'none';

            // Reset matched and unmatched words after saving new list
            matchedWordsDiv.innerText = 'Matched Words: None';
            unmatchedWordsDiv.innerText = 'Unmatched Words: None';
        });
    });

    // Enable editing when the user clicks the edit button
    editButton.addEventListener('click', () => {
        wordListTextarea.disabled = false;
        wordListTextarea.focus();
        saveButton.style.display = 'inline-block';
        editButton.style.display = 'none';
        removeButton.style.display = 'inline-block';
    });

    // Remove all words when the user clicks the remove button
    removeButton.addEventListener('click', () => {
        chrome.storage.local.remove('wordsToMatch', () => {
            wordListTextarea.value = '';
            wordListTextarea.disabled = false;
            matchedWordsDiv.innerText = 'Matched Words: None';
            unmatchedWordsDiv.innerText = 'Unmatched Words: None';
            saveButton.style.display = 'inline-block';
            editButton.style.display = 'none';
            removeButton.style.display = 'none';
        });
    });
});
