module.exports = function(app) {
    var userModel = require("./models/user.model.js")(app);
    var newsModel = require("./models/news.model.js")(app);
   // var formModel = require("./models/form.model.js")(app);
    var user_service = require("./services/user.service.server.js")(app, userModel);
    /*var entertain_service = require("./services/entertain.service.server.js")(app, userModel);
    var news_service = require("./services/newsapi.service.server.js")(app, userModel);
    var sports_service = require("./services/sportsapi.service.server.js")(app, userModel);
    var tech_service = require("./services/techapi.service.server.js")(app, userModel);*/
    var travel_service = require("./services/travelapi.service.server.js")(app, newsModel);
    //var uk_service = require("./services/ukapi.service.server.js")(app, userModel);
}