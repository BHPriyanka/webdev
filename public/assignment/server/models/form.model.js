var mock = require("./form.mock.json");
module.exports = function(app){

    var api = {
        CreateForm: CrCreateFormeate,
        FindAllForms: FindAllForms,
        FindFormById: FindFormById,
        UpdateForm: UpdateForm,
        DeleteForm: DeleteForm,
        findFormByTitle: findFormByTitle
    };
    return api;

    //take instance object, add to collection and return the collection
    function CreateForm(){

    }

    //return the corresponding collection
    function FindAllForms(){

    }

    //take ID as an argument, find the instance object whose ID matches the given id, return the instance otherwise return null
    function FindFormById(){

    }

    //take ID and object instance,find object instance in collection wwith ID match, update the object instance values
    function UpdateForm(){

    }

    //accept ID, and remove based on ID
    function DeleteForm(){

    }

    //returns a single form whose title matches, null otherwise
    function findFormByTitle(title){

    }
}