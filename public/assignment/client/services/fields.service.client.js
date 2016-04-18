/*jslint node: true */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldsService", FieldsService);

    function FieldsService($http) {
        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            removeFieldFromForm: removeFieldFromForm,
            updateField: updateField
        };

        return api;

        function createFieldForForm(formId, field){
            return $http.post("/api/assignment/form/" + formId + "/field",field);
        }

        function getFieldsForForm(formId){
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId){
            return $http.get("/api/assignemnt/form/" + formId + "/field/" + fieldId);
        }

        function removeFieldFromForm(formId, fieldId){
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField(formId, fieldId, field){
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId,field);
        }
    }
})();