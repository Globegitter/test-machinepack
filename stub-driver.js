/**
 * Module depenencies
 */

var util = require('util');
var _ = require('lodash');
var runAllTeests = require('./run-all-tests');


/**
 * Stub/default implementation of a generic test driver
 * @param  {[type]} pathToMachinepack [description]
 */
module.exports = function stubDriver(pathToMachinepack) {

  runAllTeests(pathToMachinepack, function beforeRunningAnyTests(opts, done){
    done();
  }, function eachMachineSuite(machineIdentity, runTests){
    console.log('\n\ntesting `'+machineIdentity+'` machine...\n\n================================\n');
    runTests(function onTest(testCase, nextTestCase){
      var jsonInputVals;
      try {
        jsonInputVals = JSON.stringify(testCase.using);
      }
      catch (e) {
      }

      if (testCase.todo) {
        console.log('\n • skipping test marked as "TODO" :: (should exit with `'+testCase.outcome+'`'+(_.isUndefined(jsonInputVals)?'':' given input values: `'+jsonInputVals+'`)') );
        return nextTestCase();
      }

      console.log('\n • should exit with `'+testCase.outcome+'`'+ (_.isUndefined(jsonInputVals)?'':' given input values: `'+jsonInputVals+'`'));
      return nextTestCase(function (err) {
        if (err) {
          console.error('FAILED!  Details: '+err);
          return;
        }
        console.log('Passed.');
        return;
      });
    });
  }, function afterRunningAllTests(err) {
    if (err) {
      console.error('finished with error:',(_.isObject(err)&&err.stack)||err);
    }
    console.log('finished successfully');
  });
};