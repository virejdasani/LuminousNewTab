var maxBookmarks = 12;

const dumpBookmarkers = (subTree) => {
  const ntp = document.getElementById("ntp");
  let bookmarkNum = 0;
  for (const bookmark of subTree[0].children) {
    bookmarkNum++;
    // Check that the bookmark is not a folder and hasn't passed the maxBookmarkNum limit
    if (!bookmark.children && bookmarkNum < maxBookmarks + 1) {
      ntp.appendChild(createItem(bookmark));
    }
    // If it is a bookmark, then remove 1 from bookmarkNum so another bookmark can be appended
    if (bookmark.children) {
      bookmarkNum--;
    }
  }
};

const createIcon = (src, title, size = "24") => {
  const img = new Image();
  img.src = `chrome://favicon/size/${size}@1x/${src}`;
  img.height = size;
  img.width = size;
  img.alt = title;
  img.draggable = false;
  const icon = document.createElement("div");
  icon.appendChild(img);
  icon.className = "icon";
  return icon;
};

const createText = (title) => {
  const text = document.createElement("div");
  text.textContent = title;
  text.className = "text";
  return text;
};

const createItem = (bookmark) => {
  const icon = createIcon(bookmark.url, bookmark.title);
  const text = createText(bookmark.title);
  const item = document.createElement("a");
  item.className = "item";
  item.href = bookmark.url;
  item.dataset.id = bookmark.id;
  item.id = "bookmarkIndex" + bookmark.index;
  item.appendChild(icon);
  item.appendChild(text);
  hoverEvents(item);
  clickEvent(item);
  return item;
};
const hoverEvents = (el) => {
  let showInfo;
  el.addEventListener("mouseenter", (e) => {
    if (!el.parentNode.classList.contains("is-dragging")) {
      e.target.classList.add("hover");
      showInfo = setTimeout(() => e.target.classList.add("showInfo"), 1000);
    }
  });
  el.addEventListener("mouseleave", (e) => {
    clearTimeout(showInfo);
    e.target.classList.remove("hover", "showInfo");
  });
};

const clickEvent = (el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.classList.remove("hover", "showInfo");
    chrome.tabs.update({ url: el.href });
  });
};

const saveOrder = (items) => {
  for (let i = 0, size = items.length; i < size; i++)
    chrome.bookmarks.move(items[i].dataset.id, { index: i });
};

document.addEventListener("DOMContentLoaded", () => {
  chrome.bookmarks.getSubTree("1", dumpBookmarkers);
});

// Thanks to https://github.com/robertoentringer/chrome-ext-ntp-bookmarkers/
