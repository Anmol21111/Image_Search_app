const accessKey = "CAeb09Y6S_9OgrdvbuxIY2VPE-73MR6fb45TBD6y_Hk";

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const SearchResult = document.querySelector(".search-results");
const ShowMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImage() {
  inputData = inputE1.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url)
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    SearchResult.innerHTML = "";
  }

  results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      SearchResult.appendChild(imageWrapper)
  });
  
  page++;
  if(page >  1){
    ShowMoreButton.style.display = "block";
  }
}

formE1.addEventListener("submit",(event) => {
    event.preventDefault();
    page = 1;
    searchImage();
})

ShowMoreButton.addEventListener("click", () => {
    searchImage();
})