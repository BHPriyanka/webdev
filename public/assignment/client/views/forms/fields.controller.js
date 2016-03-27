/*jslint node: true */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldsService, FormService, $routeParams, $route, $location) {
        var vm = this;
        vm.cField = null;
        vm.eField = null;
        vm.fields = null;
        vm.editField = editField;
        vm.commitEdit = commitEdit;
        vm.removeField = removeField;
        vm.addField = addField;
        vm.reorder = reorder;

        vm.options = [
            "Single Line Text Field",
            "Multi Line Text Field",
            "Date Field",
            "Dropdown Field",
            "Checkboxes Field",
            "Radio Buttons Field"
        ];

        vm.selection = vm.options[0];
        vm.fieldOptions = null;
        var formId;
        if ($routeParams.formId) {
            formId = $routeParams.formId;
        }

        var optionMap =
            [
                {key: "Single Line Text Field", value: "TEXT"},
                {key: "Multi Line Text Field", value: "TEXTAREA"},
                {key: "Date Field", value: "DATE"},
                {key: "Dropdown Field", value: "OPTIONS"},
                {key: "Checkboxes Field", value: "CHECKBOXES"},
                {key: "Radio Buttons Field", value: "RADIOS"}
            ];

        function show(response) {
            console.log("SHOW" + response.data);
            vm.display = response.data;
            vm.fields = response.data;
        }

        function init() {
           FieldsService
                .getFieldsForForm(formId)
                .then(show);
        }
        init();

        function sendEdit(field) {
            vm.cField = null;
            FieldsService
                .updateField(formId, field._id, field)
                .then(init);
        }

        function reorder() {
            vm.form.fields = vm.fields;
            FormService
                .updateFormById(formId, vm.form)
                .then(init);

        }

        function removeField(field) {
            console.log("CONTROLLER- removeField");
            vm.cField = null;
            FieldsService
                .removeFieldFromForm(formId, field._id)
                .then(init);
        }

        function translateFieldType(fieldType) {
            for (var k in optionMap) {
                console.log(optionMap[k].key + " " + optionMap[k].value);
                if (optionMap[k].key == fieldType){
                    return optionMap[k].value;
                }
            }
        }

        function addField(fieldType) {
            var placeholder;
            if(fieldType == "TEXT" || fieldType == "TEXTAREA")
            {
                placeholder = "New Field";
            }
            else{
                placeholder = "";
            }
            var field = {"label": "New " + fieldType, "type": translateFieldType(fieldType), "placeholder": placeholder, "options": null};
            console.log(field);
            FieldsService
                .createFieldForForm(formId, field)
                .then(init);
        }


        function editField(field) {
            vm.eField = field;
            console.log(field);
            console.log(vm.eField);
            console.log(vm.eField.type);
            console.log(vm.eField.options);
            var isOption = !(vm.eField.type == 'TEXT' || vm.eField.type == 'TEXTAREA');
            console.log(isOption);

            if (isOption) {
                var optionList = [];
                var ol = vm.eField.options;
                for (var o in ol) {
                    optionList.push(ol[o].label + ":" + ol[o].value);
                }
                console.log(optionList);
                vm.optionText = optionList.join("\n");
                console.log(vm.optionText);
            }
        }

        function commitEdit(field) {
            vm.eField = field;

            var isOption = !(field.type == 'TEXT' || field.type == 'TEXTAREA');

            var optionArray = [];
            if (isOption) {
                console.log(vm.optionText);
                var oa = vm.optionText;
                for (var o in oa) {
                    var a = oa[o].split(":");
                    optionArray.push({
                        label: a[0],
                        value: a[1]
                    });
                }
                vm.eField.options = optionArray;

            }
            else {
            }
            console.log(vm.eField._id);
            FieldsService
                .updateField(formId, vm.eField._id, vm.eField)
                .then(init);
            vm.eField = null;
        }

    }
})();
