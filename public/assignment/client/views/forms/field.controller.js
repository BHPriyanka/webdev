/*jslint node: true */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $location){
        console.log("Hello from FieldsController");
        var vm = this;
        vm.addField = addField;

        function addField(fieldType){

        }
    }
})();
