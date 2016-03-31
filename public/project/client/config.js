(function(){
    angular
        .module("NetNewsApp", ["ngRoute"])
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login",{
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/search",{
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/details",{
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model"
            })
            .when("/sports",{
                templateUrl: "views/sports/sports.view.html",
                controller: "SportsController",
                controllerAs: "model"
            })
            .when("/entertainment",{
                templateUrl: "views/entertainment/entertainment.view.html",
                controller: "EntertainmentController",
                controllerAs: "model"
            })
            .when("/travel",{
                templateUrl: "views/travel/travel.view.html",
                controller: "TravelController",
                controllerAs: "model"
            })
            .when("/technology",{
                templateUrl: "views/technology/technology.view.html",
                controller: "TechController",
                controllerAs: "model"
            })
            .when("/regional/uk",{
                templateUrl: "views/regional/uk/uk.view.html",
                controller: "UKController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();