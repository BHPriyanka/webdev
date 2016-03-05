(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope, $location){
        console.log("Hello from FieldsController");
    }
})();
