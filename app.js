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
  this.hourlyCookies = [];
  this.totalCustomers = 0;
  this.totalCookies = 0;
  this.hoursOpen = hoursOpen;
  shops.push(this);
};
Shop.prototype.customersPerHour = function() {
  var tempArray = [];
  var totalCustomers = 0;
  for (i = 0; i < this.hoursOpen.length ; i++) {
    var randCustomer = Math.floor(Math.random()*(this.maxCustomers-this.minCustomers))+this.minCustomers;
    tempArray.push(randCustomer);
    totalCustomers += randCustomer;
  }
  this.hourlyCustomers = tempArray;
  this.totalCustomers = totalCustomers;
};
Shop.prototype.cookiesPerHour = function() {
  var tempArray = [];
  var totalCookies = 0;
  for (i = 0; i < this.hourlyCustomers.length ; i++) {
    var cookieCalc = Math.round(this.hourlyCustomers[i]*this.cookiesPerCustomer);
    tempArray.push(cookieCalc);
    totalCookies += cookieCalc
  }
  this.hourlyCookies = tempArray;
  this.totalCookies = totalCookies;
};
for (s in shopNames) {
  new Shop(shopNames[s], minCustomersArray[s], maxCustomersArray[s], cookiesPerCustomerArray[s]);
  shops[s].customersPerHour();
  shops[s].cookiesPerHour();
};

var storeSectionEl = document.getElementById('store-data');
var customerSectionEl = document.getElementById('customer-data');
var cookieSectionEl = document.getElementById('cookie-data');

function addStore() {
  var sName = document.getElementsByName('shopNameInput')[0].value;
  var minCust = parseInt(document.getElementsByName('minCustomersPerHourInput')[0].value);
  var maxCust = parseInt(document.getElementsByName('maxCustomersPerHourInput')[0].value);
  var cookiesPer = parseFloat(document.getElementsByName('averageCookiesPerCustomerInput')[0].value);
  new Shop(sName, minCust, maxCust, cookiesPer);
  shops[shops.length-1].customersPerHour();
  shops[shops.length-1].cookiesPerHour();
  addTableRow('customer-table', shops[shops.length-1].shopName,shops[shops.length-1].hourlyCustomers.concat(shops[shops.length-1].totalCustomers));
  addTableRow('cookie-table', shops[shops.length-1].shopName,shops[shops.length-1].hourlyCookies.concat(shops[shops.length-1].totalCookies));
};

var buttonEl = document.getElementById('addStoreButton');
buttonEl.addEventListener('click', addStore, false);

//prepare data for table function
var columnHeaders = hoursOpen.concat("Total");
var arrayOfCookieData = [];
var arrayOfCustomerData = [];
var arrayOfStoreData = [];
for (shop in shops) {
  var cookiesPerHourByStore = shops[shop].hourlyCookies.concat(shops[shop].totalCookies);
  var customersPerHourByStore = shops[shop].hourlyCustomers.concat(shops[shop].totalCustomers);
  var attributesByStore = [shops[shop].minCustomers, shops[shop].maxCustomers, shops[shop].cookiesPerCustomer];
  arrayOfCookieData.push(cookiesPerHourByStore);
  arrayOfCustomerData.push(customersPerHourByStore);
  arrayOfStoreData.push(attributesByStore);
};
var storeAttributes = ['Min # of Customers', 'Max # of Customers', 'Avg # Cookies Per Customer'];

function createTable(tableTitle, tableId, parentElement, columnTitleArray, rowTitleArray, arrayOfRowData) {
  var h3El = document.createElement('h3');
  h3El.textContent = tableTitle;
  parentElement.appendChild(h3El);
  var tableEl = document.createElement('table');
  tableEl.setAttribute('id', tableId)
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
  parentElement.appendChild(tableEl);
};

function addTableRow(parentElementId, rowTitle, arrayOfData) {
  var tableEl = document.getElementById(parentElementId)
  var rowEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = rowTitle;
  rowEl.appendChild(thEl);
  for (var i = 0; i < arrayOfData.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = arrayOfData[i];
    rowEl.appendChild(tdEl);
    }
  console.log(rowEl);
  tableEl.appendChild(rowEl);
}

createTable('Stores', 'store-table', storeSectionEl, storeAttributes, shopNames, arrayOfStoreData);
createTable('Customers', 'customer-table', customerSectionEl, columnHeaders, shopNames, arrayOfCustomerData);
createTable('Cookies', 'cookie-table', cookieSectionEl, columnHeaders, shopNames, arrayOfCookieData);
