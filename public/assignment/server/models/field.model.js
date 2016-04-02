/**
 * Created by BHPriyanka on 4/2/2016.
 */

var q = require("q");

module.exports = function(db, mongoose, formModel) {
    var fieldSchema = require("./field.schema.server.js")(mongoose);
    var fieldModel = mongoose.model('Field', fieldSchema);
    var formModel = require('mongoose').model('Form');

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        findFieldByFieldIdFormId: findFieldByFieldIdFormId,
        removeFieldByFieldIdFormId: removeFieldByFieldIdFormId,
        createFieldByFormId: createFieldByFormId,
        updateFieldByFormIdFieldId: updateFieldByFormIdFieldId
    };
    return api;

    function findFieldsByFormId() {
        /*var fields = [];
         for (var f in mock) {
         if (mock[f]._id == formId) {
         return (mock[f].fields);
         }
         }
         return null;*/
        var deferred = q.defer();
        fieldModel.find(
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findFieldByFieldIdFormId(fieldId) {
        /*var field = null;
         for (var f in mock) {
         if (mock[f]._id == formId) {
         for (var d in mock[f].fields) {
         if (mock[f].fields[d]._id == fieldId) {
         field = mock[f].fields[d];
         }
         }
         }
         }
         return field;*/
        var deferred = q.defer();
        fieldModel.findById(fieldId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function removeFieldByFieldIdFormId(fieldId) {
        /*for (var f in mock) {
         if (mock[f]._id == formId) {
         for (var d in mock[f].fields) {
         if (mock[f].fields[d]._id == fieldId) {
         mock[f].fields.splice(d, 1);
         }
         }
         }
         }
         return mock;*/
        var deferred = q.defer();
        fieldModel.findByIdAndRemove(fieldId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createFieldByFormId(field) {
        /*var new_field = {
         _id: (new Date()).getTime(),
         label: field.label,
         placeholder: field.placeholder,
         type: field.type,
         options: field.options
         };
         var form = formModel.findFormById(formId);
         form.fields.push(new_field);*/
        var deferred = q.defer();
        fieldModel.create(field, function (err, doc) {
            if (err) {
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateFieldByFormIdFieldId(fieldId, newField) {
        /* for (var f in mock) {
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
         }*/
        var deferred = q.defer();
        fieldModel.findByIdAndUpdate(fieldId, newField, function (err, doc) {
            if (err) {
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}