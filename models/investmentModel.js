const mongoose = require("mongoose");
const { UserModel } = require("./userModel");

const investmentSchema = mongoose.Schema({
     user:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel",required:true},
    AnnualInstalmentAmount:{type:Number,required:true},
    AnnualInterestRate:{type:Number,required:true},
    TotalNUmbersOfYears:{type:Number,required:true},
    TotalInvestmentAmount:{type:Number},
    TotalInterestGained:{type:Number},
    TotalMaturityValue:{type:Number}
})

const InvestmentModel = mongoose.model("investment",investmentSchema)

module.exports = {InvestmentModel}
