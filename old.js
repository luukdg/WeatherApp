const inputGif = document.getElementById("search-gif");

function inputKeyword() {
  return inputGif.value;
}

const button = document.getElementById("generate-gif");
const img = document.querySelector("img");
img.style.display = "none";

button.addEventListener("click", () => {
  const searchKeyword = inputKeyword();
  getGif(searchKeyword);
});

async function getGif(searchKeyword) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=CPOYt6kOnprJThCeUgjF7pBO5PnnWCMV&s=${searchKeyword}`
    );
    const gifData = await response.json();
    img.style.display = "block";
    img.src = gifData.data.images.original.url;
  } catch (error) {
    console.log(error);
  }
}
