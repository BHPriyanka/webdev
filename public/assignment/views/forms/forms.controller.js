(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, FormService, $rootScope) {

        $scope.message = null;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.index = 0;

        if ($rootScope.currentUser == null) {
            $location.url('/home');
        }
        else {
            FormService.findAllFormsForUser($rootScope.currentUser._id, function (response) {
                forms = response;
                if (forms) {
                    $scope.userForms = forms;
                }
            });
        }


        function setCurrentForm(new_form) {
            console.log($scope.userForms);
            console.log(new_form);
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

        function updateForm(form) {
            var success = null;
            console.log("Hello from updateForm");

            if ($scope.index != -1 && form != null) {
                var selected = $scope.userForms[$scope.index];
                selected.title = form;
                FormService.updateFormById(selected._id, selected, function (response) {
                    success = response;
                    if (success) {
                        FormService.findAllFormsForUser($rootScope.currentUser._id, function (response) {
                            forms = response;
                            if (forms) {
                                $scope.userForms = forms;
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
            var selected = $scope.userForms[index];
            console.log(selected);
            $scope.form = selected.title;
        }


        function deleteForm(index) {
            FormService.deleteFormById($scope.userForms[index]._id, function (response) {
                success = response;
                if (success) {
                    FormService.findAllFormsForUser($rootScope.currentUser._id, function (response) {
                        forms = response;
                        if (forms) {
                            $scope.userForms = forms;
                        }
                    });

                }
            });
        }

    }
})();
