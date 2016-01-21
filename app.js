var shop = {
  minCustomers: 0,
  maxCustomers: 1,
  cookiesPerCustomer: 2,
  hourlyCustomers: []
};

shop.customersPerHour = function (min, max, numberOfHours) {
  var tempArray = Array(numberOfHours);
  for (hour in numberOfHours) {
    numberOfHours[hour] = Math.floor(Math.random()*(max-min))+min;
  }
  shop.hourlyCustomers = tempArray;

};
