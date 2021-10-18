var theForm = document.getElementById('addBookmarkForm');
var bookmarksOutput = document.getElementById('bookmarksOutput');
var deleteBtn = document.getElementById('deleteBtn');

// fetch bookmarks as soon as page loads
// {<body onload="fetchBookmarks()"> didn't work
// 'onload()' & 'onclick()' don't work on chrome extensions}
window.onload = function () {
    fetchBookmarks();

    // can only add event listener once the delete btn loads
    var deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', function () {
        deleteBookmark(deleteBtn.name);
    });
}

// whenever user submits new bookmark, save it..
theForm.addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    console.log("saving bookmark ...")

    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    var bookmark = {
        name: siteName,
        URL: siteURL
    }

    if (localStorage.getItem("LuminousBookmarks") === null) {
        // create array for bookmarks
        var bookmarks = [];
        bookmarks.push(bookmark);
    } else {
        // get bookmarks array from local storage
        var bookmarks = JSON.parse(localStorage.getItem("LuminousBookmarks"));
        bookmarks.push(bookmark);
    }

    // set new bookmarks in Local Storage
    localStorage.setItem("LuminousBookmarks", JSON.stringify(bookmarks));

    // clear form inputs after setting new bookmark
    theForm.reset();

    // display updated bookmarks 
    // fetchBookmarks();

    // since reloading document is anyways followed by fetching bookmarks 
    location.reload();

    console.log("Bookmark Saved");

    e.preventDefault();
}

function deleteBookmark(url) {
    console.log("deleting bookmark " + url)

    // get all bookmarks from Local Storage
    var bookmarks = JSON.parse(localStorage.getItem("LuminousBookmarks"));

    // Update Bookmarks array
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].URL = url) {
            // remove
            bookmarks.splice(i, 1);
        }
    }

    // reset updated array in Local Storage
    localStorage.setItem("LuminousBookmarks", JSON.stringify(bookmarks));

    // load updated bookmarks back on home page
    location.reload();
}

function fetchBookmarks() {
    console.log("fetching bookmarks...")

    // get all bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("LuminousBookmarks"));

    // clear previously entered bookmarks (if any)
    bookmarksOutput.innerHTML = '';

    // insert <a> tags for new bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var URL = bookmarks[i].URL;

        bookmarksOutput.innerHTML += '<span>' +
            '<a href="' + URL + '" class="bookmarkBtn" target="_blank" >' + name + '</a>' +
            '<a name="' + URL + '" class="deleteBtn" id="deleteBtn">&times;</a>' +
            '</span>';
    }
}