module.exports = function(mongoose){
    var UserSchema = mongoose.Schema({
        userName: String,
        password : String,
        firstName : String,
        lastName : String,
        emails : [String],
        phones : [String],
        roles :  [String]
    }, {collection: 'user'});

    return UserSchema;
}