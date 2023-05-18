var formData = {};

chrome.runtime.onMessage.addListener(function (request) {
  console.log(request);
  formData = request;
});

console.log("asodasd");

window.addEventListener("load", function () {
  setTimeout(() => {
    const newWf = document.getElementById("cq-gen91");
    newWf.click();
    const titleInput = document.getElementById("ext-comp-1079");
    const nameInput = document.getElementById("ext-comp-1080");

    setTimeout(() => {
      const wfType = document.getElementById("ext-comp-1076");
      console.log(newWf, titleInput);
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
      const createWF = document.getElementById("#cq-gen255");
      //   createWF.click();
      console.log(wfType.children[2]);
    }, 1000);
  }, 5000);
});
