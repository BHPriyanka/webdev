module.exports = function(app, model){
    app.get("/api/assignment/user/:userId/form", findAllForms);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.get("/api/assignment/form?title=title", findFormByTitle);
}