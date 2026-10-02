const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


                //Shows CountryList in Console//

// for (code in countryList) {
//     console.log(code, countryList[code])
// }




for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "PKR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    })   
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode]; 
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    } 

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

let response = await fetch(URL);

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

let data = await response.json();

let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

console.log("Exchange Rate:", rate);

let finalAmount = amtVal * rate;
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `
}

btn.addEventListener("click", (e)=>{
    e.preventDefault(); 
    updateExchangeRate()
})

window.addEventListener("load", ()=>{
    updateExchangeRate();
})