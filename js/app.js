var products = [];
var results = [];
var answered = 0;
var totalQuestions = 15;

// constructor function
function Product(name, source) {
  this.label = name; // inside the bar
  this.fileName = source;
  this.y = 0; // number of votes, y-axis value
  this.indexLabel = "0%"; // percentage of votes, y-axis label
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
    // dispaly the image
    var image = document.createElement("img");
    image.setAttribute("caption", productToDisplay.name)
    image.setAttribute("class", "images");
    image.setAttribute("id","choice" + i);
    image.addEventListener("click", recordClick);
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
  // get object of clicked image
  var foundProduct = products.find(function(product){
    return (product.fileName == itemSource)
  });
  foundProduct.y++;
  foundProduct.indexLabel = Math.round((foundProduct.y / totalQuestions) * 100) + "%";

  // add to the results array
  results.push(itemSource);
  // add to total count
  answered++;
  // update progress bar
  moveProgressBar();
  // change selected product to check icon
  clickedItem.src = "img/" + "check-icon.png";
  // remove event listenters to prevent voting again on same images
  for (var i = 1; i <= 3; i++) {
    var image = document.getElementById("choice" + i);
    image.removeEventListener("click", recordClick, false);
  }
  // wait a few seconds
  setTimeout(showNextImages, 1000);
}

function showNextImages() {
  // check if last question
  if (answered === totalQuestions) {
    showResults();
  } else {
    showImages();
  }
}

function moveProgressBar() {
  var completedBar = document.getElementById("bar");
  var width = Math.floor((answered / totalQuestions) * 100);
  completedBar.style.width = width + '%';
  completedBar.innerHTML = answered + " / " + totalQuestions;
}

function showResults() {
  // remove elements
  var oldHeader = document.getElementById("instructions");
  oldHeader.removeChild(oldHeader.firstChild);
  var imagesContainer = document.getElementById("images-container");
  while (imagesContainer.firstChild) {
    imagesContainer.removeChild(imagesContainer.firstChild);
  }
  var progressBar = document.getElementById("progress");
  while (progressBar.firstChild) {
    progressBar.removeChild(progressBar.firstChild);
  }

  showChart();
}

function delay(ms) {
   ms += new Date().getTime();
   while (new Date() < ms){}
}

function showChart () {
  var chart = new CanvasJS.Chart("chartContainer", {
		theme: "theme2",//theme1
		// title:{
		// 	text: "Customer Interest Survey Results",
    //   fontFamily: "Inconsolata",
    //   fontColor: "#084C8D",
    //   fontSize: 18
		// },
		animationEnabled: true,
    axisY: {
      tickThickness: 0,
      lineThickness: 0,
      // valueFormatString: " ",
      gridThickness: 0,
      includeZero: true,
      interval: 1
    },
    axisX: {
      tickThickness: 0,
      lineThickness: 0,
      // labelFontSize: 14,
      // labelFontColor: "#084C8D",
      interval: 1,
      label: "Your Votes"
    },
		data: [
		{
      // indexLabelFontSize: 14,
      toolTipContent: "<span style='\"'color: {color};'\"'><strong>{indexLabel} </strong></span><span style='\"'font-size: 14px; color:#084C8D '\"'><strong>{y}</strong></span>",
      indexLabelPlacement: "inside",
      indexLabelFontColor: "black",
      // indexLabelFontWeight: 600,
      indexLabelFontFamily: "Inconsolata",
      color: "#D98100",
			// Change type to "bar", "area", "spline", "pie",etc.
			type: "bar",
			dataPoints: products
		}
		]
	});
	chart.render();
}

window.addEventListener("load", showImages);
