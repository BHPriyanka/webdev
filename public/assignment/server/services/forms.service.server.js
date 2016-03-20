module.exports = function(app, userModel, formModel){
    app.get("/api/assignment/user/:userId/form", findAllForms);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.get("/api/assignment/form?title=title", findFormByTitle);

    function findAllForms(req,res){
        var forms = formModel.findAllFormsForUser(req.params.userId);
        res.json(forms);
    }

    function createForm(req, res){
        var form = formModel.createFormForUser(req.params.userId, req.query.form);
        res.json(form);
    }

    function findFormById(req, res){
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function updateFormById(req, res){
        var formId = req.params.formId;
        var newForm = req.query.form;
        formModel.updateFormById(formId, newForm);
        res.json(newForm);
    }

    function deleteFormById(req, res){
        var mock = formModel.deleteFormById(req.params.formId);
        res.json(mock);
    }

    function findFormByTitle(req, res){
        var form = formModel.findFormByTitle(req.params.title);
        res.json(form);
    }
}