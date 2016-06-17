angular.module('starter.controllers', [])

.controller('loginCtrl',['$scope','$ionicModal','$ionicLoading','$firebaseAuth','$state','AUTHREF',function loginCtrl($scope,$ionicModal,$ionicLoading,$firebaseAuth,$state,AUTHREF)
{


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
  var authobj = $firebaseAuth(AUTHREF);
 authobj.$createUser({
   email: _remail,
   password: _rpassword
 }).then(function(userData) {
   return authobj.$authWithPassword({
     email: _remail,
     password: _rpassword
   });
 }).then(function(authData)
 {
  $ionicLoading.hide();
  $ionicLoading.show({
    template:'<center>Account Created Successfully</center>',
    duration: 1000
  });
    $state.go('tour1');
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


$scope.aupdate=function(_aemail,_sex)
{
  var authObj = $firebaseAuth(AUTHREF);
  authObj.$save({
  email: _femail
}).then(function() {
  console.log("this function is calling");

}).catch(function(error) {
  console.error("Error: ", error);

});
}//end of account function
}])//end of login controller

.controller('protectedCtrl',['$scope','$firebaseAuth','$state','AUTHREF',function protectedCtrl($scope,$firebaseAuth,$state,AUTHREF)
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

.controller('AppCtrl',['$scope','$firebaseAuth','$state','AUTHREF',function loginCtrl($scope,$firebaseAuth,$state,AUTHREF)
{
$scope.logout=function()
{
  var fbAuth = $firebaseAuth(AUTHREF);
  fbAuth.$unauth();
  $state.go("protected");
}
}])//end of AppCtrl

.controller('AccountCtrl',['$scope','$firebaseAuth','$firebaseObject','$ionicLoading','$ionicModal','$state','AUTHREF','ITEMREF',function AccountCtrl($scope,$firebaseAuth,$firebaseObject,$ionicLoading,$ionicModal,$state,AUTHREF,ITEMREF){

  $ionicModal.fromTemplateUrl('templates/modals/change.html',
  {
     scope: $scope,
     animation: 'slide-in-up'
   }).then(function(change) {
     $scope.change = change;
   });//change password modal

   $scope.changepwd=function(_oldpwd,_newpwd)
     {
       $ionicLoading.show({
         template:'<center><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner></center> <br><center>Resetting Password...</center>'
       });

       var authObj = $firebaseAuth(AUTHREF);
       var fbauth = $firebaseAuth(AUTHREF).$getAuth();
       var email = fbauth.password.email;
       authObj.$changePassword({
       email: email,
       oldPassword: _oldpwd,
       newPassword: _newpwd
     }).then(function() {
       console.log("Password Changed Successfully!");
         $ionicLoading.hide();
       $ionicLoading.show({
         template:'<center>Password Changed Successfully!</center>',
         duration: 2000
       });
       $scope.change.hide();
     }).catch(function(error) {
       console.error("Error: ", error);
       $ionicLoading.show({
         template:'<center><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner></center> <br><center>'+ error.message+ '</center>',
         duration: 2000
       });
     });
   }//end of change password function


  $ionicModal.fromTemplateUrl('templates/modals/editaccount.html',
  {
     scope: $scope,
     animation: 'slide-in-up'
   }).then(function(editacct) {
     $scope.editacct = editacct;
   });//forgot modal




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
  console.log($scope.acct);
}
$scope.selectType = function(_type){
  $scope.acct.type = _type;
  console.log($scope.acct);
}
$scope.selectAge = function(_age){
  $scope.acct.age = _age;
  console.log($scope.acct);
}
$scope.selectFood = function(_food){
  $scope.acct.food = _food;
  console.log($scope.acct);
}
$scope.selectLevel = function(_level){
  $scope.acct.level = _level;
  console.log($scope.acct);
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
console.log(authObj);
var obj = ITEMREF.child(authObj.uid);
console.log(obj);
$scope.acct.email = authObj.password.email;

var prof = $firebaseObject(obj);

prof.account = $scope.acct;

prof.$save().then(function(ITEMREF){
$state.go("app.news");
  console.log(prof.$id);

}, function(error){
  console.log("Error: ", error);
});

}//end of saveAccount function

$scope.edit=function(_details){

  $scope.editacct.show();

$scope.edetails = _details;
console.log($scope.edetails);


}//end of edit function

$scope.editAccount = function(_edetails){

  var authObj = $firebaseAuth(AUTHREF).$getAuth();
  var obj = ITEMREF.child(authObj.uid);

  var prof = $firebaseObject(obj);

  prof.account = _edetails;

  prof.$save().then(function(ITEMREF){
    console.log(prof.$id);
    $scope.editacct.hide();
  }, function(error){
    console.log("Error: ", error);
  });



}//end of edit account function

}])//end of Account CTRL


.controller('ReminderCtrl',['$scope','$firebaseAuth','$firebaseArray','$ionicLoading','$ionicModal','$state','$filter','AUTHREF','ITEMREF',function ReminderCtrl($scope,$firebaseAuth,$firebaseArray,$ionicLoading,$ionicModal,$state,$filter,AUTHREF,ITEMREF)
{
  $scope.repeat = false;

  $ionicModal.fromTemplateUrl('templates/modals/addreminder.html',
  {
     scope: $scope,
     animation: 'slide-in-up'
   }).then(function(addreminder) {
     $scope.addreminder = addreminder;
   });//add reminder modal

   $ionicModal.fromTemplateUrl('templates/modals/editreminder.html',
   {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(editreminder) {
      $scope.editreminder = editreminder;
    });//edit reminder modal

  $scope.reminderadd = function(rname,rdate,rtime,rdescip,repeat)
  {
    var _date = $filter('date')(rdate, 'MM/dd/yyyy');
    var _time = $filter('date')(rtime, 'H:mm');
    var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
    if (fbAuth)
    {
      var obj = ITEMREF.child(fbAuth.uid).child("reminder");
      var obj1 = $firebaseArray(obj);
      obj1.$add(
        {name: rname,
          date: _date,
          time : _time,
          repeat: repeat,
          description: rdescip
        }).then(function(ref)
        {
          $scope.addreminder.hide();
          console.log(ref.key())});
        }
  }//end of add reminder


  $scope.viewreminder = function()
  {
    var fbAuth = $firebaseAuth(AUTHREF).$getAuth();

    if (fbAuth)
    {
      var ref = ITEMREF.child(fbAuth.uid).child("reminder");
      var reminder = $firebaseArray(ref);
      reminder.$loaded().then(function(x){
        x === reminder;
        $scope.listofreminders = reminder;
      }).catch(function(error){
        console.log(error.message);
      });

    }
  }//end of view reminders

  $scope.ereminder = function(_r,_id)
  {
    var vikram = new Date();
    var d = _r.date;
    var fd = new Date(d);
    console.log(fd);
    $scope.erem = {

      name: _r.name,
      date: fd,
      time: null,
      description:_r.description,
      repeat: _r.repeat,
      id: _id
    };

    var rtime = fd;
    rtime = $filter('date')(rtime,'MM/dd/yyyy');
    rtime = rtime + ' ' + _r.time;
    $scope.erem.time = new Date(rtime);
    console.log($scope.erem.time);
    $scope.editreminder.show();
  }

  $scope.reminderedit = function(_erem)
  {
      var d = $filter('date')(_erem.date,'MM/dd/yyyy');
      var fd = d.toString();
      console.log(d,fd);
      var t = $filter('date')(_erem.time,'H:mm');
      var ft = t.toString();
      console.log(t,ft);

      var fbAuth = $firebaseAuth(AUTHREF).$getAuth();

      if (fbAuth)
      {
        var ref = ITEMREF.child(fbAuth.uid).child("reminder");
        var obj = $firebaseArray(ref);
        obj.$loaded().then(function(x){
          x === obj;
          var i = obj.$indexFor(_erem.id);
          obj[i].name=_erem.name;
          obj[i].date= fd;
          obj[i].time= ft;
          obj[i].description=_erem.description;
          obj[i].repeat=_erem.repeat;
          obj.$save(i).then(function(ref){
            ref.key() === obj.$id;
            $scope.editreminder.hide();
          },function(error){
            $scope.editreminder.hide();
            console.log(error.message);
          });//end of $save
        })//end of $loaded
  }// end of fbauth
}//end of edit function

  $scope.reminderdelete = function(_id) {
    var fbAuth = $firebaseAuth(AUTHREF).$getAuth();

    if (fbAuth)
    {
      var ref = ITEMREF.child(fbAuth.uid).child("reminder");
      var obj = $firebaseArray(ref);
      obj.$loaded().then(function(x){
        x === obj;
        var i = obj.$indexFor(_id);
        var item = obj[i];
        obj.$remove(item).then(function(ref){
          ref.key() === item.$id;
          $scope.editreminder.hide();
        }, function(error){
          console.log(error.message);
          $scope.editreminder.hide();
        })
      }).catch(function(error){
        console.log(error.message);
        $scope.editreminder.hide();
      });
  }
}

}])
