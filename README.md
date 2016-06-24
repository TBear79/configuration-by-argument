# configuration-by-argument

Send the path to your json-file in command arguments. And yes, it's yet another configuration module.

* Easy and simple to use.
* Load different configurations for different environments. 
* Load multiple configuration files.

# Usage

## Always do this:

Use [npm](https://www.npmjs.com/) to install the module:

```
	npm install configuration-by-argument
```

Then use `require()` to load it in your code:

```javascript
	var configurationByArgument = require('configuration-by-argument');
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

If you file is not in the root of your application, you can give a relative path to the file as an argument.

```
	node load-config --config configs/myconfig.json
```


## Double trouble

What if you have more than one configuration file?

Well, you can set the name of the parameter that contains a path to you file.

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

## Just set that configuration... please

If you have loaded a configuration from another source you can load it directly into configuration-by-argument like this.

```javascript
	var configIn = '{ "myProp": "OK" }';
			
	var cba = new configurationByArgument();
	cba.set(configIn);
	var config = cba.get();
```

"Now, why would I do that? It will just return the same object as the one I provided".

True, but if it's a string, you will get it back as an object.
Okay, weak a point there... You could just use JSON.parse.

BUT it enables you to make use of the "required"-attribute. That's will allow the module to throw an error if a certain property doesn't exist.

## Options

You can set some options on configuration-by-argument by sending them to the constructor upon initialization.

```javascript
	var cba = new configurationByArgument({}); //send your options in JSON
```

### required

Array of strings

Default: []

Sets the minimum required level for sending the log to RabbitMQ. You can find the levels [here](https://www.npmjs.com/package/winston#logging-levels).

### parameterKey

### errorHandler


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

* [Winston](https://www.npmjs.com/package/winston)
* [RabbitMQ](https://www.rabbitmq.com/documentation.html) [Tutorial](https://www.rabbitmq.com/getstarted.html)
* [amqplib](https://www.npmjs.com/package/amqplib)
* [rabbit-chatter](https://www.npmjs.com/package/rabbit-chatter)

#Keywords

* configuration
* config
* command arguments


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

