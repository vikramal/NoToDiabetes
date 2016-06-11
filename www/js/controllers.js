angular.module('starter.controllers', [])

.controller('loginCtrl',['$scope','$ionicModal','$ionicLoading','$firebaseAuth','$state','AUTHREF',function loginCtrl($scope,$ionicModal,$ionicLoading,$firebaseAuth,$state,AUTHREF)
{

$ionicModal.fromTemplateUrl('templates/modals/register.html',
{
   scope: $scope,
   animation: 'slide-in-up'
 }).then(function(signup) {
   $scope.signup = signup;
 });//signup modal


 $ionicModal.fromTemplateUrl('templates/modals/forgot.html',
 {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(forgot) {
    $scope.forgot = forgot;
  });//forgot modal

$scope.register=function (_remail, _rpassword)
{
  $ionicLoading.show({
    template:'<center><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner></center> <br><center>Creating An Account...</center>'
  });
 $firebaseAuth(AUTHREF).$createUser({
   email: _remail,
   password: _rpassword
 }).then(function(userData) {

  $ionicLoading.hide();
  $ionicLoading.show({
    template:'<center>Account Created Successfully<br>Please Login To Continue</center>',
    duration: 1000
  });
  $scope.signup.hide();
    $state.go('login');
}).catch(function(error) {
  console.error("Error: ", error);
  $ionicLoading.show({
    template:'<center><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner></center> <br><center>'+ error.message+ ' Signup Failed!</center>',
    duration: 2000
  });
});
}//end of register function

$scope.login=function (_email, _password)
{
  $ionicLoading.show({
    template:'<center><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner></center> <br><center>Signing In...</center>'

  });
 $firebaseAuth(AUTHREF).$authWithPassword({
   email: _email,
   password: _password
 }).then(function(authData) {
$ionicLoading.hide();
$ionicLoading.show({
  template:'<center>Signin Successful</center>',
  duration: 1000
});
  $state.go("app.news");
}).catch(function(error) {
  console.error("Error: ", error);
  $ionicLoading.show({
    template:'<center><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner></center> <br><center>'+ error.message+ ' Signin Failed!</center>',
    duration: 1500
  });
});
}//end of login function

$scope.forgotmail=function(_femail)
{
  $ionicLoading.show({
    template:'<center><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner></center> <br><center>Sending Email...</center>'
  });

  var authObj = $firebaseAuth(AUTHREF);
  authObj.$resetPassword({
  email: _femail
}).then(function() {
  console.log("Password reset email sent successfully!");
    $ionicLoading.hide();
  $ionicLoading.show({
    template:'<center>A temporary password has been sent to your registered email.<br> Please follow the instructions in the email to reset your password.</center>',
    duration: 4000
  });
  $scope.forgot.hide();
}).catch(function(error) {
  console.error("Error: ", error);
  $ionicLoading.show({
    template:'<center><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner></center> <br><center>'+ error.message+ '</center>',
    duration: 2000
  });
});
}//end of forgot password function

}])//end of login controller

.controller('protectedCtrl',['$scope','$firebaseAuth','$state','AUTHREF',function loginCtrl($scope,$firebaseAuth,$state,AUTHREF)
{
  $scope.checklogin=function()
  {
    var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
    if(fbAuth)
    {
      $state.go("app.news");
    }
    else {
      $state.go("login");
    }
  }
}])//end of protectedCtrl

.controller('AppCtrl',['$scope','$ionicModal','$firebaseAuth','$state','AUTHREF',function loginCtrl($scope,$ionicModal,$firebaseAuth,$state,AUTHREF)
{
$scope.logout=function()
{
  var fbAuth = $firebaseAuth(AUTHREF);
  fbAuth.$unauth();
  $state.go("protected");
}
}])//end of AppCtrl

.controller('AccountCtrl',['$scope','$firebaseAuth','$firebaseObject','$ionicLoading','$ionicModal','$state','AUTHREF','ITEMREF',function loginCtrl($scope,$firebaseAuth,$firebaseObject,$ionicLoading,$ionicModal,$state,AUTHREF,ITEMREF)
{

  $scope.acct = {
  name: null,
  email: null,
  sex : null,
  type: null,
  age: null,
  food: null,
  level: null,
  profession: null

};

console.log($scope.acct);

$scope.selectSex = function(_sex){
  $scope.acct.sex = _sex;
}
$scope.selectType = function(_type){
  $scope.acct.type = _type;
}
$scope.selectAge = function(_age){
  $scope.acct.age = _age;
}
$scope.selectFood = function(_food){
  $scope.acct.food = _food;
}
$scope.selectLevel = function(_level){
  $scope.acct.level = _level;
}
$scope.selectProf = function(_prof){
  $scope.acct.profession = _prof;
  console.log($scope.acct);
}

$scope.acctList = function(){

  var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
  if (fbAuth)
  {
    var ref = ITEMREF.child(fbAuth.uid).child("account");
    var obj = $firebaseObject(ref);

    obj.$loaded().then(function(x)
    {
      obj === x;
      $scope.details = obj;


    })
  }//end of fbAuth
}//end of account list function

  $scope.saveAccount = function(_fname){

$scope.acct.name = _fname;

var authObj = $firebaseAuth(AUTHREF).$getAuth();
var obj = ITEMREF.child(authObj.uid);

$scope.acct.email = authObj.password.email;

var prof = $firebaseObject(obj);

prof.account = $scope.acct;

prof.$save().then(function(ITEMREF){
  $ionicLoading.show({
    template:'<center>Saving Account Information.</center>',
    duration: 2000
  });
$state.go("app.news");
  console.log(prof.$id);

}, function(error){
  console.log("Error: ", error);
});

}//end of saveAccount function
}])//end of Account CTRL
