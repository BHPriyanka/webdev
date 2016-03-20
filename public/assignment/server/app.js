module.exports = function(app) {
    var userModel = require("./models/user.model.js")(app);
    var formModel = require("./models/form.model.js")(app);
    var service = require("./services/user.service.server.js")(app, userModel, formModel);
    var form_service = require("./services/forms.service.server.js")(app, userModel, formModel);
    var field_service = require("./services/field.service.server.js")(app, userModel, formModel);
}