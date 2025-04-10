// Character list. Each house has a name and a code
const locations = [
  {
    code: "LA",
    name: "Los Angeles"
  },
  {
    code: "OC",
    name: "Orange Country"
  },
  {
    code: "RS",
    name: "Riverside"
  },
  {
    code: "SD",
    name: "San Diego"
  }
];

const locationArray = locations.filter(x => {
  const locationElement = document.createElement("option");

  locationElement.value = x.code;
  locationElement.textContent = x.name;
  document.getElementById("location").appendChild(locationElement);
});

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();

  const formData = new FormData(e.target);

  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }

  fetch("/ex1", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    document.getElementById("result").textContent = result;
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });
});
