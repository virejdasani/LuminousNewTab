// For custom search engines
const engines = [
  {
    name: "Google",
    url: "https://google.com/",
    search: "https://google.com/search?q=",
    icon: "../assets/img/googleLogo.png",
    id: "google",
  },
  {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/",
    search: "https://duckduckgo.com/?q=",
    icon: "../assets/img/ddgLogo.png",
    id: "ddg",
  },
];

// Set search engine
function updateSearch() {
  var currentEngine = engines.find((element) => element.name == engine);
  document.getElementById(
    "searchBox"
  ).style.backgroundImage = `url("${currentEngine.icon}")`;
  document.getElementById("searchBox").textContent =
    "Search " + currentEngine.name;
  document.getElementById("searchButton").textContent =
    currentEngine.name + " Search";
  document.getElementById("openSearch").textContent =
    "Open " + currentEngine.name;
  document.getElementById("currentEngineName").textContent =
    "Current Search Engine: " + currentEngine.name;
}

var engine;

if (typeof browser === "undefined") {
  // we're running on chrome
  chrome.storage.local.get("searchEngine", function (res) {
    engine = res.searchEngine || "Google"; // google is the default
    updateSearch();
  });
} else {
  // we're running on firefox
  browser.storage.local.get("searchEngine").then((res) => {
    engine = res.searchEngine || "Google"; // google is the default
    updateSearch();
  });
}

document.getElementById("settings_changesearch").onclick = function () {
  if (!engine) return;

  var newEngine = engines.findIndex((element) => element.name == engine) + 1;
  if (newEngine > engines.length - 1) newEngine = 0; // wrap around to the first engine
  engine = engines[newEngine].name;

  if (typeof browser === "undefined") {
    // we're running on chrome
    chrome.storage.local.set({ searchEngine: engine }, function () {
      updateSearch();
    });
  } else {
    // we're running on firefox
    browser.storage.local.set({ searchEngine: engine }).then(updateSearch());
  }
};

// For search operation
let searchButton = document.getElementById("searchButton");
let searchBox = document.getElementById("searchBox");

// When search button is clicked
searchButton.addEventListener("click", function (event) {
  // Don't reload the page
  // Without this, window.location.replace is not working
  event.preventDefault();

  // Search
  var currentEngine = engines.find((element) => element.name == engine);

  window.location.replace(currentEngine.search + searchBox.value);
});

// To open search engine
let openSearchButton = document.getElementById("openSearch");
openSearchButton.addEventListener("click", function (event) {
  // Don't reload the page
  // Without this, window.location.replace is not working
  event.preventDefault();

  var currentEngine = engines.find((element) => element.name == engine);
  window.location.replace(currentEngine.url);
});

// To toggle bookmarks
var toggleBookmarksButton = document.getElementById("toggleBookmarks");
var displayBookmarks;

// By default, bookmarks are shown
if (typeof browser === "undefined") {
  // we're running on chrome
  chrome.storage.local.get("showBookmarks", function (res) {
    if (res.showBookmarks == false) {
      displayBookmarks = false;
    } else {
      displayBookmarks = true;
    }
    toggleBookmarksButton.checked = displayBookmarks;
    updateBookmarkPrefs();
  });
} else {
  // we're running on firefox
  browser.storage.local.get("showBookmarks").then((res) => {
    displayBookmarks = res.showBookmarks || true; // bookmarks are shown by default
    toggleBookmarksButton.checked = res.showBookmarks || true;
    updateBookmarkPrefs();
  });
}

document.getElementById("toggleBookmarks").addEventListener("click", () => {
  // console.log("clicked");

  if (displayBookmarks == true) {
    // console.log("hiding bookmarks");

    if (typeof browser === "undefined") {
      // we're running on chrome
      chrome.storage.local.set({ showBookmarks: false }, function () {
        toggleBookmarksButton.checked = false;
        displayBookmarks = false;
        updateBookmarkPrefs();
      });
    } else {
      // we're running on firefox
      browser.storage.local.set({ showBookmarks: false });
      toggleBookmarksButton.checked = false;
      displayBookmarks = false;
      updateBookmarkPrefs();
    }
  } else {
    // console.log("showing bookmarks");

    if (typeof browser === "undefined") {
      // we're running on chrome
      chrome.storage.local.set({ showBookmarks: true }, function () {
        toggleBookmarksButton.checked = true;
        displayBookmarks = true;
        updateBookmarkPrefs();
      });
    } else {
      // we're running on firefox
      browser.storage.local.set({ showBookmarks: true });
      toggleBookmarksButton.checked = true;
      displayBookmarks = true;
      updateBookmarkPrefs();
    }
  }
});

// This is to show or hide the bookmarks based on user prefs
function updateBookmarkPrefs() {
  if (displayBookmarks) {
    document.getElementById("bookmarks").style.display = "block";
    document.getElementById("greeting").style.marginTop = "155px";
  } else {
    document.getElementById("bookmarks").style.display = "none";
    document.getElementById("greeting").style.marginTop = "15rem";
  }
}

// // For bookmark number

// function updateBookmarkNumber() {
//   console.log(numBookmarksToShow);
// }

// var bookmarkLimit;
// var numBookmarksToShow;

// if (typeof browser === "undefined") {
//   // we're running on chrome
//   chrome.storage.local.get("bookmarkLimit", function (res) {
//     numBookmarksToShow = res.bookmarkLimit || 12;
//   });
// } else {
//   // we're running on firefox
//   browser.storage.local.get("bookmarkLimit").then((res) => {
//     numBookmarksToShow = res.bookmarkLimit || 12;
//   });
// }

// document.getElementById("submitBookmarkNumber").onclick = function (e) {
//   e.preventDefault();

//   numBookmarksToShow = document.getElementById("bookmarksNumberInput").value;

//   if (typeof browser === "undefined") {
//     // we're running on chrome
//     chrome.storage.local.set(
//       { bookmarkLimit: numBookmarksToShow },
//       function () {
//         updateBookmarkNumber();
//       }
//     );
//   } else {
//     // we're running on firefox
//     browser.storage.local
//       .set({ bookmarkLimit: numBookmarksToShow })
//       .then(updateBookmarkNumber());
//   }
// };
