/*jslint node: true */
"use strict";

var mock = require("./form.mock.json");
module.exports = function(){

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFieldsByFormId: findFieldsByFormId,
        findFieldByFieldIdFormId: findFieldByFieldIdFormId,
        removeFieldByFieldIdFormId: removeFieldByFieldIdFormId,
        createFieldByFormId: createFieldByFormId,
        updateFieldByFormIdFieldId: updateFieldByFormIdFieldId
    };
    return api;

    //take instance object, add to collection and return the collection
    function createForm(userID, form){
        var new_form = {
            _id: (new Date()).getTime(),
            userId: userID,
            title: form.title,
            fields:[]
        };
        mock.push(new_form);
        return mock;
    }

    //return the corresponding collection
    function findAllForms(userID){
        var userForms = [];
        for (var f in mock) {
            if (mock[f].userId == userID) {
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
         }
        }
        return mock[f];
    }

    //accept ID, and remove based on ID
    function deleteForm(formId){
        for (var f in mock) {
         if (mock[f]._id == formId) {
             mock.splice(f, 1);
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

    function findFieldsByFormId(formId){
        var fields = [];
        for(var f in mock){
            if(mock[f]._id == formId){
                return (mock[f].fields);
            }
        }
        return null;
    }

    function findFieldByFieldIdFormId(formId, fieldId) {
        var field = null;
        for (var f in mock) {
            if (mock[f]._id == formId) {
                for (var d in mock[f].fields) {
                    if(mock[f].fields[d]._id == fieldId)
                    {
                        field = mock[f].fields[d];
                    }
                }
            }
        }
        return field;
    }

    function removeFieldByFieldIdFormId(formId, fieldId) {
        for(var f in mock) {
            if (mock[f]._id == formId) {
                for (var d in mock[f].fields) {
                    if (mock[f].fields[d]._id == fieldId) {
                        mock[f].fields.splice(d, 1);
                    }
                }
            }
        }
        return mock;
    }

    function createFieldByFormId(formId, field){
        var new_field = {
            _id: (new Date()).getTime(),
            label: field.label,
            placeholder:field.placeholder,
            type:field.type,
            options: field.options
        };
        var form = findFormById(formId);
        form.fields.push(new_field);
    }

    function updateFieldByFormIdFieldId(formId, fieldId, newField) {
        for (var f in mock) {
            if (mock[f]._id == formId) {
                for (var d in mock[f].fields) {
                    if (mock[f].fields[d]._id == fieldId) {
                        mock[f].fields[d].label = newField.label;
                        mock[f].fields[d].type = newField.type;
                        mock[f].fields[d].placeholder = newField.placeholder;
                        mock[f].fields[d].options = newField.options;
                    }
                }
            }
        }
        return mock;
    }
}