var mock = require("./form.mock.json");
module.exports = function(app){

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle
    };
    return api;

    //take instance object, add to collection and return the collection
    function createForm(userID, form){
        var new_form = {
            _id: (new Date()).getTime(),
            userId: userId,
            title:form.title
        };
        mock.push(new_form);
        return mock;
    }

    //return the corresponding collection
    function findAllForms(userID){
        var userForms =[];
        for (var f in mock) {
            if (mock[f].userId === userId) {
                userForms.push(mock[f]);
            }
         }
        return userForms;
    }

    //take ID as an argument, find the instance object whose ID matches the given id, return the instance otherwise return null
    function findFormById(formId){
        var form = null;
        for (var f in mock) {
            if (mock[f]._id == formId) {
                form = mock[f];
                break;
            }
        }
        return form;
    }

    //take ID and object instance,find object instance in collection wwith ID match, update the object instance values
    function updateForm(formId, newForm){
        for (var f in mock) {
         if (mock[f]._id == formId) {
            mock[f].title = newForm.title;
            mock[f].userId = newForm.userId;
            break;
         }
        }
        return mock;
    }

    //accept ID, and remove based on ID
    function deleteForm(formId){
        for (var f in mock) {
         if (mock[f]._id === formId) {
             mock.splice(f, 1);
             break;
         }
        }
        return mock;
    }

    //returns a single form whose title matches, null otherwise
    function findFormByTitle(formTitle){
        var form = null;
        for (var f in mock) {
            if (mock[f].title == formTitle) {
                form = mock[f];
                break;
            }
        }
        return form;
    }
}