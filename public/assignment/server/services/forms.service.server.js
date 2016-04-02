/*jslint node: true */
"use strict";

module.exports = function(app, formModel){
    app.get("/api/assignment/user/:userId/form", findAllForms);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function findAllForms(req,res){
        var forms = formModel.findAllForms(req.params.userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createForm(req, res){
        var form = req.body;
        form.userId = req.params.userId;
        formModel.createForm(form)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res){
        var formId = req.params.formId;
        var form = formModel.findFormById(formId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateForm(req, res){
        var formId = req.params.formId;
        var newForm = req.body;
        newForm = formModel.updateForm(formId, newForm)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res){
        var mock = formModel.deleteForm(req.params.formId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

}