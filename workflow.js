function waitForElementToDisplay(
  selector,
  callback,
  checkFrequencyInMs,
  timeoutInMs
) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    if (document.querySelector(selector) != null) {
      callback();
      return;
    } else {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}
var formData = {};

chrome.runtime.onMessage.addListener(function (request) {
  formData = request;
});

window.addEventListener("load", function () {
  waitForElementToDisplay(
    ".cq-siteadmin-create-page-icon",
    function () {
      var nb = document.querySelector(".cq-siteadmin-create-page-icon");
      nb.click();
      setTimeout(() => {
        document.querySelector(".x-menu-list").firstChild.click();
        setTimeout(() => {
          const titleInput = document.getElementById("ext-comp-1079");
          const nameInput = document.getElementById("ext-comp-1080");
          const wfType = document.getElementById("ext-comp-1076");

          titleInput.value = formData.title;
          nameInput.value = formData.esm;
          if (formData.type == "deletion") {
            wfType.children[0].click();
          } else if (formData.type == "rename") {
            wfType.children[1].click();
          } else if (formData.type == "promotion") {
            wfType.children[2].click();
          } else if (formData.type == "assets") {
            wfType.children[2].click();
          }
          var aTags = document.getElementsByTagName("button");
          var searchText = "Create";
          var found;

          for (var i = 0; i < aTags.length; i++) {
            if (aTags[i].textContent == searchText) {
              found = aTags[i];
              break;
            }
          }

          found.click();
          chrome.storage.sync.get(["likesColor"]).then((result) => {
            if (result.likesColor) {
              setTimeout(() => {
                window.location.assign(
                  "https://wwwperf.brandeuauthorlb.ford.com/cf#/etc/workflow/packages/ESM/" +
                    formData.url +
                    "/" +
                    formData.esm +
                    ".html"
                );
              }, 2000);
            }
          });
        }, 1000);
      }, 2000);
    },
    1000,
    9000
  );
});

// setTimeout(() => {
//   var bTags = document.getElementsByTagName("button");
//   var searchText2 = "New...";
//   var found2;

//   for (var i = 0; i < bTags.length; i++) {
//     if (bTags[i].textContent == searchText2) {
//       found2 = bTags[i];
//       break;
//     }
//   }
//   console.log(found2);
//   found2.click();
