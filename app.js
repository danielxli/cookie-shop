var shops = [];
var shopNames = ['Pike Place', 'Sea Tac Airport', 'Southcenter', 'Bellevue Square', 'Alki'];
var minCustomersArray = [17, 6, 11, 20, 3];
var maxCustomersArray = [88, 24, 38, 48, 24];
var cookiesPerCustomerArray = [5.2, 1.2, 1.9, 3.3, 2.6];
var hoursOpen = ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];

function Shop(shopName, minCustomers, maxCustomers, cookiesPerCustomer) {
  this.shopName = shopName;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.cookiesPerCustomer = cookiesPerCustomer;
  this.hourlyCustomers = [];
  this.hoursOpen = hoursOpen;
  shops.push(this);
}
Shop.prototype.customersPerHour = function() {
  var tempArray = [];
  for (i = 0; i < this.hoursOpen.length ; i++) {
    tempArray.push(Math.floor(Math.random()*(this.maxCustomers-this.minCustomers))+this.minCustomers);
  }
  this.hourlyCustomers = tempArray;
};

for (s in shopNames) {
  new Shop(shopNames[s], minCustomersArray[s], maxCustomersArray[s], cookiesPerCustomerArray[s]);
  shops[s].customersPerHour()
};


var sectionEl = document.getElementById('store-data');

function createShopEl(shopName) {
  var runningCustomerTotal = 0;
  var runningCookieTotal = 0;
  var ulEl = document.createElement('ul');
  for (hour in shopName.hoursOpen) {
    var liEl = document.createElement('li');
    liEl.textContent = shopName.hoursOpen[hour] + ": " + shopName.hourlyCustomers[hour] + " customers and " + Math.floor(shopName.hourlyCustomers[hour] * shopName.cookiesPerCustomer) + " cookies";
    runningCustomerTotal += shopName.hourlyCustomers[hour];
    runningCookieTotal += Math.floor(shopName.hourlyCustomers[hour] * shopName.cookiesPerCustomer)
    ulEl.appendChild(liEl);
  }
  var totalLiEl = document.createElement('li');
  totalLiEl.textContent = "Total: " + runningCustomerTotal + " customers and " + runningCookieTotal +  " cookies";
  ulEl.appendChild(totalLiEl);
  return ulEl;
}

function createShopList(shopArray) {
  var ulEl = document.createElement('ul');
  for (sho in shopArray) {
    var liEl = document.createElement('li');
    liEl.textContent = shopArray[sho].shopName + " | Min customers per hour: " + shopArray[sho].minCustomers + " | Max customers per hour: " + shopArray[sho].maxCustomers + " | Average cookies per customer: " + shopArray[sho].cookiesPerCustomer;
    liEl.appendChild(createShopEl(shopArray[sho]));
    ulEl.appendChild(liEl);
  }
  sectionEl.appendChild(ulEl);
}

createShopList(shops);

function addStore() {
  var sName = document.getElementsByName('shopNameInput')[0].value;
  var minCust = parseInt(document.getElementsByName('minCustomersPerHourInput')[0].value);
  var maxCust = parseInt(document.getElementsByName('maxCustomersPerHourInput')[0].value);
  var cookiesPer = parseInt(document.getElementsByName('averageCookiesPerCustomerInput')[0].value);
  new Shop(sName, minCust, maxCust, cookiesPer);
  shops[shops.length-1].customersPerHour();
  sectionEl.textContent = '';
  createShopEl(shops[shops.length-1]);
  createShopList(shops);
};


//prepare data for table function
var arrayOfSales = []
for (shop in shops) {
  arrayOfSales.push(shops[shop].hourlyCustomers);
}

createTable(hoursOpen,shopNames,arrayOfSales);


var buttonEl = document.getElementById('addStoreButton');
buttonEl.addEventListener('click', addStore, false);


function createTable(columnTitleArray, rowTitleArray, arrayOfRowData) {
  var tableEl = document.createElement('table');
  if (columnTitleArray.length > 0) {
    var rowEl = document.createElement('tr');
    var thEl = document.createElement('th');
    thEl.textContent = rowTitleArray[i];
    rowEl.appendChild(thEl);
    for (var k = 0; k < columnTitleArray.length; k++) {
      var thEl = document.createElement('th');
      thEl.textContent = columnTitleArray[k];
      rowEl.appendChild(thEl);
    }
  }
  tableEl.appendChild(rowEl);
  for (var i = 0; i < arrayOfRowData.length; i++) {
    var rowEl = document.createElement('tr');

    if (rowTitleArray.length > 0 ) {
        var thEl = document.createElement('th');
        thEl.textContent = rowTitleArray[i];
        rowEl.appendChild(thEl);
    }
    for (var j = 0; j < arrayOfRowData[i].length; j++) {
      var tdEl = document.createElement('td');
      tdEl.textContent = arrayOfRowData[i][j];
      rowEl.appendChild(tdEl);
    }
    tableEl.appendChild(rowEl);
  }
  sectionEl.appendChild(tableEl);
  return tableEl;
}
