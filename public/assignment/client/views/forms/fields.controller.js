/*jslint node: true */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldsService, FormService, $routeParams, $route, $location) {
        var vm = this;
        vm.ok_field = null;
        vm.edit_field = null;
        vm.fields = null;
        vm.editField = editField;
        vm.okEdit = okEdit;
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
            vm.ok_field = null;
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
            vm.ok_field = null;
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
            vm.edit_field = field;
            console.log(field);
            console.log(vm.edit_field);
            console.log(vm.edit_field.type);
            console.log(vm.edit_field.options);
            var isOption;
            if(vm.edit_field.type == 'TEXT' || vm.edit_field.type == 'TEXTAREA'){
                isOption = true;
            }
            else{
                isOption = false;
            }
            console.log(isOption);

            if (!isOption) {
                var optionList = [];
                var list = vm.edit_field.options;
                for (var o in list) {
                    optionList.push(list[o].label + ":" + list[o].value);
                }
                console.log(optionList);
                vm.optionText = optionList.join("\n");
                console.log(vm.optionText);
            }
        }

        function okEdit(field) {
            vm.edit_field = field;

            var isOption;
            if(vm.edit_field.type == 'TEXT' || vm.edit_field.type == 'TEXTAREA'){
                isOption = true;
            }
            else{
                isOption = false;
            }
            console.log(isOption);

            var optionArray = [];
            if (!isOption) {
                console.log(vm.optionText);
                var op = vm.optionText;
                for (var o in op) {
                    var a = op[o].split(":");
                    optionArray.push({
                        label: a[0],
                        value: a[1]
                    });
                }
                vm.edit_field.options = optionArray;

            }
            else {
            }
            console.log(vm.edit_field._id);
            FieldsService
                .updateField(formId, vm.edit_field._id, vm.edit_field)
                .then(init);
            vm.edit_field = null;
        }

    }
})();
