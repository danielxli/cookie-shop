var turtle = Object();
// this variable is the object constructor in javascript
// THIS IS NOT THE PREFERRED WAY TO CREATE AN OBJECT

var turtle = {
  color: 'Blue',
  legs: 4,
  ninja: true,
  hunger: 4
}; //<-- note the semicolon after the curly bracket.

// most commonly, declare most important properties in object literal. put functions outside
turtle.eat = function(isHungry) {
    if (isHungry > 5) {
      console.log('Get me some of dat pizza!');
    } else if (isHungry <= 5) {
      console.log('I\'m full brah');
    }
};

turtle.getColor = function() {
  return this.color;
};

turtle.randomHunger = function(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
};


function beans() {
}  //no semicolon


var beans = function() {
}; //<-- semicolon here because we are assigning a function to the variable beans



// var sectionEl = document.getElementById('myList');
// sectionEl.textContent = 'Hello World!'
//
// var ulEl = document.createElement('ul');  // creates a node by putting brackets around whatever string you give it.
// var liEl = document.createElement('li');
// liEl.textContent = "I like lists!"
//
// ulEl.appendChild(liEl);
// sectionEl.appendChild(ulEl);
// target.appendChild(content)



var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var weeks = [1, 2, 3, 4];
var sectionEl = document.getElementById('myList');
var ulEl = document.createElement('ul');

for (month in months) {
  var liEl = document.createElement('li');
  liEl.textContent = months[month];
  var nestedUlEl = document.createElement('ul');
  for (week in weeks) {
    var nestedLiEl = document.createElement('li');
    nestedLiEl.textContent = weeks[week];
    nestedUlEl.appendChild(nestedLiEl);
  }
  liEl.appendChild(nestedUlEl);
  ulEl.appendChild(liEl);
}

sectionEl.appendChild(ulEl);
