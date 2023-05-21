const markets = [
  "Ford of Austria",
  "Ford of Belgium",
  "Ford of Britain",
  "Ford of Czech Republic",
  "Ford of Denmark",
  "Ford of Finland",
  "Ford of France",
  "Ford of Germany",
  "Ford of Greece",
  "Ford of Hungary",
  "Ford of Ireland",
  "Ford of Italy",
  "Ford of Luxembourg",
  "Ford of Netherladns",
  "Ford of Norway",
  "Ford of Poland",
  "Ford of Portugal",
  "Ford of Romania",
  "Ford of Spain",
  "Ford of Sweden",
  "Ford of Switzerland",
];

var wf = {
  title: "",
  esm: "",
  market: "",
  url: "",
  type: "",
  plusAssets: false,
  plusDeletion: false,
};

var footer = document.getElementsByClassName("aui-sidebar-footer")[0];
var sidebar = document.getElementsByClassName("aui-sidebar-wrapper")[0];

var container = document.createElement("div");
container.id = "container";
container.innerHTML = `
<div id="container">
    <form id="wfForm">
            
            <input type="text" id="titleInput" class="uc1" />
   
            <input type="text" id="nameInput" class="uc1" />
         
            <div id="radioContainer" class="uc1">
             
              <label for="promotion">Promotion
              <input type="radio" id="promotion" name="wf-type" checked />
              </label>
             
              <label for="deletion">Deletion
              <input type="radio" id="deletion" name="wf-type" />
              </label>
              
              <label for="assets">Assets
              <input type="radio" id="assets" name="wf-type" />
              </label>
              
              <label for="rename">Rename
              <input type="radio" id="rename" name="wf-type" />
              </label>
            </div>
       
            <div>
              <select id="marketInput" class="uc1">
                <option value="-1">None</option>
                <option data-url="ATDE" value="austria">Ford of Austria</option>
                <option data-url="BE" value="belgium">Ford of Belgium</option>
                <option data-url="ENGB" value="britain">Ford of Britain</option>
                <option data-url="CSCZ" value="czech">Ford of Czech Republic</option>
                <option data-url="DA_DK" value="denmark">Ford of Denmark</option>
                <option data-url="" value="edm">Ford EDM</option>
                <option data-url="" value="europe">Ford of Europe</option>
                <option data-url="FIFI" value="finland">Ford of Finland</option>
                <option data-url="FRFR" value="france">Ford of France</option>
                <option data-url="DEDE" value="germany">Ford of Germany</option>
                <option data-url="ELGR" value="greece">Ford of Greece</option>
                <option data-url="HUHU" value="hungary">Ford of Hungary</option>
                <option data-url="IEIE" value="ireland">Ford of Ireland</option>
                <option data-url="ITIT" value="italy">Ford of Italy</option>
                <option data-url="LULU" value="luxembourn">Ford of Luxembourg</option>
                <option data-url="NLNL" value="netherlands">Ford of Netherlands</option>
                <option data-url="NONO" value="norway">Ford of Norway</option>
                <option data-url="PLPL" value="poland">Ford of Poland</option>
                <option data-url="PTPT" value="portugal">Ford of Portugal</option>
                <option data-url="RORO" value="romania">Ford of Romania</option>
                <option data-url="" value="russia">Ford of Russia</option>
                <option data-url="ESES" value="spain">Ford of Spain</option>
                <option data-url="" value="sweden">Ford of Sweden</option>
                <option data-url="CH" value="switzerland">Ford of Switzerland</option>
                <option data-url="" value="turkey">Ford of Turkey</option>
                <option data-url="" value="gtb">GTB</option>
                <option data-url="" value="fme">FME</option>
                <option data-url="" value="fmcsa">FMCSA</option>
                <option data-url="" value="apa">Asia Pacific - APA</option>
                <option data-url="" value="internal">Internal</option>
                <option data-url="" value="fcsd">FCSD Smart Media</option>
              </select>
              <select id="marketInputCh" class="uc1">
              <option data-url="CHDE" value="chde">German</option>
              <option data-url="CHFR" value="chfr">French</option>
              <option data-url="CHIT" value="chit">Italian</option>
              </select>
              <select id="marketInputBe" class="uc1">
              <option data-url="BENL">Flemish (NL)</option>
              <option data-url="BEFR">French</option>
              </select>
            </div>
            <h3 style="display: none;">Additional stuff</h3>
            <div style="display: none;">
              <input type="checkbox" id="+del" name="+del" />
              <label for="+del">+ Deletion</label>
              <input type="checkbox" id="+ass" name="+ass" />
              <label for="+ass">+ Assets</label>
            </div>
            <input id='submitButton' type="submit" value="Create Workflow" style="padding: 10px">
</form>
</div>
`;
sidebar.insertBefore(container, footer);
///////////////////////////////////////////////////////////////////

// Now we set default states

