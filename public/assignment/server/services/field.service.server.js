/*jslint node: true */
"use strict";

module.exports = function(app, formModel, fieldModel){
    app.get("/api/assignment/form/:formId/field", findFields);
    app.delete("/api/assignment/form/:formId/field/:fieldId", removeFieldByFieldIdFormId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdFieldId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);

    function findFields(req, res) {
        var formId = req.params.formId;
        fieldModel.findFieldsByFormId(formId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getFieldById(req,res) {
        /*var formId = req.params.formId;
        var fieldId = req.params.formId;
        var field = fieldModel.findFieldsByFormId(formId)
                    .then(
                        function(doc){
                            res.json(doc);
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    );*/
            }

    function removeFieldByFieldIdFormId(req, res){
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        fieldModel.removeFieldByFieldIdFormId(formId, fieldId)
            .then(
                function(doc){
                    res.json(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createFieldByFormId(req, res){
        var formId = req.params.formId;
        fieldModel.createFieldByFormId(formId, req.body)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldByFormIdFieldId(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.updateFieldByFormIdFieldId(formId, fieldId, req.body)
            .then(
                function(doc){
                    res.json(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
}