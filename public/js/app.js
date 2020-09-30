console.log("client side js is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  messageTwo.textContent = ` `;
  messageOne.textContent = "Loading";
  e.preventDefault();
  const location = search.value;

  if (location.trim().length <= 0) {
    alert("please actually enter an address mate");
    return;
  }

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data, error) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = `Your Location: ${data.location}`;
          messageTwo.textContent = `Weather: ${data.forecast}`;
        }
      });
    }
  );
});
