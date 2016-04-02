/**
 * Created by BHPriyanka on 4/2/2016.
 */

var q = require("q");

module.exports = function(db, mongoose) {
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FieldModel = mongoose.model('Field', FieldSchema);

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        findFieldByFieldIdFormId: findFieldByFieldIdFormId,
        removeFieldByFieldIdFormId: removeFieldByFieldIdFormId,
        createFieldByFormId: createFieldByFormId,
        updateFieldByFormIdFieldId: updateFieldByFormIdFieldId
    };
    return api;

    function findFieldsByFormId(formId) {
        var fields = [];
        for (var f in mock) {
            if (mock[f]._id == formId) {
                return (mock[f].fields);
            }
        }
        return null;
    }

    function findFieldByFieldIdFormId(formId, fieldId) {
        var field = null;
        for (var f in mock) {
            if (mock[f]._id == formId) {
                for (var d in mock[f].fields) {
                    if (mock[f].fields[d]._id == fieldId) {
                        field = mock[f].fields[d];
                    }
                }
            }
        }
        return field;
    }

    function removeFieldByFieldIdFormId(formId, fieldId) {
        for (var f in mock) {
            if (mock[f]._id == formId) {
                for (var d in mock[f].fields) {
                    if (mock[f].fields[d]._id == fieldId) {
                        mock[f].fields.splice(d, 1);
                    }
                }
            }
        }
        return mock;
    }

    function createFieldByFormId(formId, field) {
        var new_field = {
            _id: (new Date()).getTime(),
            label: field.label,
            placeholder: field.placeholder,
            type: field.type,
            options: field.options
        };
        var form = findFormById(formId);
        form.fields.push(new_field);
    }

    function updateFieldByFormIdFieldId(formId, fieldId, newField) {
        for (var f in mock) {
            if (mock[f]._id == formId) {
                for (var d in mock[f].fields) {
                    if (mock[f].fields[d]._id == fieldId) {
                        mock[f].fields[d].label = newField.label;
                        mock[f].fields[d].type = newField.type;
                        mock[f].fields[d].placeholder = newField.placeholder;
                        mock[f].fields[d].options = newField.options;
                    }
                }
            }
        }
        return mock;
    }
}