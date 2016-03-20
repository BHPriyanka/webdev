/*jslint node: true */
"use strict";

module.exports = function(app, userModel, formModel){
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdFormId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdFieldId);

    function findFieldsByFormId(req, res){
        var formId = req.params.formId;
        var form = formModel.findFieldsByFormId(formId);
        res.json(form);
    }

    function findFieldByFieldIdFormId(req, res){
        var fieldID = req.params.fieldId;
        var formId = req.params.formId;
        var field = formModel.findFieldByFieldIdFormId(formId,fieldId);
        res.json(field);
    }

    function deleteFieldByFieldIdFormId(req, res){
        var fieldID = req.params.fieldId;
        var formId = req.params.formId;
        var fields = formModel.deleteFieldByFieldIdFormId(formId,fieldId);
        res.json(fields);
    }

    function createFieldByFormId(req, res){
        var formId = req.params.formId;
        var forms = formModel.createFieldByFormId(formId);
        res.json(forms);
    }

    function updateFieldByFormIdFieldId(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = formModel.updateFieldByFormIdFieldId(formId, fieldId);
        res.json(forms);
    }
}