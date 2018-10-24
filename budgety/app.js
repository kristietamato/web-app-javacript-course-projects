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
  // Expense and Income constructors
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Object to hold all expense and income values
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, descr, val) {
      var newItem, id;

      // New ID is the last ID plus 1. There should be no duplicate IDs
      if(data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      if(type === 'exp') {
        newItem = new Expense(id, descr, val);
      } else if(type === 'inc') {
        newItem = new Income(id, descr, val);
      }

      data.allItems[type].push(newItem);

      return newItem;
    }
  };
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

  var setupEventListeners = function() {
    document.querySelector(DOM.addBtn).addEventListener('click', function() {
      ctrlAddItem();
    });
  
    document.addEventListener('keypress', function(event) {
      if(event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  var DOM = UICtrl.getDOMStrings();

  var ctrlAddItem = function() {
    var input, newItem;

    // 1. Get input data
    input = UICtrl.getInput();

    // 2. Add item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add item to UI

    // 4. Calculate the budget

    // 5. Display the budget on UI
  };

  return {
    init: function() {
      console.log('Application has started.');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();