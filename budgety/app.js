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

// BUDGET CONTROLLER
var budgetController = (function() {

})();

// UI CONTROLLER
var UIController = (function() {
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn'
  }
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      }
    },
    getDOMStrings: function() {
      return DOMStrings;
    }
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  var DOM = UICtrl.getDOMStrings();

  var ctrlAddItem = function() {
    // 1. Get input data
    var input = UICtrl.getInput();
    console.log(input);

    // 2. Add item to the budget controller

    // 3. Add item to UI

    // 4. Calculate the budget

    // 5. Display the budget on UI
  };

  document.querySelector(DOM.addBtn).addEventListener('click', function() {
    ctrlAddItem();
  });

  document.addEventListener('keypress', function(event) {
    if(event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);