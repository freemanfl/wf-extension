chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

var url =
  "https://wwwperf.brandeuauthorlb.ford.com/miscadmin#/etc/workflow/packages/ESM/";
// Get Ticket data
// Fill the form with data
// Open a new tab on "Create" press
// Enter url based on data
// Click needed buttons
// Fill the form based on data
// Press create button
// Open created wf in a new tab

chrome.runtime.onMessage.addListener(function (request) {
  console.log(request);

  chrome.tabs.create({ url: url + request.url, active: true }, function (tab) {
    // Why do you query, when tab is already given?
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ["workflow.js"],
      })
      .then(() => {
        chrome.tabs.sendMessage(tab.id, request);
      });
  });
});
