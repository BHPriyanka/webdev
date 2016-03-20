module.exports = function(app, userModel, formModel){
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdFormId);
    app.post("/api/assignment/form/:formId/field", createFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    function findFieldsByFormId(req, res){

    }

    function findFieldByFieldIdFormId(req, res){

    }

    function deleteFieldByFieldIdFormId(req, res){

    }

    function createFieldById(req, res){

    }

    function updateFieldById(req, res){

    }
}