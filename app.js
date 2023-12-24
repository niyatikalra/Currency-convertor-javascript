const base_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".text");

for (let select of dropdowns) {
  for (let curr in countryList) {
    let option = document.createElement("option");
    option.innerText = curr;
    option.value = curr;
    if (select.name === "from" && curr === "USD") {
      option.selected = "true";
    } else if (select.name === "to" && curr === "INR") {
      option.selected = "true";
    }
    select.append(option);

    select.addEventListener("change", (e) => {
      changeImage(e.target);
    });
  }
}

function changeImage(element) {
  let curr = element.value;
  let countryCode = countryList[curr];
  let newurl = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newurl;
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input[type=text]");
  let amountValue = amount.value;
    if(amountValue==" " || amountValue<1){
     amountValue=1;
  amount.value=1;
    }

  const URL = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  // console.log(response);
  let data = await response.json();
  // console.log(data);
  let convertedVal = data[toCurr.value.toLowerCase()];
  // console.log(convertedVal);
  let finalAmount = amountValue * convertedVal;
  console.log(finalAmount);
  msg.innerText = ` ${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
