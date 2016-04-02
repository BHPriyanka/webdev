/**
 * Created by BHPriyanka on 4/2/2016.
 */

var q = require("q");

module.exports = function(db, mongoose) {
    var formSchema = require("./form.schema.server.js")(mongoose);
    var form = mongoose.model('FormModel', formSchema);
    //var FormModel = formModel.getMongooseModel();

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        findFieldByFieldIdFormId: findFieldByFieldIdFormId,
        removeFieldByFieldIdFormId: removeFieldByFieldIdFormId,
        createFieldByFormId: createFieldByFormId,
        updateFieldByFormIdFieldId: updateFieldByFormIdFieldId
    };
    return api;

    function findFieldsByFormId(formID) {
        /*var fields = [];
         for (var f in mock) {
         if (mock[f]._id == formId) {
         return (mock[f].fields);
         }
         }
         return null;*/
        var deferred = q.defer();
        form.findById(formID, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc.fields);
            }
        });
        return deferred.promise;
    }

    function findFieldByFieldIdFormId(formID, fieldId) {
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
        form.findById(formID, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var f in doc.fields){
                    if (doc.fields[f]._id == fieldId){
                        deferred.resolve(doc.fields[f]);
                    }
                }
            }
            });
        return deferred.promise;
    }

    function removeFieldByFieldIdFormId(formID, fieldID) {
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
        form.findById(formID, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var f in doc.fields){
                    if (doc.fields[f]._id == fieldID){
                        doc.fields.splice(doc.fields.indexOf(doc.fields[f]),1);
                    }
                }
                doc.save(function(err,doc){
                    if (err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createFieldByFormId(formID, field) {
        var deferred = q.defer();
        form.findById(formID, function (err, doc) {
            //reject promise if err
            if (err) {
                deferred.reject(err);
            } else {
                //add field to fields of form
                doc.fields.push(field);

                //save form
                doc.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        // resolve the doc
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateFieldByFormIdFieldId(formID, fieldID, newField) {
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
        form.findById(formID, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var f in doc.fields){
                    if (doc.fields[f]._id == fieldID){
                        doc.fields[f] = newField;
                    }
                }
                doc.save(function(err,doc){
                    if (err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }
}