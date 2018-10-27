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

   var calculateTotal = function(type) {
      var sum = 0;
      data.allItems[type].forEach(function(current) {
         sum += current.value;
      });
      data.total[type] = sum;
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
      },
      budget: 0,
      percentage: -1
   };

   return {
      addItem: function(type, descr, val) {
         var newItem, id;

         // New ID is the last ID plus 1. There should be no duplicate IDs
         if (data.allItems[type].length > 0) {
            id = data.allItems[type][data.allItems[type].length - 1].id + 1;
         } else {
            id = 0;
         }

         if (type === 'exp') {
            newItem = new Expense(id, descr, val);
         } else if (type === 'inc') {
            newItem = new Income(id, descr, val);
         }

         data.allItems[type].push(newItem);

         return newItem;
      },
      calculateBudget: function() {
         // Calculate total income and expenses
         calculateTotal('exp');
         calculateTotal('inc');

         // Calculate the budget: income - expenses
         data.budget = data.total.inc - data.total.exp;

         // Calculate the percentage of income spent
         if(data.total.inc > 0) {
            data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
         } else {
            data.percentage = -1;
         }
         
      },
      getBudget: function() {
         return {
            budget: data.budget,
            totalInc: data.total.inc,
            totalExp: data.total.exp,
            percentage: data.percentage
         };
      }
   };
})();

// UI CONTROLLER
var UIController = (function() {
   var DOMStrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      addBtn: '.add__btn',
      incomeContainer: '.income__list',
      expenseContainer: '.expenses__list'
   }
   return {
      getInput: function() {
         return {
            type: document.querySelector(DOMStrings.inputType).value,
            description: document.querySelector(DOMStrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
         }
      },
      addListItem: function(obj, type) {
         var html, newHTML, element;

         // Create HTML string with placeholder text
         if (type === 'inc') {
            element = DOMStrings.incomeContainer;
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
         } else if (type === 'exp') {
            element = DOMStrings.expenseContainer;
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
         }

         // Replace placeholder text with some actual data
         newHTML = html.replace('%id%', obj.id);
         newHTML = newHTML.replace('%description%', obj.description);
         newHTML = newHTML.replace('%value%', obj.value);

         // Insert the HTML into the DOM
         document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
      },
      clearFields: function() {
         var fields, fieldsArray;
         fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

         fieldsArray = Array.prototype.slice.call(fields);

         fieldsArray.forEach(function(current, index, array) {
            current.value = "";
         });

         // Focus on description input
         fieldsArray[0].focus();
      },
      getDOMStrings: function() {
         return DOMStrings;
      }
   };
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

   var setupEventListeners = function() {
      var DOM = UICtrl.getDOMStrings();

      document.querySelector(DOM.addBtn).addEventListener('click', function() {
         ctrlAddItem();
      });

      document.addEventListener('keypress', function(event) {
         if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
         }
      });
   };

   var updateBudget = function() {
      // 1. Calculate the budget
      budgetCtrl.calculateBudget();

      // 2. Return the budget
      var budget = budgetCtrl.getBudget();

      // 3. Display the budget on UI
      console.log(budget);
   };

   var ctrlAddItem = function() {
      var input, newItem;

      // 1. Get input data
      input = UICtrl.getInput();

      if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
         // 2. Add item to the budget controller
         newItem = budgetCtrl.addItem(input.type, input.description, input.value);

         // 3. Add item to UI
         UICtrl.addListItem(newItem, input.type);

         // 4. Clear the fields
         UICtrl.clearFields();

         // 5. Calculate and update budget
         updateBudget();
      }
   };

   return {
      init: function() {
         console.log('Application has started.');
         setupEventListeners();
      }
   };
})(budgetController, UIController);

controller.init();
