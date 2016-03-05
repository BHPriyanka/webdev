(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location){
        console.log("Hello from FormController");
    }
})();
