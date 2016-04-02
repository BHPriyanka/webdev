module.exports = function(app, db, mongoose) {
    var userModel = require("./models/user.model.js")(app, db, mongoose);
    var formModel = require("./models/form.model.js")(app, db, mongoose);
    var fieldModel = require("./models/field.model.js")(app, db, mongoose, formModel);
    var service = require("./services/user.service.server.js")(app, userModel, formModel);
    var form_service = require("./services/forms.service.server.js")(app, userModel, formModel);
    var field_service = require("./services/field.service.server.js")(app, userModel, fieldModel, formModel);
}