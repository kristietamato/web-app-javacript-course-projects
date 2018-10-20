// Budgety App

// UI Module tasks:
// Get input values
// Add the new item to the UI
// Update the UI

// Data Module tasks:
// Add the new item to our data structure
// Calculate budget

// Controller module tasks:
// Add event handler

var budgetController = (function() {
  var x = 23;
  var add = function(a) {
    return x + a;
  }

  return {
    publicTest: function(b) {
      return add(b);
    }
  }
})();

var UIController = (function() {

})();

var controller = (function(budgetCtrl, UICtrl) {
  var z = budgetCtrl.publicTest(5);

  return {
    anotherPublic: function() {
      console.log(z);
    }
  }
})(budgetController, UIController);