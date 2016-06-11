angular.module('starter.controllers', [])

.controller('loginCtrl',['$scope','$ionicModal','$firebaseAuth','$state','AUTHREF',function loginCtrl($scope,$ionicModal,$firebaseAuth,$state,AUTHREF)
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
 $firebaseAuth(AUTHREF).$createUser({
   email: _remail,
   password: _rpassword
 }).then(function(userData) {
console.log("Registrtion successfully!");
    $scope.signup.hide();
}).catch(function(error) {
  console.error("Error: ", error);
});
}//end of register function

$scope.login=function (_email, _password)
{
 $firebaseAuth(AUTHREF).$authWithPassword({
   email: _email,
   password: _password
 }).then(function(authData) {
  $state.go("app.news");
  console.log("Login successfully!");
}).catch(function(error) {
  console.error("Error: ", error);
});
}//end of login function

$scope.forgotmail=function(_femail)
{
  var authObj = $firebaseAuth(AUTHREF);
  authObj.$resetPassword({
  email: _femail
}).then(function() {
  console.log("Password reset email sent successfully!");
  $scope.forgot.hide();
}).catch(function(error) {
  console.error("Error: ", error);
});
}//end of forgot function

}])//end of login controller


.controller('AppCtrl',['$scope','$ionicModal','$firebaseAuth','$state','AUTHREF',function loginCtrl($scope,$ionicModal,$firebaseAuth,$state,AUTHREF)
{
$scope.logout=function()
{
  var fbAuth = $firebaseAuth(AUTHREF);
  fbAuth.$unauth();
  $state.go("login");
}
}])//end of AppCtrl
