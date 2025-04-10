const sendInfo = {
  "name" : "Bradley",
  "countries" : [
    {
    "name" : "Mexico",
    "year" : 2020
    },
    {
      "name" : "Canada",
      "year" : 2024
    }
  ]
}

const button = document.getElementById("button");
const results = document.getElementById("result");

button.addEventListener("click", (e) => {

  fetch("api/countries", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(sendInfo)
  })
  .then(response => response.json())
  .then(result => {
    results.textContent = result.message;
  
  
    
  }) 
})



