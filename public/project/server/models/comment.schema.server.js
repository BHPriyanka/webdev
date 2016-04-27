module.exports = function(mongoose) {
    var articleReviewSchema =  mongoose.Schema({
            newsId          : String,
            userId          : String,
            reviewDesc      : String,
            reviewDate      : {type : Date,  default: Date.now}
        },
        {collection: "project.article.review"});

    return articleReviewSchema;
};