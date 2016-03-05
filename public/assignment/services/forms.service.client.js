(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope) {
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo", "userId": 123},
                {"_id": "020", "title": "CDs", "userId": 234}],

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormByTitle: findFormByTitle

        };

        return model;

        function createFormForUser(userId, form, callback) {
            var new_form = {
                _id: (new Date()).getTime(),
                userId: userId
            };
            model.forms.push(new_form);
            callback(new_form);

        }

        function findFormByTitle(formTitle) {
            var form = null;
            for (var f in model.forms) {
                if (model.forms[f].title == formTitle) {
                    form = model.forms[f];
                    break;
                }
            }
            return form;
        }

        function findAllFormsForUser(userId, callback) {

            for (var f in model.forms) {
                if (model.forms[f].userId === userId) {
                    callback(model.forms[f]);
                }
            }
            callback(null);
        }

        function deleteFormById(formId, callback) {
            for (var f in model.forms) {
                if (model.forms[f]._id === formId) {
                    model.forms.splice(f, 1);
                    break;
                }
            }
            callback(model.forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var f in model.forms) {
                if (model.forms[f]._id == formId) {
                    model.forms[f].title = newForm.title;
                    model.forms[f].userId = newForm.userId;
                    callback(model.forms[f]);
                    break;
                }
            }
        }
    }
})();