// grab market inputs
var dropdown = document.getElementById("marketInput");
var dropdownCh = document.getElementById("marketInputCh");
var dropdownBe = document.getElementById("marketInputBe");

// Set title
document.getElementById("titleInput").value =
  document.getElementById("summary-val").textContent;

// Set name
document.getElementById("nameInput").value = document
  .getElementsByClassName("aui-nav-breadcrumbs")[0]
  .children[1].children[0].textContent.slice(7, 17);

// Set default market and wf url
for (var i = 0; i < dropdown.length; i++) {
  if (
    document
      .getElementById("customfield_13300-val")
      .innerText.toLowerCase()
      .includes(dropdown[i].value)
  ) {
    dropdown.value = dropdown[i].value;
    wf.url = dropdown[i].dataset.url;
    if (dropdown.value == "switzerland") {
      dropdownCh.style = "display: flex";
      wf.url = "CH/CHDE";
    }
    if (dropdown.value == "belgium") {
      dropdownBe.style = "display: flex";
      wf.url = "BE/BENL";
    }
  }
}

// In case default market is one of special ones, we need to be prepared to display extra options

// listen for switzerland and belg submenu changes
dropdownCh.addEventListener("change", () => {
  if (dropdownCh.options[dropdownCh.selectedIndex].dataset.url == "CHDE") {
    wf.url = "CH/" + dropdownCh.options[dropdownCh.selectedIndex].dataset.url;
  }

  if (dropdownCh.options[dropdownCh.selectedIndex].dataset.url == "CHFR") {
    wf.url = "CH/" + dropdownCh.options[dropdownCh.selectedIndex].dataset.url;
  }

  if (dropdownCh.options[dropdownCh.selectedIndex].dataset.url == "CHIT") {
    wf.url = "CH/" + dropdownCh.options[dropdownCh.selectedIndex].dataset.url;
  }
});

dropdownBe.addEventListener("change", () => {
  if (dropdownBe.options[dropdownBe.selectedIndex].dataset.url == "BEFR") {
    wf.url = "BE/" + dropdownBe.options[dropdownBe.selectedIndex].dataset.url;
  }

  if (dropdownBe.options[dropdownBe.selectedIndex].dataset.url == "BENL") {
    wf.url = "BE/" + dropdownBe.options[dropdownBe.selectedIndex].dataset.url;
  }
});

// Belgium and Switzerland options visibility logic
dropdown.addEventListener("change", () => {
  dropdownCh.style = "display: none";
  dropdownBe.style = "display: none";

  if (dropdown.options[dropdown.selectedIndex].dataset.url == "CH") {
    dropdownCh.style = "display: flex";
    wf.url = "CH/CHDE";
    console.log("1");
    console.log(dropdown.options[dropdown.selectedIndex].dataset.url);
  }

  if (dropdown.options[dropdown.selectedIndex].dataset.url == "BE") {
    dropdownBe.style = "display: flex";
    wf.url = "BE/BENL";
    console.log("2");
    console.log(dropdown.options[dropdown.selectedIndex].dataset.url);
  }
});

// radio text stuff
var radios = document.getElementsByName("wf-type");
radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (document.getElementById("nameInput").value.includes("-deletion")) {
      document.getElementById("nameInput").value = document
        .getElementById("nameInput")
        .value.replace("-deletion", "");
      console.log("del yes");
    }
    if (document.getElementById("nameInput").value.includes("-assets")) {
      document.getElementById("nameInput").value = document
        .getElementById("nameInput")
        .value.replace("-assets", "");
      console.log("del yes");
    }
    if (document.getElementById("nameInput").value.includes("-rename")) {
      document.getElementById("nameInput").value = document
        .getElementById("nameInput")
        .value.replace("-rename", "");
      console.log("del yes");
    }

    if (radio.id == "deletion") {
      document.getElementById("nameInput").value += "-deletion";
    }
    if (radio.id == "assets") {
      document.getElementById("nameInput").value += "-assets";
    }
    if (radio.id == "rename") {
      document.getElementById("nameInput").value += "-rename";
    }

    console.log("rokokos");
  });
});

// checkboxes logic

document.getElementById("+del").addEventListener("change", () => {
  wf.plusDeletion = !wf.plusDeletion;
  console.log(wf.plusDeletion);
});

document.getElementById("+ass").addEventListener("change", () => {
  wf.plusAssets = !wf.plusAssets;
  console.log(wf.plusAssets);
});

function handleSubmit(e) {
  e.preventDefault();
  formData = {
    title: document.getElementById("titleInput").value,
    esm: document.getElementById("nameInput").value,
    market: wf.market,
    url: wf.url,
    type: document.querySelector('input[name="wf-type"]:checked').id,
    deletion: false,
    assets: false,
  };

  console.log(formData);
  console.log("rokoko");

  chrome.runtime.sendMessage(formData);
}
const form = document.getElementById("wfForm");
form.addEventListener("submit", (e) => handleSubmit(e));
