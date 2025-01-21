const expect = require("chai").expect;
const Employees = require("../employees.model.js");
const mongoose = require("mongoose");

describe("Department", () => {
    it('should throw an error if no "firstName" arg', () => {
        const emp = new Employees({});
    
        const err = emp.validateSync();
        expect(err.errors.firstName).to.exist;
      });
    
      it('should throw an error if no "lastName" arg', () => {
        const emp = new Employees({});
    
        const err = emp.validateSync();
        expect(err.errors.lastName).to.exist;
      });
    
      it('should throw an error if no "department" arg', () => {
        const emp = new Employees({});
    
        const err = emp.validateSync();
        expect(err.errors.department).to.exist;
      });
    
      it('should throw an error if "firstName" is not a string', () => {
        const emp = new Employees({
          firstName: {},
          lastName: "Smith",
          department: new mongoose.Types.ObjectId(),
        });
    
        const err = emp.validateSync();
        expect(err.errors.firstName).to.exist;
      });
    
      it('should throw an error if "lastName" is not a string', () => {
        const emp = new Employees({
          firstName: "John",
          lastName: [],
          department: new mongoose.Types.ObjectId(),
        });
    
        const err = emp.validateSync();
        expect(err.errors.lastName).to.exist;
      });
    
      it("should not throw an error if all args are correct", () => {
        const emp = new Employees({
          firstName: "John",
          lastName: "Smith",
          department: new mongoose.Types.ObjectId(),
        });
    
        const err = emp.validateSync();
        expect(err).to.not.exist;
      });

  after(() => {
    mongoose.models = {};
  });
});
