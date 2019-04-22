"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Trent Peterson
    Date:   4.18.19  
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/

//this calls everything on window load
window.addEventListener("load", function () {
      //this creates a like array with all of the inputs in the class sum
      var changeingCells = document.querySelectorAll("table#travelExp input.sum");
      //this adds a event listener to everything in the array made above

      for (var i = 0; i < changeingCells.length; i++) {
            changeingCells[i].onchange = calcExp;
      }
      //this adds the onclick event handler to the sumbmit button
      document.getElementById("submitButton").onclick = function () {
            validateSummary();
      };
});

function validateSummary() {
      //this get the element with the summary id
      var summary = document.getElementById("summary");
      //this checks if the validity of summary and changes the notice
      if (summary.validity.valueMissing) {
            summary.setCustomValidity("You must include a summary of the trip in your report");
      } else {
            summary.setCustomValidity("");
      }
}

function calcClass(sumClass) {
      //this creates a like array with all of the elements in the parameters class
      var sumFields = document.getElementsByClassName(sumClass);
      var sumTotal = 0;
      //this goes through the like array above and if it is a number then it rounds it to the nearest 2 decimal places other wise it is left empty
      for (var i = 0; i < sumFields.length; i++) {
            var itemValue = parseFloat(sumFields[i].value);
            if (isNaN(itemValue)) {
                  sumTotal += itemValue;
            }
      }
      return sumTotal;
}

function calcExp() {
      //this makes a like array with all of the table rows
      var expTable = document.querySelectorAll("table#travelExp tbody tr");
      //this goes through all of the table rows adds the subtotal by calling in the number that was rounded in the previous function 
      for (var i = 0; i < expTable.length; i++) {
            document.getElementById("subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
      }
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);
      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"));
}

function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}