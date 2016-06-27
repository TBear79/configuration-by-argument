'use strict'
const minimist = require('minimist')
const fs = require('fs');
const util = require('util');
const jsonschema = require('jsonschema');

class ErrorHelper {
    static defaultError(ex) {
        throw ex;
    }
}

class jsonHelper {
    static parseValue(key, value) {
        if (value === 'true') {
            return true;
        }

        if (value === 'false') {
            return false;
        }

        return value;
    }
}
class Configuration {
    constructor(options) {
        if (!options)
            options = {};

        this.validationSchemas = options.validationSchemas || [];
        this.parameterKey = options.parameterKey || 'config';
        this.errorHandler = options.errorHandler || ErrorHelper.defaultError;

        this._configuration = null;
    }

    set(configuration) {
        const t = this;
        try {
            if (!configuration) {
                const parseArgs = minimist(process.argv);
                configuration = fs.readFileSync(parseArgs[t.parameterKey]).toString();
            }

            if (typeof configuration == "string")
                configuration = JSON.parse(configuration, jsonHelper.parseValue);

            t.validate(configuration);

            this._configuration = configuration;
        } catch (ex) {
            t.errorHandler(ex);
        }
    }

    get() {
        const t = this;

        try {
            if (t._configuration == null)
                t.set();

            return t._configuration;
        } catch (ex) {
            t.errorHandler(ex);
        }
    }



    validate(configuration) {
        const t = this;

        try {
            const v = new jsonschema.Validator();
            let baseSchema;
            let isFirst = true;

            if (t.validationSchemas.length) {
                for (let key in t.validationSchemas) {
                    let schema = t.validationSchemas[key];
                    if (isFirst) {
                        baseSchema = schema;
                        isFirst = false;
                    } else {
                        v.addSchema(schema, schema.id);
                    }
                }

            } else {
                baseSchema = t.validationSchemas;
            }

            if (baseSchema) {
                const validationResult = v.validate(configuration, baseSchema);

                if (validationResult.errors.length != 0)
                    throw "Configuration validation error " + util.inspect(validationResult.errors);
            }
        } catch (ex) {
            t.errorHandler(ex);
        }
    }
}

module.exports = Configuration;
