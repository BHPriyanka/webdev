(function(){
    angular
        .module("NetNewsApp", ["ngRoute"])
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/register",{
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController"
            })
            .when("/login",{
                templateUrl: "views/login/login.view.html",
                controller: "LoginController"
            })
            .when("/profile",{
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/search",{
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/details",{
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController"
            })
            .when("/sports",{
                templateUrl: "views/sports/sports.view.html",
                controller: "SportsController"
            })
            .when("/entertainment",{
                templateUrl: "views/entertainment/entertainment.view.html",
                controller: "EntertainmentController"
            })
            .when("/travel",{
                templateUrl: "views/travel/travel.view.html",
                controller: "TravelController"
            })
            .when("/technology",{
                templateUrl: "views/technology/technology.view.html",
                controller: "TechController"
            })
            .when("/regional/uk",{
                templateUrl: "views/regional/uk/uk.view.html",
                controller: "UKController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();