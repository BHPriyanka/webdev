/*jslint node: true */
"use strict";

module.exports = function(app, userModel, formModel){
    app.get("/api/assignment/form/:formId/field", findFields);
    app.delete("/api/assignment/form/:formId/field/:fieldId", removeFieldByFieldIdFormId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdFieldId);

    function findFields(req, res) {
        if (req.params.formId) {
            if (req.params.fieldId) {
                console.log("Server service - findFieldByFormIdFieldid");
                var fieldID = req.params.fieldId;
                var formId = req.params.formId;
                var field = formModel.findFieldByFieldIdFormId(formId, fieldId);
                res.json(field);
            }
            else {
                var formId = req.params.formId;
                var form = formModel.findFieldsByFormId(formId);
                res.json(form);
            }
        }
    }

    function removeFieldByFieldIdFormId(req, res){
        console.log("Server service - removeFieldByFielIdFormId " + req.params.fieldId + " " + req.params.formId);
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var fields = formModel.removeFieldByFieldIdFormId(formId,fieldId);
        res.json(fields);
    }

    function createFieldByFormId(req, res){
        var formId = req.params.formId;
        console.log("createFieldByFormId " + formId + " " + req.body);
        var forms = formModel.createFieldByFormId(formId, req.body);
        res.json(forms);
    }

    function updateFieldByFormIdFieldId(req, res){
        console.log("Server service - updateFieldByFormId" + req.params.formId + " " + req.params.fieldId);
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = formModel.updateFieldByFormIdFieldId(formId, fieldId, req.body);
        res.json(forms);
    }
}