# configuration-by-argument

Send the path to your json-file in command arguments. And yes, it's yet another configuration module.

* Easy and simple to use.
* Load different configurations based on command arguments. 
* Load multiple configuration files.
* Validate the config-file using [jsonschema](https://www.npmjs.com/package/jsonschema)

# Usage

## First install the module:

Use [npm](https://www.npmjs.com/) to install the module:

```
	npm install configuration-by-argument
```

And now for some programming :-)

## In the simplest form

Declare a new instance and load the configuration.

```javascript
	var cba = new configurationByArgument();

	var config = cba.get();
```

If you have a file named myconfig.json in the root of your directory, and your program is called load-config.js, you can start node like this:
```
	node load-config --config myconfig.json
```

## File in a sub directory

If your file is not in the root of your application, you can give a relative path to the file as an argument.

```
	node load-config --config configs/myconfig.json
```


## Double trouble

What if you have more than one configuration file?

Well, you can set the name of the parameter that contains a path to your file.

```
	node load-config --config1 one.json --configForTesting two.json
```

```javascript
	var cba;
	cba1 = new configurationByArgument({ parameterKey: "config1" });

	var config1 = cba.get();

	cba2 = new configurationByArgument({ parameterKey: "configForTesting" });

	var config2 = cba.get();
```


## Options

You can set some options on configuration-by-argument by sending them to the constructor upon initialization.

```javascript
	var cba = new configurationByArgument({}); //send your options in JSON
```

### validationSchemas

Array of JSON objects OR just a JSON object.

Default: []

Send a schema to validate the config-file against. This is done by jsonschema. See documentation [here](https://www.npmjs.com/package/jsonschema).
When sending an array of schema references, make sure that the base-schema is in position 0.

### parameterKey

String.

Default: "config"

The name of the config-parameter. If you want to send paths to more thant one config-file, you have to give the others arguments difference names.
See the example near the top for this.

### errorHandler

Function.

Override the default error handler by passing your own function in this property.

The default errorhandler looks like this:
```javascript
	function(ex) {
        throw ex;
    }
```

# Tests

Uses mocha.

To run tests on this module, make sure that the modules for the tests are installed

```
	npm install configuration-by-argument --dev
```

Then run:

```
	npm test
```

#Futher reading

Further documentation the topics according to this module:

* [jsonschema](https://www.npmjs.com/package/jsonschema).
* Google command line arguments for your environment.

#Keywords

* configuration
* config
* command arguments
* command line arguments

# License

The MIT License (MIT)

Copyright (c) 2016 Thorbjørn Gliese Jelgren (The Right Foot, www.therightfoot.dk)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

