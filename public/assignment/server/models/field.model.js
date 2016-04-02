/**
 * Created by BHPriyanka on 4/2/2016.
 */

var q = require("q");

module.exports = function(db, mongoose) {
    var formSchema = require("./form.schema.server.js")(mongoose);
    var form = mongoose.model('FormModel', formSchema);

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        findFieldByFieldIdFormId: findFieldByFieldIdFormId,
        removeFieldByFieldIdFormId: removeFieldByFieldIdFormId,
        createFieldByFormId: createFieldByFormId,
        updateFieldByFormIdFieldId: updateFieldByFormIdFieldId
    };
    return api;

    function findFieldsByFormId(formID) {
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