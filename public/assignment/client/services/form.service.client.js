"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope, $http) {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormByTitle: findFormByTitle
        };

        return api;

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form");
        }

        function findAllFormsForUser(userId) {
            /*var userForms =[];
             for (var f in model.forms) {
             if (model.forms[f].userId === userId) {
             userForms.push(model.forms[f]);
             }
             }
             callback(userForms);*/
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId) {
            /*for (var f in model.forms) {
             if (model.forms[f]._id === formId) {
             model.forms.splice(f, 1);
             break;
             }
             }
             callback(model.forms);*/
            return $http.delete("/api/assignment/form/" + formId);
        }


        function updateFormById(formId, newForm) {
            /*for (var f in model.forms) {
             if (model.forms[f]._id == formId) {
             model.forms[f].title = newForm.title;
             model.forms[f].userId = newForm.userId;
             callback(model.forms[f]);
             break;
             }
             }*/
            return $http.put("/api/assignment/form/" + formId);
        }

        function findFormByTitle(formTitle) {
            /*var form = null;
             for (var f in model.forms) {
             if (model.forms[f].title == formTitle) {
             form = model.forms[f];
             break;
             }
             }
             return form;
             }*/
            return $http.get("/api/assignment/form?" + formTitle);

        }
    }
})();