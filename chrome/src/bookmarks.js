
var bookmark = {}

var counterID = 0

window.onload = () => {
    document.getElementById("addBookmarkButton").addEventListener('click', function (e) {
        // Don't reload on add button click
        e.preventDefault()

        counterID += 1 

        // Add these objects to bookmark array
        bookmark['url'] = document.getElementById("bookmarkURL").value
        bookmark['name'] = document.getElementById("bookmarkNameField").value
        bookmark['id'] = counterID

        console.log(bookmark)
        console.log(bookmark.id)

        // TODO - Add data to chrome.storage
        // Learn about it here - https://www.youtube.com/watch?v=fDERPeXGzPY
        // Also here - https://developer.chrome.com/docs/extensions/reference/storage/
    })
}

//  Completely clear the storage. All items are removed.
// chrome.storage.local.clear(() => {
//     console.log('Everything was removed');
// });

// // Remove items under a certain key
// const key = 'myKey';
// chrome.storage.local.remove([key], (result) => {
//     console.log('Removed items for the key: ' + key);
// });