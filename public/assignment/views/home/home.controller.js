(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location){
        console.log("Hello from HomeController");
    }
})();
