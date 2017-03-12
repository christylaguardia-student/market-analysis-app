
  // // make header
  // var resultsElement = document.getElementById("results");
  // var header = document.createElement("h3");
  // header.setAttribute("class", "text");
  // header.textContent = "Your Product Survey Results:";
  // resultsElement.appendChild(header);
  //
  // // make table
  // var table = document.createElement("table");
  // table.setAttribute("class", "data");
  //
  // // make table headers
  // var headerRow = document.createElement("tr");
  // var headerData2 = document.createElement("th");
  // headerData2.setAttribute("colspan","2");
  // headerData2.textContent = "Product"
  // headerRow.appendChild(headerData2);
  // var headerData3 = document.createElement("th");
  // headerData3.setAttribute("colspan","2");
  // headerData3.textContent = "Votes"
  // headerRow.appendChild(headerData3);
  // table.appendChild(headerRow)
  //
  // // make row for each product
  // var sorted = products.sort();
  // for (var i = 1; i < sorted.length; i++) {
  //   var tableRow = document.createElement("tr");
  //   // add product name
  //   var tableData2 = document.createElement("td");
  //   tableData2.textContent = products[i].label;
  //   tableRow.appendChild(tableData2);
  //   // add thumbnail image
  //   var tableData3 = document.createElement("td");
  //   var image = document.createElement("img");
  //   image.setAttribute("class", "thumbnail");
  //   image.src = "img/" + products[i].fileName;
  //   tableData3.appendChild(image);
  //   tableRow.appendChild(tableData3);
  //   // get count in results array
  //   // var votes = 0;
  //   // for (var j = 0; j < results.length; j++) {
  //   //     if (results[j] === products[i].fileName) {
  //   //         votes++;
  //   //     }
  //   // }
  //   var tableData4 = document.createElement("td");
  //   tableData4.setAttribute("class", "centerAlign");
  //   tableData4.textContent = votes;
  //   tableRow.appendChild(tableData4);
  //   // get percentage of votes
  //   var tableData5 = document.createElement("td");
  //   tableData5.setAttribute("class", "centerAlign");
  //   tableData5.textContent = Math.round((votes / 15 ) * 100) + "%";
  //   tableRow.appendChild(tableData5);
  //
  //   table.appendChild(tableRow);
  // }
  // resultsElement.appendChild(table);
