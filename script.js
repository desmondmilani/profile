//fucntion to hide the paragraph
let paraOn = false;
const toddleParagraph = () => {
    if (paraOn) {
        document.querySelector("#para").style.display = "none";
        document.querySelector("#btnP").innerHTML = "Read more";
        paraOn = false;
    } else {
        document.querySelector("#para").style.display = "block";
        document.querySelector("#btnP").innerHTML = "Read less";
        paraOn = true;
    }
}