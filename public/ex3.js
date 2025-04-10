document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const articleData = {};

  formData.forEach((value, key) => {
    articleData[key] = value;
  });

  fetch("/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"  // Specify that we're sending JSON
    },
    body: JSON.stringify(articleData)  // Send the form data as JSON
  })
  .then(response => response.json())  // Assuming the server responds with JSON
  .then(result => {
    document.getElementById("result").textContent = result.message;  // Display the response message
  })
  .catch(error => console.error('Error:', error));
});