module.exports = function(app, userModel, formModel){
    app.get("/api/assignment/user/:userId/form", findAllForms);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.get("/api/assignment/form?title=title", findFormByTitle);

    function findAllForms(req,res){
        var forms = formModel.findAllFormsForUser(req.query.user._id);
        res.json(forms);
    }

    function createForm(req, res){
        var form = formModel.createFormForUser(req.query.user._id);
        res.json(form);
    }

    function findFormById(req, res){
        var userId = req.params.userId;
        var form = formModel.findFormById(userId);
        res.json(form);
    }

    function updateFormById(req, res){
        var formId = req.params.userId;
        var newForm = req.params.form.id;
        formModel.updateFormById(formId, newForm);
        res.json(newForm);
    }

    function deleteFormById(req, res){
        var mock = formModel.deleteFormById(req.params.form.id);
        res.json(mock);
    }

    function findFormByTitle(req, res){
        var form = formModel.findFormByTitle(req.params.form.title);
        res.json(form);
    }
}