module.exports = function(app, model){
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdFormId);
    app.post("/api/assignment/form/:formId/field", createFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);
}