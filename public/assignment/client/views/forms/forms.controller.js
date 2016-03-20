"use strict";
(function(){
        angular
            .module("FormBuilderApp")
            .controller("FormController", FormController);

        function FormController($scope, $location, FormService, $rootScope) {
            var vm = this;
            vm.message = null;
            vm.addForm = addForm;
            vm.updateForm = updateForm;
            vm.deleteForm = deleteForm;
            vm.selectForm = selectForm;
            vm.index = -1;

            if ($rootScope.currentUser == null) {
                $location.url('/home');
            }
            else {
                FormService.findAllFormsForUser($rootScope.currentUser._id)
                    .then(function (response) {
                        var forms = response.data;
                        if (forms) {
                            $scope.userForms = forms;
                        }
                    });
            }
        }

    function setCurrentForm(new_form) {
        $rootScope.form = null;
        $scope.userForms.push(new_form);
    }

    function addForm(form) {
        $scope.message = null;

        if (form == null) {
            $scope.message = "Please fill in the required fields";
            return;
        }

        var form1 = FormService.findFormByTitle(form);
        if (form1 != null) {
            $scope.message = "Form already exists";
            return;
        }
        var new_form = {"_id": null, "title": form, "userId": null};
        FormService.createFormForUser($rootScope.currentUser._id, new_form, setCurrentForm);
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

    function updateForm(form) {
        var success = null;
              //  var index = findIndexByTitle(form);
                //$scope.index = index;

        if ($scope.index != -1 && form != null) {
            var selected = $scope.userForms[$scope.index];
            selected.title = form;
            FormService.updateFormById(selected._id, selected, function (response) {
                success = response;
                if (success) {
                    FormService.findAllFormsForUser($rootScope.currentUser._id)
                        .then(function (response) {
                            var forms = response.data;
                            if (forms) {
                                $scope.userForms = forms;
                                $rootScope.form = null;
                            }
                        });
                }
            });
        }
        else{
            $scope.message = "Form Name cannot be empty";
        }
    }

    function selectForm(index) {
        console.log("Hello from selectForm");
        $scope.index = index;
        var selected = $scope.userForms[$scope.index];
        console.log(selected);
        $scope.form = selected.title;
    }

    function deleteForm(index) {
        FormService.deleteFormById($scope.userForms[index]._id, function (response) {
            var success = response;
            if (success) {
                FormService.findAllFormsForUser($rootScope.currentUser._id)
                    .then(function (response) {
                        var forms = response.data;
                        if (forms) {
                            $scope.userForms = forms;
                        }
                    });
            }
        });
    }
})();
