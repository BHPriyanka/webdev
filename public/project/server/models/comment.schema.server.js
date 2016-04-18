module.exports = function(mongoose){

    var CommentSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            default: 'TEXTAREA'
        },
        placeholder: String,
        options: []
    }, {collection: 'comment'});

    return CommentSchema;
}