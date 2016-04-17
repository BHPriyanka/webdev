
module.exports = function(mongoose){
    var NewsSchema = require("./news.schema.server.js")(mongoose);

    var NewsUserSchema = mongoose.Schema({
        userName: String,
        password : String,
        firstName : String,
        lastName : String,
        emails : [String],
        phones : [String],
        roles :  [String],
        likes: [String],
        likesArticles: [NewsSchema]
    }, {collection: 'project.news.user'});

    return NewsUserSchema;
}