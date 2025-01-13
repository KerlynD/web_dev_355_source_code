
const beyoncesPhotos = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Beyonce.jpg/300px-Beyonce.jpg",
    "https://dims.apnews.com/dims4/default/dc0c890/2147483647/strip/true/crop/1151x914+0+0/resize/599x476!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F76%2F9e%2F42f917b72414e8ed9ca33e9531d4%2Fdf17e871e6c14a67ba4e7210129a9d6b",
    "https://hips.hearstapps.com/hmg-prod/images/entertainer-beyonce-performs-on-stage-during-the-mrs-carter-news-photo-1634153930.jpg?crop=0.748xw:1.00xh;0.0962xw,0&resize=640:*",
    "https://i.pinimg.com/736x/d4/48/81/d448810319b97c64a4626538d07ac534.jpg",
]

const toggle = document.querySelector("#toggleButton");
const toggleLabel = document.querySelector("#toggleButtonLabel");

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        document.body.classList.add("dark-mode");
        toggleLabel.innerText = "Dark Mode";
    } else {
        document.body.classList.remove("dark-mode");
        toggleLabel.innerText = "Light Mode"
    }
});

const leftButton = document.querySelector("#leftButton");
const rightButton = document.querySelector("#rightButton");
const beyoncePhoto = document.querySelector("#beyoncePhoto");

let idx = 0;
beyoncePhoto.setAttribute("src", beyoncesPhotos[idx]);

leftButton.addEventListener("click", () => {
    idx = idx === 0 ? (beyoncesPhotos.length-1) : (idx-1);
    beyoncePhoto.setAttribute("src", beyoncesPhotos[idx]);
});

rightButton.addEventListener("click", () => {
    idx = idx === (beyoncesPhotos.length-1) ? 0 : (idx+1);
    beyoncePhoto.setAttribute("src", beyoncesPhotos[idx]);
});


