/*jslint node: true */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldsService, FormService, $routeParams, $route, $location, $scope) {
        var vm = this;
        vm.ok_field = null;
        vm.edit_field = null;
        vm.fields = null;
        vm.editField = editField;
        vm.okEdit = okEdit;
        vm.removeField = removeField;
        vm.addField = addField;
        vm.reorder = reorder;
        vm.opText = null;

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
            vm.display = response.data;
            vm.fields = response.data;
        }

        function init(){
           FieldsService
                .getFieldsForForm(formId)
                .then(show);
            FormService
                .findFormById(formId)
                .then(function (response)
                {
                    vm.form = response.data;
                })
        }
        init();

        function reorder() {
            vm.form.fields = vm.fields;
            FormService
                .updateFormById(formId, vm.form)
                .then(init);
        }

        function removeField(field) {
            vm.ok_field = null;
            FieldsService
                .removeFieldFromForm(formId, field._id)
                .then(init);
        }

        function translateFieldType(fieldType) {
            for (var k in optionMap) {
                if (optionMap[k].key == fieldType){
                    return optionMap[k].value;
                }
            }
        }

        function addField(fieldType) {
            var placeholder;
            var ops;

            if(translateFieldType(fieldType) === "CHECKBOXES"){
                ops = [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];
                placeholder = "";
            }
            else if(translateFieldType(fieldType) === "RADIOS"){
                ops = [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];
                placeholder = "";
            }
            else if(translateFieldType(fieldType) === "OPTIONS"){
                ops = [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ];
                placeholder = "";
            }
            else{
                ops=[];
                placeholder = "New Field";
            }

            var field = {"label": "New " + fieldType, "type": translateFieldType(fieldType),
                "placeholder": placeholder, "options": ops};
            FieldsService
                .createFieldForForm(formId, field)
                .then(init);
        }


        function editField(field) {
            vm.edit_field = field;
            var isOption;
            if(vm.edit_field.type == 'TEXT' || vm.edit_field.type == 'TEXTAREA'){
                isOption = false;
            }
            else{
                isOption = true;
            }

            if (isOption) {
                var opList = [];
                var list = vm.edit_field.options;
                for (var o in list) {
                    opList.push(list[o].label + ":" + list[o].value);
                }
                vm.opText = opList.join("\n");
            }
        }

        function okEdit(field) {
            vm.edit_field = field;

            var isOption;
            if(field.type == 'TEXT' || field.type == 'TEXTAREA'){
                isOption = false;
            }
            else{
                isOption = true;
            }

            var optionArray = [];
            if (isOption) {
                var op = vm.opText;
                for (var o in op) {
                    var a = op[o].split(":");
                    optionArray.push({
                        label: a[0],
                        value: a[1]
                    });
                }
                vm.edit_field.options = optionArray;
            }

            FieldsService
                .updateField(formId, vm.edit_field._id, vm.edit_field)
                .then(init);
            vm.edit_field = null;
        }

    }
})();
