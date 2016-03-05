(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope){
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo", "userId": 123},
                {"_id": "020", "title": "CDs", "userId": 234}],

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById

        };

        return model;

        function createFormForUser(userId, form, callback){
            var new_form = {
                _id: form._id,
                title: form.title,
                userId: userId
            };
            model.users.push(new_form);
            callback(new_form);

        }

        function findAllFormsForUser(userId, callback){
            for (var f in model.forms) {
                if (model.forms[f]._id === userId) {
                    callback(model.forms[f]);
                }
            }
            callback(null);
        }

        function deleteFormById(formId, callback){
            for (var f in model.forms) {
                if (model.forms[f]._id === formId) {

                }
            }
            callback(model.forms);
        }

        function updateFormById(formId, newForm, callback){
            var form = model.findAllFormsForUser(formID, callback);
            if (form != null) {
                form.title = newForm.title;
                form.userId = newForm.userId;
                callback(form);
            } else {
                callback(null);
            }
        }
    }
})();