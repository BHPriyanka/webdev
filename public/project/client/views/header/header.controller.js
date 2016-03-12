(function() {
    angular
        .module("NetNewsApp")
        .controller("HeaderController", headerController);

    function headerController($location, $scope, UserService, $rootScope, SportsService) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
            $location.url('/home');
        }

        var months = ['January','February','March','April','May','June','July',
            'August','September','October','November','December'];
        var today = new Date();
       // today.setTime(today.getTime() + (1000*3600*24));
        document.getElementById("spanDate").innerHTML = months[today.getMonth()] + " " + today.getDate()+ ", " + today.getFullYear()+": " +today.getHours()+":"+today.getMinutes();

    }
})();
