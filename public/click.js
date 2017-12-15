angular.module('register',[])
.controller('registerCtrl',registerCtrl)
.factory('registerApi',registerApi)
.constant('apiUrl','http://localhost:1337'); // CHANGED for the lab 2017!

function registerCtrl($scope,registerApi){
  $scope.buttons=[]; //Initially all was still
  $scope.items=[];  // Also empty initally
  $scope.total=function(items) {
    var total = 0;
    // converts total from a string to a float
    parseFloat(total).toFixed(2);
    for (var i = 0; i < items.length; i++) {
      total = parseFloat(total) + parseFloat(findSum(items[i].price, items[i].quantity));
    }
    return total.toFixed(2);
  };
  // Defining which functions are visible in the HTML
  $scope.errorMessage='';
  $scope.isLoading=isLoading;
  $scope.refreshButtons=refreshButtons;
  $scope.buttonClick=buttonClick;
  $scope.findSum=findSum;
  $scope.itemClick=itemClick;
  $scope.voidClick=clickVoid;
  $scope.saleClick=saleClick;
  $scope.username="";
  $scope.password="";
  $scope.loggedIn=false;
  $scope.verifyCredentials=verifyCredentials;
  $scope.logout=logout;
  $scope.displayName = "";
  $scope.sale=false;
  $scope.printReceipt = printReceipt;
  $scope.getDate = getDate;
  $scope.date = "";
  var loading = false;
  function isLoading(){
    return loading;
  }

  // Sends a request to the server for button information. Upon a successfully recieved response, the controllers button array will become the new information from the server
  // Otherwise a error will be shown and loading will be set to false.
  function refreshButtons(){
    loading=true;
    $scope.errorMessage='';
    registerApi.getButtons()
    .success(function(data){
      $scope.buttons=data;
      loading=false;
      console.log(items);
    })
    .error(function () {
      $scope.errorMessage="Unable to load Buttons:  Database request failed";
      loading=false;
    });
  }
  // Sends a request to the server for item information. Upon a successfully recieved response, the controllers item array will become the new information from the server
  // Otherwise a error will be shown and loading will be set to false.
  function retrieveItems(){
    loading = true;
    $scope.errorMessage='';
    registerApi.getItems()
    .success(function(data){
      $scope.items = data;
      loading=false;
    }
  )
  .error(function(){$scope.errorMessage="Unable click"; loading=false;});
}

// Sends a request to the server that indicates a button has been clicked. Upon a successfully recieved response, the controller will update its button and item arrays
// from the server. Otherwise a error will be shown and loading will be set to false.
function buttonClick($event){
  $scope.errorMessage='';
  var username = $scope.username;
  registerApi.clickButton($event.target.id, username)
  .success(function(data){
    retrieveItems();
    refreshButtons();
  })
  .error(function(){$scope.errorMessage="Unable click";});

}
refreshButtons();  //makes sure the buttons are loaded
retrieveItems();  // makes sure the items are loaded

// Tells the server that an item has been pressed and includes the corresponding id of the item. Upon a successfully recieved response, the controllers item array will be
// updated from the server. Otherwise a error will be shown
function itemClick(id){
  $scope.errorMessage='';
  registerApi.clickItem(id)
  .success(function(){
    retrieveItems();
  })
  .error(function(){$scope.errorMessage="Error clicking on item -- Can't Delete!"});
}

function clickVoid($event){
  $scope.errorMessage='';
  registerApi.clickVoid($event)
  .success(function(){
    refreshButtons();  //makes sure the buttons are loaded
    retrieveItems();
  })
  .error(function(){$scope.errorMessage="Can't void transaction"});
}

// Helper function that multiples an items price by its quantity to provide information about the subtotal of a specific item
function findSum(price, quantity) {
  return (price * quantity).toFixed(2);
}

function verifyCredentials($event){
  $scope.errorMessage='';
  var response = "";
  var username = $scope.username;
  var password = $scope.password;
  registerApi.checkCredentials(username, password)
  .success(function(data){
    if (data.length > 0) {
      response = true;
      $scope.displayName = data[0].employee_name;
    } else {
      response = false;
      $scope.errorMessage="The username and/or password you entered was incorrect."
    }
    $scope.loggedIn = response;
  })
  .error(function(){$scope.errorMessage="Couldn't verify the credentials"});
}

function logout(){
  $scope.loggedIn = false;
  $scope.username = "";
  $scope.password = "";
}

function saleClick(){
  $scope.errorMessage='';
  var items = $scope.items;
  if (items.length > 0) {
  registerApi.completeSale()
  .success(function(){
    $scope.sale=true;
    getDate();
  })
  .error(function() {$scope.errorMessage="Could not enter the sale into the system!"});
}
else {
  $scope.errorMessage='A sale must include items in order to be valid';
}
}

function printReceipt(){
  $scope.sale=false;
  $scope.items.length=0;
}
function getDate(){
  // Sourced from stackOverflow
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if(dd<10){dd='0'+dd}
  if(mm<10){mm='0'+mm}
  var today = mm+'/'+dd+'/'+yyyy;
  $scope.date = today;
}
}

// function that accesses the server API endpoints in the server based on which function is called in this controller
function registerApi($http,apiUrl){
  return{
    clickVoid: function() {
      var url = apiUrl + '/void';
      return $http.get(url);
    },
    getButtons: function(){
      var url = apiUrl + '/buttons';
      return $http.get(url);
    },
    getItems: function(){
      var url = apiUrl + '/items';
      return $http.get(url)
    },
    clickButton: function(id, username){
      var url = apiUrl + '/click?id=' + id + '&username=' + username;
      return $http.get(url); // Easy enough to do this way
    },
    clickItem: function(id){
      var url = apiUrl +'/itemclick?id='+id
      return $http.get(url);
    },
    checkCredentials: function(username, password){
      var url = apiUrl +'/login?username=' + username + '&password=' + password
      return $http.get(url);
    },
    completeSale: function(){
      var url = apiUrl + '/sale'
      return $http.get(url);
    }
  };
}
