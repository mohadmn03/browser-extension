// chrome extension app
let urlInput = document.querySelector(".urlInput");
let saveLinkBtn = document.querySelector(".saveLinkBtn");
let saveTabBtn = document.querySelector(".saveTabBtn");
let deleteAllBtn = document.querySelector(".deleteAllBtn");
let outputCnt = document.querySelector(".outputCnt");
let linksArr = JSON.parse(localStorage.getItem("savedLinks")) || [];
let saveLink = () => {
  let link = urlInput.value;
  if (link !== "") {
    linksArr.push(link);
    displaySavedLinks(linksArr);
    saveLinksToLs();
  } else {
    console.error("no link");
  }
  urlInput.value = "";
};
let saveCurrentTab = (currentTab) => {
  if (currentTab !== "") {
    linksArr.push(currentTab);
    displaySavedLinks(linksArr);
    saveLinksToLs();
  }
};
let displaySavedLinks = (linksArray) => {
  outputCnt.innerHTML = `${linksArray
    .map(
      (link) =>
        `<a href="${link}" target="_blank" class="text-red-200 text-sm">${link}</a>`
    )
    .join("")}`;
};
let deleteAllLinks = () => {
  linksArr = [];
  clearLinksFromLs();
  outputCnt.innerHTML = "";
};
let saveLinksToLs = () => {
  console.log("saved to links array ! --> ", linksArr);
  localStorage.setItem("savedLinks", JSON.stringify(linksArr));
};
let clearLinksFromLs = () => {
  localStorage.removeItem("savedLinks");
};
let saveTab = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      currentTab = tabs[0].url;
      saveCurrentTab(currentTab);
    }
  });
};
saveLinkBtn.addEventListener("click", saveLink);
saveTabBtn.addEventListener("click", saveTab);
deleteAllBtn.addEventListener("click", deleteAllLinks);
displaySavedLinks(linksArr);
// chrome extension app
