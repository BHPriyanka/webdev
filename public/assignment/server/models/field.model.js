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
      /*  var deferred = q.defer();
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
        return deferred.promise;*/
    }

    function removeFieldByFieldIdFormId(formID, fieldID) {
        var deferred = q.defer();
        form.findById(formID)
            .then(
            function (doc) {
                doc.fields.id(fieldID).remove();
                doc.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc);
                    }
                });
            },
            function (err) {
                res.status(400).send(err);
            }
        );
        return deferred.promise;
    }

    function createFieldByFormId(formID, field) {
        var deferred = q.defer();
        form.findById(formID).then(
            function (doc) {
                doc.fields.push(field);
                doc.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc);
                    }
                });
            },
            function (err) {
                res.status(400).send(err);
            }
        );
        return deferred.promise;

    }

    function updateFieldByFormIdFieldId(formID, fieldID, field) {
        var deferred = q.defer();
        form.findById(formID)
            .then(
            function (doc) {
                var newField = doc.fields.id(fieldID);
                newField.label = field.label;
                newField.placeholder = field.placeholder;
                newField.type = field.type;
                newField.options = field.options;
                doc.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc);
                    }
                });
            },
            function (err) {
                res.status(400).send(err);
            }
        );
        return deferred.promise;
    }
}