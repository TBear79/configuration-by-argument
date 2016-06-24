//Mocha

'use strict'

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const sinon = require('sinon');
const util = require('util');

const configurationByArgument = require('../lib/configuration-by-argument.js');

describe('Configuration with args', () => {
	describe('Test if configuration is set', () => {
		it('should return the configuration based on the input parameter',  (done) => {
			const cba = new configurationByArgument();
			const config = cba.get();

			expect(config).to.be.not.null;
			expect(config.testString).to.equal("OK");
			expect(config.testNumber).to.equal(100);
			expect(config.testBoolTrue).to.be.true;
			expect(config.testBoolFalse).to.be.false;
			expect(config.testArray).to.be.array;
			expect(config.testArray.length).to.equal(3);
			done();
		});

		it('should return the configuration when required is fulfilled on a deeper level',  (done) => {
			const requiredPropName = 'lvl1.lvl2.findme';
			const cba = new configurationByArgument({ required: [requiredPropName]});
			const config = cba.get();
			expect(config).to.be.not.null;
			expect(config.lvl1.lvl2.findme).to.equal("you found me");

			done();
		});

		it('should throw error if required attribute is not present',  (done) => {
			const requiredPropName = 'testRequiredAttr';
			const cba = new configurationByArgument({ required: [requiredPropName]});
	
			chai.expect(cba.get.bind(cba)).to.throw(`"${requiredPropName}" was not provided`);

			done();
		});

		it('should throw error if required attribute is not present on a deeper level',  (done) => {
			const requiredPropName = 'lvl1.lvl2.findme';
			const cba = new configurationByArgument({ required: [requiredPropName]});
	
			chai.expect(cba.get.bind(cba)).to.throw(`"${requiredPropName}" was not provided`);

			done();
		});

		it('should call custom error handler',  (done) => {
			const customErrorHandler = sinon.stub();
			const requiredPropName = 'testRequiredAttr';

			const cba = new configurationByArgument({ required: [requiredPropName], errorHandler: customErrorHandler});
			
			cba.get();

			chai.expect(customErrorHandler.calledOnce).to.be.true;

			done();
		});

		it('should load two config files and give the correct configuration for each file',  (done) => {
			const cba = new configurationByArgument();
			const config1 = cba.get();

			const cba2 = new configurationByArgument({ parameterKey: "config2" });
			const config2 = cba2.get();

			expect(config1).to.be.not.null;
			expect(config1.testString).to.equal("OK");

			expect(config2).to.be.not.null;
			expect(config2.testString2).to.equal("OK");

			done();
		});
	})
});

describe('Configuration no args', () => {
	describe('Test if configuration is set', function() {

		it('should return the same options as those that was passed to it when passed as object',  (done) => {
			const configIn = {
				"incodeTestString": "OK",
				"incodeTestNumber": 100,
				"incodeTestBoolTrue": true,
				"incodeTestBoolFalse": false,
				"incodeTestArray": [1, 2, 3]
			}
			
			const cba = new configurationByArgument();
			cba.set(configIn);
			const config = cba.get();

			expect(config).to.be.not.null;
			expect(config.incodeTestString).to.equal("OK");
			expect(config.incodeTestNumber).to.equal(100);
			expect(config.incodeTestBoolTrue).to.be.true;
			expect(config.incodeTestBoolFalse).to.be.false;
			expect(config.incodeTestArray).to.be.array;
			expect(config.incodeTestArray.length).to.equal(3);
			done();
		});

		it('should return the same options as those that was passed to it when passed as string',  (done) => {
			const configIn = `{
				"incodeTestString": "OK",
				"incodeTestNumber": 100,
				"incodeTestBoolTrue": true,
				"incodeTestBoolFalse": false,
				"incodeTestArray": [1, 2, 3]
			}`;
			
			const cba = new configurationByArgument();
			cba.set(configIn);
			const config = cba.get();

			expect(config).to.be.not.null;
			expect(config.incodeTestString).to.equal("OK");
			expect(config.incodeTestNumber).to.equal(100);
			expect(config.incodeTestBoolTrue).to.be.true;
			expect(config.incodeTestBoolFalse).to.be.false;
			expect(config.incodeTestArray).to.be.array;
			expect(config.incodeTestArray.length).to.equal(3);
			done();
		});
	});
});
