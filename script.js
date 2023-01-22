const ulEL = document.getElementById("ulEL");
let text = document.getElementById("text");
let btnSave = document.getElementById("btnSave");
let btnCurrent = document.getElementById("btnCurrent");
let btnClear = document.getElementById("btnClear");
let arr = [];
function print() {
  let items = "";
  for (let i = 0; i < arr.length; i++) {
    items += `<li>
        <a target = '_blank' href =${arr[i]}> 
              ${arr[i]}
         </a>
     </li>`;
  }
  ulEL.innerHTML = items;
}
let PreviousLinks = JSON.parse(localStorage.getItem("links"));

if (PreviousLinks) {
  arr = PreviousLinks;
  print();
}
btnSave.onclick = () => {
  let x = text.value;
  if (text.value != "") {
    arr.push(x);
    localStorage.setItem("links", JSON.stringify(arr));
    print();
  }
  text.value = "";
};

btnClear.onclick = () => {
  localStorage.clear();
  arr = [];
  ulEL.innerHTML = "";
};
btnCurrent.addEventListener("click", function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    arr.push(tabs[0].url);
    localStorage.setItem("links", JSON.stringify(arr));
    print();
  });
});
