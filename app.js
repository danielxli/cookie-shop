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
    var randCustomer = Math.floor(Math.random()*(this.maxCustomers-this.minCustomers+1))+this.minCustomers;
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

var columnHeaders = hoursOpen.concat("Total");
var arrayOfCookieData = [];
var arrayOfCustomerData = [];
var arrayOfStoreData = [];
var storeAttributes = ['Min # of Customers', 'Max # of Customers', 'Avg # Cookies Per Customer'];

function createElAndAppend(type, content, whereToAppend) {
  var el = document.createElement(type);
  el.textContent = content;
  whereToAppend.appendChild(el);
}

function createRow(tagType, rowTitle, arrayOfData) {
  var rowEl = document.createElement('tr');
  createElAndAppend('th',rowTitle,rowEl);
  for (var i = 0; i < arrayOfData.length; i++) {
    createElAndAppend(tagType, arrayOfData[i], rowEl);
    }
  return rowEl;
}

function appendRow(parentElementId, rowTitle, arrayOfData) {
  var tableEl = document.getElementById(parentElementId);
  tableEl.appendChild(createRow('td', rowTitle, arrayOfData));
}

function prepTableData() {
  arrayOfCookieData = [];
  arrayOfCustomerData = [];
  arrayOfStoreData = [];
  for (shop in shops) {
    var cookiesPerHourByStore = shops[shop].hourlyCookies.concat(shops[shop].totalCookies);
    var customersPerHourByStore = shops[shop].hourlyCustomers.concat(shops[shop].totalCustomers);
    var attributesByStore = [shops[shop].minCustomers, shops[shop].maxCustomers, shops[shop].cookiesPerCustomer];
    arrayOfCookieData.push(cookiesPerHourByStore);
    arrayOfCustomerData.push(customersPerHourByStore);
    arrayOfStoreData.push(attributesByStore);
  };
};

function createTable(tableTitle, tableId, parentElement, columnTitleArray, rowTitleArray, arrayOfRowData) {
  createElAndAppend('h3', tableTitle, parentElement);
  var tableEl = document.createElement('table');
  tableEl.setAttribute('id', tableId)
  tableEl.appendChild(createRow('th',tableTitle,columnTitleArray));
  for (var i = 0; i < arrayOfRowData.length; i++) {
    tableEl.appendChild(createRow('td', rowTitleArray[i], arrayOfRowData[i]));
    }
  parentElement.appendChild(tableEl);
};

function renderTables() {
  prepTableData()
  storeSectionEl.innerHTML = '';
  customerSectionEl.innerHTML = '';
  cookieSectionEl.innerHTML = '';
  createTable('Stores (click to edit)', 'store-table', storeSectionEl, storeAttributes, shopNames, arrayOfStoreData);
  createTable('Customers', 'customer-table', customerSectionEl, columnHeaders, shopNames, arrayOfCustomerData);
  createTable('Cookies', 'cookie-table', cookieSectionEl, columnHeaders, shopNames, arrayOfCookieData);
  clickToEdit()
  addNewStoreForm();
};

function addNewStoreForm() {
  var formEl = document.getElementById('addStoreForm');
  formEl.addEventListener('submit', function() {
    event.preventDefault()
    var sName = event.target.shopNameInput.value;
    var minCust = parseInt(event.target.minCustomersPerHourInput.value);
    var maxCust = parseInt(event.target.maxCustomersPerHourInput.value);
    var cookiesPer = parseFloat(event.target.averageCookiesPerCustomerInput.value);
    new Shop(sName, minCust, maxCust, cookiesPer);
    shopNames.push(sName);
    shops[shops.length-1].customersPerHour();
    shops[shops.length-1].cookiesPerHour();
    appendRow('store-table', shops[shops.length-1].shopName, [shops[shops.length-1].minCustomers, shops[shops.length-1].maxCustomers, shops[shops.length-1].cookiesPerCustomer]);
    appendRow('customer-table', shops[shops.length-1].shopName,shops[shops.length-1].hourlyCustomers.concat(shops[shops.length-1].totalCustomers));
    appendRow('cookie-table', shops[shops.length-1].shopName,shops[shops.length-1].hourlyCookies.concat(shops[shops.length-1].totalCookies));
});
}

function clickToEdit() {
  var storeTableEl = document.getElementsByTagName('table')[0];
  storeTableEl.addEventListener('click', function() {
    var newValue = prompt("Enter a new value for " + event.target.parentNode.childNodes[0].textContent +" " + event.target.parentNode.parentNode.childNodes[0].childNodes[event.target.cellIndex].textContent)
    for (shop in shops) {
      if (shops[shop].shopName === event.target.parentNode.childNodes[0].textContent) {
        if (event.target.cellIndex === 0) {
          shops[shop].shopName = newValue;
        } else if (event.target.cellIndex === 1) {
          shops[shop].minCustomers = parseInt(newValue);
        } else if (event.target.cellIndex === 2) {
          shops[shop].maxCustomers = parseInt(newValue);
        } else if (event.target.cellIndex === 3) {
          shops[shop].cookiesPerCustomer = parseFloat(newValue);
        }
        shops[shop].customersPerHour();
        shops[shop].cookiesPerHour();
        renderTables()
        break;
      }
    }
  });
}

renderTables();
