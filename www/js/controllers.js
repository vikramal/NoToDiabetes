angular.module('starter.controllers', [])

.controller('AppCtrl',['$scope','$firebaseAuth','$state','AUTHREF',function loginCtrl($scope,$firebaseAuth,$state,AUTHREF) {
}])
.controller('loginCtrl',['$scope','$firebaseAuth','$state','AUTHREF',function loginCtrl($scope,$firebaseAuth,$state,AUTHREF)
{
 $scope.register=function (_remail, _rpassword)
{
 $firebaseAuth(AUTHREF).$createUser({
   email: _remail,
   password: _rpassword
 }).then(function(userData) {
}).catch(function(error) {
  console.error("Error: ", error);
});
}//end of register function
}])//end of loginCtrl controller

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
