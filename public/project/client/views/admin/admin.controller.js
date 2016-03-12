(function(){
    angular
        .module("NetNewsApp")
        .controller("AdminController", adminController);

    function adminController($scope, $location, UserService, $rootScope) {

        $scope.message = null;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.index = -1;

        if ($rootScope.currentUser == null) {
            $location.url('/home');
        }
        else {
            UserService.findAllUsers(function (response) {
                users = response;
                if (users) {
                    $scope.users = users;
                }
            });
        }


        function setCurrentUser(new_user) {
            $rootScope.user = null;
            $scope.users.push(new_user);
        }


        /*function findIndexByTitle(formTitle){
         var index=0;
         for (var i=0; i < $scope.userForms.length;i++) {
         if ($scope.userForms[i].title == formTitle) {
         index=i;
         break;
         }
         }
         return index;
         }*/

        function updateUser(user) {
            var success = null;
            //  var index = findIndexByTitle(form);
            //$scope.index = index;

            if ($scope.index != -1 && user != null) {
                var selected = $scope.user[$scope.index];
                selected.userName = user.userName;
                UserService.updateUser(selected.userName, selected, function (response) {
                    success = response;
                    if (success) {
                        UserService.findAllUsers(function (response) {
                            users = response;
                            if (users) {
                                $scope.users = users;
                                $rootScope.user = null;
                            }
                        });
                    }
                });
            }
            else{
                $scope.message = "User Name cannot be empty";
            }
        }

        function selectUser(index) {
            $scope.index = index;
            var selected = $scope.users[$scope.index];
            console.log(selected.userName);
            $scope.userName = selected.userName;
            $rootScope.userName = selected.userName;
            console.log($rootScope.userName);
            //$scope.user.roles = selected.roles;
            //$scope.user.password = selected.password;

        }


        function deleteUser(index) {
            UserService.deleteUserById($scope.users[index]._id, function (response) {
                success = response;
                if (success) {
                    UserService.findAllUsers(function (response) {
                        users = response;
                        if (users) {
                            $scope.users = users;
                        }
                    });

                }
            });
        }

    }
})();
