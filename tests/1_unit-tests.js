const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    suite('Function convertHandler.getNum(input)', function(){
        test('Whole number input', function(done){
            let input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        })
    
        test('Decimal input', function(done){
            let input = '32.2L';
            assert.equal(convertHandler.getNum(input), 32.2);
            done();
        })
    
        test('Fractional input', function(done){
            let input = '1/3L';
            assert.equal(convertHandler.getNum(input), 1/3);
            done();
        })
    
        test('Fractional input with Decimal', function(done){
            let input = '1.2/3L';
            assert.equal(convertHandler.getNum(input), 1.2/3);
            done();
        })
    
        test('Invalid input (double fraction)', function(done){
            let input = '1.2/3/3L';
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        })
    
        test('No Numerical input', function(done){
            let input = 'L';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        })
    })

    suite('Function convertHandler.getUnit(input)', function() {
    
        test('For Each Valid Unit Inputs', function(done) {
          let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
          let output = ['gal','L','mi','km','lbs','kg','gal','L','mi','km','lbs','kg'];
          input.forEach(function(ele, index) {
            assert.equal(convertHandler.getUnit(ele), output[index])
          });
          done();
        });
        
        test('Unknown Unit Input', function(done) {
        let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
        input.forEach(function(ele){
        assert.notEqual(convertHandler.getUnit(ele),'Invalid Unit')
        })
          done();
        });  
        
      });
      
      suite('Function convertHandler.getReturnUnit(initUnit)', function() {
        
        test('For Each Valid Unit Inputs', function(done) {
          var input = ['gal','l','mi','km','lbs','kg'];
          var expect = ['L','gal','km','mi','kg','lbs'];
          input.forEach(function(ele, i) {
            assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
          });
          done();
        });
        
      });  
      
      suite('Function convertHandler.spellOutUnit(unit)', function() {
        
        test('For Each Valid Unit Inputs', function(done) {
          let input = ['gal','l','mi','km','lbs','kg'];
          let expected = ['gallons', 'liters', 'miles', 'kilometers','pounds','kilograms'];
          input.forEach(function(ele,i){
          assert.equal(convertHandler.spellOutUnit(ele),expected[i])
          })
          done();
        });
        
      });
      
      suite('Function convertHandler.convert(num, unit)', function() {
        
        test('Gal to L', function(done) {
          var input = [5, 'gal'];
          var expected = 18.9271;
          assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
          done();
        });
        
        test('L to Gal', function(done) {
          let input = [5, 'l'];
          let expected = 1.32086;
          assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
          done();
        });
        
        test('Mi to Km', function(done) {
          let input = [5, 'mi'];
          let expected = 8.0467;
          assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
          done();
          //done();
        });
        
        test('Km to Mi', function(done) {
          let input = [5, 'km'];
          let expected = 3.10686;
          assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
          done();
        });
        
        test('Lbs to Kg', function(done) {
          let input = [1, 'lbs'];
          let expected = 0.45359;
          assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
          done();
        });
        
        test('Kg to Lbs', function(done) {
          let input = [1, 'kg'];
          let expected = 2.20462;
          assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
          done();
        });
      });
    
});