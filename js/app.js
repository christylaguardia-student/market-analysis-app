// global objects
var products = [];
var answeredQuestions = 0;
var totalQuestions = 15;
var chart = null;

// constructor function
function Product(name, source) {
  this.label = name; // inside the bar
  this.fileName = source;
  this.y = 0; // number of votes, y-axis value
  this.indexLabel = "0 Votes"; // percentage of votes, y-axis label
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
products.push(new Product("Sweep", "sweep.jpg", "left"));
products.push(new Product("Unicorn", "unicorn.jpg"));
products.push(new Product("USB", "usb.jpg"));
products.push(new Product("Water Can", "water_can.jpg"));
products.push(new Product("Wine Glass", "wine_glass.jpg"));

document.getElementById("survey").style.display = "none";
document.getElementById("chartContainer").style.display = "none";

function start() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("survey").style.display = "inline";
}


function showImages() {
  var container = document.getElementById("images-container");
  // check if 1st set, if not remove previous images
  if (answeredQuestions > 0) {
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
    var image = document.createElement("div");
    image.setAttribute("class", "images");
    image.setAttribute("id","choice" + i);
    image.setAttribute("data", productToDisplay.label); // the name of the product
    image.style.backgroundImage = "url(img/" + productToDisplay.fileName + ")";
    image.addEventListener("click", recordClick);
    container.appendChild(image);
    usedIndexes.push(randomIndex);
  }
}

function recordClick(event) {
  // get image that was clicked
  var clickedDiv = event.target;
  var clickedProduct = clickedDiv.attributes.getNamedItem("data").value; // product name
  console.log("Product Clicked: " + clickedProduct);
  // get object of clicked image
  var foundProduct = products.find(function(product){
    return (product.label == clickedProduct)
  });
  // put in localStorage
  localStorage.setItem(foundProduct.label, JSON.stringify(foundProduct));
  // add to count
  foundProduct.y++;
  foundProduct.indexLabel = foundProduct.y + " Vote";
  if (foundProduct.y > 1) { foundProduct.indexLabel += "s"; } // display '2 Votes' instead of '2 Vote'
  foundProduct.indexLabel += " (" + Math.round((foundProduct.y / totalQuestions) * 100) + "%)"; // add the % votes
  // do the stuff
  answeredQuestions++;
  moveProgressBar();
  // change selected product to check icon
  clickedDiv.style.backgroundImage = "url(img/check-icon.png)";
  // remove event listenters to prevent voting again on same images
  for (var i = 1; i <= 3; i++) {
    var image = document.getElementById("choice" + i);
    image.removeEventListener("click", recordClick, false);
  }
  // wait a second before advancing
  setTimeout(showNextImages, 500);
}

function showNextImages() {
  // check if last question, add button
  if (answeredQuestions === 15) {
    var buttonContainer = document.getElementById("buttonContainer");
    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("class", "button");
    button.setAttribute("value", "View Results");
    button.setAttribute("onclick", "showChart()")
    buttonContainer.appendChild(button);
  }
  // show the next question number
  var nextQuestionNumber = answeredQuestions + 1;
  document.getElementById("questionNumber").textContent = "Question " + nextQuestionNumber;
  // get the next set of pictures
  showImages();
}

function moveProgressBar() {
  // check if on last question in set
  if (answeredQuestions === totalQuestions) {
    // add next group
    totalQuestions += 15;
  }
  // change width of bar
  var completedBar = document.getElementById("bar");
  var width = Math.floor((answeredQuestions / totalQuestions) * 100);
  completedBar.style.width = width + '%';
  // change text on bar
  completedBar.innerHTML = answeredQuestions + " / " + totalQuestions;
}

function showChart () {
  // make the chart
  chart = new CanvasJS.Chart("chartContainer", {
    theme: "theme2",
    animationEnabled: true,
    axisY: {
      tickThickness: 0,
      lineThickness: 0,
      labelFontFamily: "Quicksand",
      color: "rgb(1, 130, 184)",
      valueFormatString: " ",
      gridThickness: 0,
      includeZero: true,
      interval: 1
    },
    axisX: {
      tickThickness: 0,
      lineThickness: 0,
      labelFontFamily: "Quicksand",
      interval: 1,
      label: "Your Votes"
    },
    data: [
      {
        indexLabelPlacement: "inside",
        indexLabelFontColor: "black",
        indexLabelFontFamily: "Quicksand",
        color: "#D98100",
        type: "bar",
        dataPoints: products
      }
    ]
  });
  // show the chart
  renderChart();
  // add event listener only after chart has been rendered
  window.addEventListener("click", renderChart);
}

// use this for event listener
function renderChart(){
  // sort by number of votes
  products.sort(function(a, b){return a.y - b.y});
  // show chart
  document.getElementById("chartContainer").style.display = "inline";
  chart.render();
}

function getPastSurveys() {
  // get the keys of all the local storage and convert to objects
  var archive = [];
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] != "lclStg") { // this comes from CanvasJS
      archive.push(JSON.parse(localStorage.getItem(keys[i]).split(",")));
    }
  }
  return archive;
}

window.addEventListener("load", showImages);
