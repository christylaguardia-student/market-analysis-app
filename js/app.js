// 14 images
// var images = ["bag.jpg", "banana.jpg", "boots.jpg","chair.jpg", "cthulhu.jpg", "dragon.jpg", "pen.jpg", "scissors.jpg", "shark.jpg", "sweep.jpg", "unicorn.jpg", "usb.jpg", "water_can.jpg", "wine_glass.jpg"]

// constructor function
function Product(name, fileName) {
  this.name = name;
  this.fileName = fileName;
}

var products = [];
// create objects
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
  // remove exising images
  var oldImages = document.getElementsByTagName("img");
  while (oldImages.length > 0) {
    container.removeChild(oldImages[0]);
  }
  // get three new images
  var usedIndexes = [];
  for (var count = 1; count <= 3; count++) {
    var randomIndex = Math.floor(Math.random() * products.length);
    console.log("random index: " + randomIndex);
    // check if image already used
    while (usedIndexes.indexOf(randomIndex) > -1) {
      randomIndex = Math.floor(Math.random() * products.length);
      console.log("getting diff index: " + randomIndex);
    }
    var image = document.createElement("img");
    image.src = "img/" + products[randomIndex].fileName;
    container.appendChild(image);
    usedIndexes.push(randomIndex);
  }
  makeImagesClickable();
}

function makeImagesClickable() {
  var images = document.getElementsByTagName("img");
  for (var index = 0; index < images.length; index++) {
    images[index].addEventListener("click", recordClick);
  }
}

var results = [];

function recordClick(event) {
  var clickedItem = event.target;
  var itemSource = clickedItem.src;
  var lastSlash = itemSource.lastIndexOf("/") + 1;
  itemSource = itemSource.substring(lastSlash);
  console.log(itemSource + " was clicked.");
  results.push(itemSource);
  showImages();
}

window.addEventListener("load", showImages);
// window.addEventListener("load", makeImagesClickable);
