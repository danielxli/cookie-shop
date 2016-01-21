var pikePlace = {
  shopId: 'Pike Place',
  minCustomers: 0,
  maxCustomers: 1,
  cookiesPerCustomer: 2,
  hourlyCustomers: [],
  hoursOpen: ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
};

pikePlace.customersPerHour = function (min, max) {
  this.minCustomers = min;
  this.maxCustomers = max;
  var tempArray = [];
  for (i = 0; i < pikePlace.hoursOpen.length ; i++) {
    tempArray.push(Math.floor(Math.random()*(max-min))+min);
  }
  pikePlace.hourlyCustomers = tempArray;
  console.log(pikePlace.hourlyCustomers);
};

var seaTac = {
  shopId: 'Sea Tac Airport',
  minCustomers: 0,
  maxCustomers: 1,
  cookiesPerCustomer: 2,
  hourlyCustomers: [],
  hoursOpen: ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
};

seaTac.customersPerHour = function (min, max) {
  this.minCustomers = min;
  this.maxCustomers = max;
  var tempArray = [];
  for (i = 0; i < seaTac.hoursOpen.length ; i++) {
    tempArray.push(Math.floor(Math.random()*(max-min))+min);
  }
  seaTac.hourlyCustomers = tempArray;
  console.log(seaTac.hourlyCustomers);
};

var southcenter = {
  shopId: 'Southcenter',
  minCustomers: 0,
  maxCustomers: 1,
  cookiesPerCustomer: 2,
  hourlyCustomers: [],
  hoursOpen: ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
};

southcenter.customersPerHour = function (min, max) {
  this.minCustomers = min;
  this.maxCustomers = max;
  var tempArray = [];
  for (i = 0; i < southcenter.hoursOpen.length ; i++) {
    tempArray.push(Math.floor(Math.random()*(max-min))+min);
  }
  southcenter.hourlyCustomers = tempArray;
  console.log(southcenter.hourlyCustomers);
};

var bellevueSquare = {
  shopId: 'Bellevue Square',
  minCustomers: 0,
  maxCustomers: 1,
  cookiesPerCustomer: 2,
  hourlyCustomers: [],
  hoursOpen: ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
};

bellevueSquare.customersPerHour = function (min, max) {
  this.minCustomers = min;
  this.maxCustomers = max;
  var tempArray = [];
  for (i = 0; i < bellevueSquare.hoursOpen.length ; i++) {
    tempArray.push(Math.floor(Math.random()*(max-min))+min);
  }
  bellevueSquare.hourlyCustomers = tempArray;
  console.log(bellevueSquare.hourlyCustomers);
};

var alki = {
  shopId: 'Alki',
  minCustomers: 0,
  maxCustomers: 1,
  cookiesPerCustomer: 2,
  hourlyCustomers: [],
  hoursOpen: ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
};

alki.customersPerHour = function (min, max) {
  this.minCustomers = min;
  this.maxCustomers = max; 
  var tempArray = [];
  for (i = 0; i < alki.hoursOpen.length ; i++) {
    tempArray.push(Math.floor(Math.random()*(max-min))+min);
  }
  alki.hourlyCustomers = tempArray;
  console.log(alki.hourlyCustomers);
};







// CODE STARTS HERE

var sectionEl = document.getElementById('store-data');
var shops = [pikePlace, seaTac, southcenter, bellevueSquare, alki];

pikePlace.customersPerHour(17, 88);
seaTac.customersPerHour(6, 24);
southcenter.customersPerHour(11, 38);
bellevueSquare.customersPerHour(20, 48);
alki.customersPerHour(3, 24);

pikePlace.cookiesPerCustomer = 5.2;
seaTac.cookiesPerCustomer = 1.2;
southcenter.cookiesPerCustomer = 1.9;
bellevueSquare.cookiesPerCustomer = 3.3;
alki.cookiesPerCustomer = 2.6;


function createShopEl(shopName) {
  var s = shopName;
  var ulEl = document.createElement('ul');
  for (hour in s.hoursOpen) {
    var liEl = document.createElement('li');
    liEl.textContent = s.hoursOpen[hour] + ": " + s.hourlyCustomers[hour] + " customers and " + Math.floor(s.hourlyCustomers[hour]*s.cookiesPerCustomer) + " cookies";
    ulEl.appendChild(liEl);
  }
  // sectionEl.appendChild(ulEl);
  return ulEl;
}

function createShopList(shopArray) {
  var ulEl = document.createElement('ul');
  for (sho in shopArray) {
    var liEl = document.createElement('li');
    liEl.textContent = shopArray[sho].shopId + " | Min customers per hour: " + shopArray[sho].minCustomers + " | Max customers per hour: " + shopArray[sho].maxCustomers + " | Average cookies per customer: " + shopArray[sho].cookiesPerCustomer;
    liEl.appendChild(createShopEl(shopArray[sho]));
    ulEl.appendChild(liEl);
  }
  sectionEl.appendChild(ulEl);
}
