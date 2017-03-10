var products = [];
var results = [];
var answered = 0;

// constructor function
function Product(name, fileName) {
  this.name = name;
  this.fileName = fileName;
  this.votes = 0;
}

// create product objects
products.push(new Product("Bag", "bag.jpg"));
products.push(new Product("Banana", "banana.jpg"));
products.push(new Product("Boots", "boots.jpg"));
products.push(new Product("Chair", "chair.jpg"));
products.push(new Product("Cthulhu", "cthulhu.jpg"));
products.push(new Product("Dragon", "dragon.jpg"));
products.push(new Product("Pen", "pen.jpg"));
products.push(new Product("Scissors", "scissors.jpg"));
products.push(new Product("Shark", "shark.jpg"));
products.push(new Product("Sweep", "sweep.jpg"));
products.push(new Product("Unicorn", "unicorn.jpg"));
products.push(new Product("USB", "usb.jpg"));
products.push(new Product("Water Can", "water_can.jpg"));
products.push(new Product("Wine Glass", "wine_glass.jpg"));

function showImages() {
  var container = document.getElementById("images-container");

  if (answered > 0) {
    for (var i = 1; i <= 3; i++) {
      var image = document.getElementById("choice" + i);
      container.removeChild(image);
    }
  }

  var usedIndexes = [];

  for (var i = 1; i <= 3; i++) {
    var randomIndex = Math.floor(Math.random() * products.length);
    while (usedIndexes.indexOf(randomIndex) > -1) {
      randomIndex = Math.floor(Math.random() * products.length);
    }
    var image = document.createElement("img");
    image.setAttribute("class", "images");
    image.setAttribute("id","choice" + i);

    if (answered < 15) {
      image.addEventListener("click", recordClick);
    }

    image.src = "img/" + products[randomIndex].fileName;
    container.appendChild(image);
    usedIndexes.push(randomIndex);
  }
}

function recordClick(event) {

  var clickedItem = event.target;
  var itemId = clickedItem.id;
  // var selected = document.getElementById(itemId);
  // selected.setAttribute("class", "selected");

  var itemSource = clickedItem.src;
  var lastSlash = itemSource.lastIndexOf("/") + 1;
  itemSource = itemSource.substring(lastSlash);
  console.log(itemSource + " was clicked.");
  results.push(itemSource);

  // var images = document.getElementsByTagName("img");
  // var pickedImg = images.indexOf(itemSource);
  // console.log(pickedImg);


  // delay(1000);
  answered++;
  moveProgressBar();
  if (answered === 15) {
    showResults();
  } else {
    showImages();
  }
}

function moveProgressBar() {
  var completedBar = document.getElementById("bar");
  var width = Math.floor((answered / 15) * 100);
  console.log(width);
  completedBar.style.width = width + '%';
  completedBar.innerHTML = answered + " / 15";
}

function showResults() {

}

function delay(ms) {
   ms += new Date().getTime();
   while (new Date() < ms){}
}

window.addEventListener("load", showImages);
// window.addEventListener("load", makeImagesClickable);
