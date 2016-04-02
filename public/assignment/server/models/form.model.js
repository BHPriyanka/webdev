/*jslint node: true */
"use strict";

//var mock = require("./form.mock.json");
var q = require("q");

module.exports = function(db, mongoose){
    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm
    };
    return api;

    //take instance object, add to collection and return the collection
    function createForm(form){
       /* var new_form = {
            _id: (new Date()).getTime(),
            userId: userID,
            title: form.title,
            fields:[]
        };
        mock.push(new_form);
        return mock;*/
        var deferred = q.defer();
        FormModel.create(
            form, function(err, doc){
            if(err){
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //return the corresponding collection
    function findAllForms(userID){
        /*var userForms = [];
        for (var f in mock) {
            if (mock[f].userId == userID) {
                userForms.push(mock[f]);
            }
         }
        return userForms;*/
        var deferred = q.defer();
        FormModel.find(
            {
                userId: userID
            },
            function (err, doc){
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
        return deferred.promise;
    }

    //take ID as an argument, find the instance object whose ID matches the given id, return the instance otherwise return null
    function findFormById(formId){
       /* var form = null;
        for (var f in mock) {
            if (mock[f]._id == formId) {
                form = mock[f];
                break;
            }
        }
        return form;*/
        var deferred = q.defer();
        FormModel.findById(formId, function(err,doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //take ID and object instance,find object instance in collection wwith ID match, update the object instance values
    function updateForm(formId, newForm){
     /*   for (var f in mock) {
         if (mock[f]._id == formId) {
            mock[f].title = newForm.title;
            mock[f].userId = newForm.userId;
         }
        }
        return mock[f];*/
        var deferred = q.defer();
        FormModel.findByIdAndUpdate(formId, newForm, function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //accept ID, and remove based on ID
    function deleteForm(formId){
     /*   for (var f in mock) {
         if (mock[f]._id == formId) {
             mock.splice(f, 1);
         }
        }
        return mock;*/
        var deferred = q.defer();
        FormModel.findByIdAndRemove(formId, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //returns a single form whose title matches, null otherwise
    function findFormByTitle(formTitle){
        /*var form = null;
        for (var f in mock) {
            if (mock[f].title == formTitle) {
                form = mock[f];
                break;
            }
        }
        return form;*/
        var deferred = q.defer();
        FormModel.findOne(
            {
                title: formTitle
            },
            function(err,doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
}