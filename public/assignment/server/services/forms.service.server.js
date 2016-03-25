/*jslint node: true */
"use strict";

module.exports = function(app, userModel, formModel){
    app.get("/api/assignment/user/:userId/form", findAllForms);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function findAllForms(req,res){
        var forms = formModel.findAllForms(req.params.userId);
        res.json(forms);
    }

    function createForm(req, res){
        var form = formModel.createForm(req.params.userId, req.body);
        res.json(form);
    }

    function findFormById(req, res){
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function updateForm(req, res){
        var formId = req.params.formId;
        var newForm = req.body;
        newForm = formModel.updateForm(formId, newForm);
        res.json(newForm);
    }

    function deleteFormById(req, res){
        var mock = formModel.deleteForm(req.params.formId);
        res.json(mock);
    }

}