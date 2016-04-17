/*jslint node: true */
"use strict";

(function(){
    angular
        .module("NetNewsApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $location){
        var vm = this;
        vm.remove = remove;
        vm.update = update;
        vm.add = add;
        vm.select = select;
        vm.selected =null;
        vm.index =0;

        function init(){
            $(function(){
                $('#adminTable').tablesorter();
            });

            vm.users = UserService.findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function add (user){
            vm.message = null;

            if (user == null) {
                vm.message = "Please fill in the required fields";
            }
            else {
                if (vm.index !== 1) {
                    UserService.createUser(user)
                        .then(function (response) {
                            vm.selected = null;
                            vm.userForms = UserService.findAllUsers()
                                .then(handleSuccess, handleError);
                            $location.url("/admin");
                        });
                }
            }
        }

        function remove(index){
            UserService.deleteUser(vm.users[index]._id)
                .then(function (response) {
                        vm.users = response.data;
                        vm.selected = null;
                        $location.url("/admin");
                    }
                );
        }

        function update(user){
            if (vm.selected) {
                if (user) {
                    var user_without_id = {
                        userName : user.userName,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        emails: user.emails,
                        phones: user.phones,
                        roles: user.roles
                    };
                    UserService.updateUser(vm.selected._id, user_without_id)
                        .then(function (response) {
                                vm.selected = null;
                                vm.users = UserService.findAllUsers()
                                    .then(handleSuccess, handleError);
                                $location.url("/admin");
                            }
                        );
                }
                else {
                    vm.message = "Form Name cannot be empty";
                    vm.selected = null;
                }
            }
        }

        function select(index){
            vm.index = 1;
            vm.selected =  {_id: vm.users[index]._id,
                userName: vm.users[index].userName,
                password: vm.users[index].password,
                firstName: vm.users[index].firstName,
                lastName:vm.users[index].lastName,
                roles:vm.users[index].roles
            };

        }

        function handleSuccess(response){
            vm.users = response.data;
        }

        function handleError(){
            vm.error = error;
        }

    }
})();
