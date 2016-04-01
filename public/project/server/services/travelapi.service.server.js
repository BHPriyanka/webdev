/*jslint node: true */
"use strict";
module.exports = function(app, newsModel) {
    app.get("api/project/travel", travelResults);

    function travelResults(req, res){
        console.log("server travelResults : ");
        var title = req.body;
        var news = NewsModel.findNewsByTopic(title);
        res.json(200);
    }
}