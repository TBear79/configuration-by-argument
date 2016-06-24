'use strict'
const minimist = require('minimist')
const fs = require('fs');
const util = require('util');

class ErrorHelper{
	static defaultError(ex){
		throw ex;
	}
}

class jsonHelper{
	static parseValue(key, value){
		if (value === 'true') {
		    return true;
		}
		
		if (value === 'false') {
		    return false;
		}

		return value;
	}
}
class Configuration{
	constructor(options){
		if(!options)
			options = {};
		
		this.required = options.required || [];
		this.errorHandler = options.errorHandler || ErrorHelper.defaultError; 

		this._configuration = null;
	}

	set(configuration){
		const t = this;
		try{
			if(!configuration){
				const parseArgs = minimist(process.argv);
				const fileRead = fs.readFileSync(parseArgs.config);
		        configuration = JSON.parse(fileRead, jsonHelper.parseValue);
			}

			for(let key in t.required){
				const value = t.required[key];
				
				if(!configuration[value]){
					throw `"${value}" was not provided`;
				}
			}

			if(!configuration.folderToMonitor)   
	        
	        this._configuration = configuration;
        }
      	catch(ex){
      		t.errorHandler(ex);
      	}
	}

  	get(){
  		const t = this;

    	try{    
	      	if(t._configuration == null)
	        	t.set();

	        return t._configuration;
      	}
      	catch(ex){
      		t.errorHandler(ex);
      	}
	}


}

module.exports = Configuration;