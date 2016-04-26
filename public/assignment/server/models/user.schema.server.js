module.exports = function(mongoose){
    var UserSchema = mongoose.Schema({
        userName: {type: String, unique: true},
        password : String,
        firstName : String,
        lastName : String,
        emails : [String],
        phones : [String],
        roles :  [String]
    }, {collection: 'user'});

    return UserSchema;
}