console.log("Client side javascript file is loaded!");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
message2.textContent = "";

weatherform.addEventListener("submit", (e) => {
  message1.textContent = "Loading result";
  message2.textContent = "";
  e.preventDefault();
  fetch(`/weather?address=${search.value}`).then((res) => {
    res.json().then((data) => {
      message1.textContent = "";
      message2.textContent = "";
      if (data.error) {
        message2.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecastData;
      }
    });
  });
  console.log("testing");
});
