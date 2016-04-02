/*jslint node: true */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(UserService, $location, FormService, $rootScope) {
        var vm = this;

        function init() {

        }

        init();

        vm.message = null;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.selected = null;
        vm.userForms = findAll();

        vm.index = 0;

        function findAll() {
            if ($rootScope.currentUser == null) {
                $location.url('/home');
            }
            else {
                var user;
                UserService.getCurrentUser()
                    .then(function (response) {
                        user = response.data;
                        FormService.findAllFormsForUser(user._id)
                            .then(function (response) {
                                var forms = response.data;
                                if (forms) {
                                    vm.userForms = forms;
                                }
                            });
                    });
            }
            return vm.userForms;
        }

        function addForm(form) {
            vm.message = null;

            if (form == null) {
                vm.message = "Please fill in the required fields";
            }
            else {
                if (vm.index !== 1) {
                    UserService.getCurrentUser()
                        .then(function (response) {
                            FormService.createFormForUser(response.data._id, form)
                                .then(function (response) {
                                    vm.selected = null;
                                    vm.userForms = findAll();
                                    $location.url("/forms");
                                });
                        });
                }
            }
        }

          function updateForm(form) {
            vm.index = 0;
            if (vm.selected) {
                if (form) {
                    var form_without_id = {
                        userId : form.userId,
                        title: form.title,
                        fields: form.fields,
                        created: form.created,
                        updated: form.updated
                    };
                    FormService.updateFormById(vm.selected._id, form_without_id)
                        .then(function (response) {
                            vm.selected = null;
                            vm.userForms = findAll();
                            $location.url("/forms");
                        }
                    );
                }
                else {
                    vm.message = "Form Name cannot be empty";
                    vm.selected = null;
                }
            }
        }

        function selectForm(index) {
            vm.index = 1;
            vm.selected =  {_id: vm.userForms[index]._id,
                title: vm.userForms[index].title,
                userId: vm.userForms[index].userId
            };

        }

        function deleteForm(index) {
            FormService.deleteFormById(vm.userForms[index]._id)
                .then(function (response) {
                    vm.userForms = findAll();
                    vm.selected = null;
                    $location.url("/forms");
                    }
            );
        }
    }
})();
