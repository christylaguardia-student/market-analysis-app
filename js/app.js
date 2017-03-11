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

  // check if 1st set, if not remove previous images
  if (answered > 0) {
    for (var i = 1; i <= 3; i++) {
      var image = document.getElementById("choice" + i);
      container.removeChild(image);
    }
  }
  // keep track of pictures used
  var usedIndexes = [];
  // get three random images
  for (var i = 1; i <= 3; i++) {
    var randomIndex = Math.floor(Math.random() * products.length);
    // check if image already uesed
    while (usedIndexes.indexOf(randomIndex) > -1) {
      randomIndex = Math.floor(Math.random() * products.length);
    }
    var productToDisplay = products[randomIndex];
    // show image
    var image = document.createElement("img");
    image.setAttribute("caption", productToDisplay.name)
    image.setAttribute("class", "images");
    image.setAttribute("id","choice" + i);
    // check if this is the last question
    if (answered < 15) {
      image.addEventListener("click", recordClick);
    }

    image.src = "img/" + productToDisplay.fileName;
    container.appendChild(image);
    usedIndexes.push(randomIndex);
  }
}

function recordClick(event) {
  // get image that was clicked
  var clickedItem = event.target;
  var itemId = clickedItem.id;
  var itemSource = clickedItem.src;
  var lastSlash = itemSource.lastIndexOf("/") + 1;
  itemSource = itemSource.substring(lastSlash);
  console.log(itemSource + " was clicked.");
  // add to the results array
  results.push(itemSource);

  // var images = document.getElementsByTagName("img");
  // var pickedImg = images.indexOf(itemSource);
  // console.log(pickedImg);


  // delay(1000);
  // add to total count
  answered++;

  moveProgressBar();

  // check if last question
  if (answered === 15) {
    showResults();
  } else {
    showImages();
  }
}

function moveProgressBar() {
  var completedBar = document.getElementById("bar");
  var width = Math.floor((answered / 15) * 100);
  completedBar.style.width = width + '%';
  completedBar.innerHTML = answered + " / 15";
}

function showResults() {
  // make table
  var resultsElement = document.getElementById("results");
  var table = document.createElement("table");
  table.setAttribute("class", "data");
  // make headers
  var headerRow = document.createElement("tr");
  var headerData2 = document.createElement("th");
  headerData2.setAttribute("colspan","2");
  headerData2.textContent = "Product"
  headerRow.appendChild(headerData2);
  var headerData3 = document.createElement("th");
  headerData3.textContent = "Your Votes"
  headerRow.appendChild(headerData3);
  table.appendChild(headerRow)

  // get count of votes for each Product
  var sorted = products.sort();
  for (var i = 1; i < sorted.length; i++) {
    var tableRow = document.createElement("tr");

    // add product name
    var tableData2 = document.createElement("td");
    tableData2.textContent = products[i].name;
    tableRow.appendChild(tableData2);

    // add thumbnail image
    var tableData3 = document.createElement("td");
    var image = document.createElement("img");
    image.setAttribute("class", "thumbnail");
    image.src = "img/" + products[i].fileName;
    tableData3.appendChild(image);
    tableRow.appendChild(tableData3);

    // get count in results array
    var votes = 0;
    for (var j = 0; j < results.length; j++) {
        if (results[j] === products[i].fileName) {
            votes++;
        }
    }
    var tableData4 = document.createElement("td");
    tableData4.textContent = votes;
    tableRow.appendChild(tableData4);

    table.appendChild(tableRow);

  }





  //
  // for (var i = 1; i < results.length; i++) {
  //   var tableRow = document.createElement("tr");
  //   var tableData1 = document.createElement("td");
  //   tableData1.textContent = i;
  //   tableRow.appendChild(tableData1);
  //   var tableData2 = document.createElement("td");
  //   tableData2.textContent = results[i];
  //   tableRow.appendChild(tableData2);
  //   table.appendChild(tableRow);
  // }
  resultsElement.appendChild(table);
}

function delay(ms) {
   ms += new Date().getTime();
   while (new Date() < ms){}
}

window.addEventListener("load", showImages);
// window.addEventListener("load", makeImagesClickable);
