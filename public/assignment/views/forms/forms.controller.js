(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, FormService, $rootScope){
        console.log("Hello from FormController");
        $scope.message = null;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.userForms = null;

        FormService.findAllFormsForUser($scope.userId, function(response){
            forms = response;
            if(forms){
                $scope.userForms = forms;
            }});



        function setCurrentForm(form) {
            $rootScope.title = null;
            $scope.forms.push(form);
        }

        function addForm(form) {
            $scope.message = null;

            if (form == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!form.title) {
                $scope.message = "Please provide a form name";
                return;
            }

            var form1 = FormService.findFormByTitle(form.title);
            if (form1 != null) {
                $scope.message = "Form already exists";
                return;
            }

            FormService.createFormForUser($rootScope.userId, form, setCurrentForm);
        }

        function updateForm(form){
            var success = null;
            if($scope.index != -1 && form != null){
                var selected = $scope.forms[$scope.index];
                selected.title = form;
                FormService.updateFormById(selected._id, selected, function (response) {
                    success = response;
                    if (success) {
                        FormService.findAllFormsForUser($rootScope.user._id, function(response){
                            forms = response;
                            if(forms){
                                $scope.userForms = forms;
                            }
                    });
                }});
            }
        }
    }

        function deleteForm(index){
            FormService.deleteFormById($scope.forms[index]._id, function (response) {
                success = response;
                if (success) {
                    FormService.findAllFormsForUser($rootScope.user._id,function(response){
                        forms = response;
                        if(forms){
                            $scope.userForms = forms;
                        }
                    });

        }});
        }

        function selectForm(index){
            $scope.index = index;
            var selected = $scope.forms[index];
            $scope.title = selected.title;
        }
})();
