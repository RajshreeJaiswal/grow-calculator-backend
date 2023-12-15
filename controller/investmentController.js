const express=require("express");
const { authentication } = require("../middleware/authentication");
const { InvestmentModel } = require("../models/investmentModel");

const investmentController=express.Router();

investmentController.post('/calculate',async(req,res)=>{
    try {
        const{AnnualInstalmentAmount,AnnualInterestRate,TotalNUmbersOfYears}=req.body;

        if(!AnnualInstalmentAmount||!AnnualInterestRate||!TotalNUmbersOfYears){
            return res.json({status:"Missing Input Parameters"});
        }

        const interestRate=AnnualInterestRate/100;
        const TotalInvestmentAmount=AnnualInstalmentAmount*TotalNUmbersOfYears;

        const TotalMaturityValue=AnnualInstalmentAmount*(((1+interestRate)**TotalNUmbersOfYears-1)/interestRate);

        const TotalInterestGained=TotalMaturityValue-TotalInvestmentAmount;


        const Investment=await InvestmentModel.create({
            user:req.userId,
            AnnualInstalmentAmount,
            AnnualInterestRate,
            TotalNUmbersOfYears,
            TotalInvestmentAmount,
            TotalMaturityValue,
            TotalInterestGained,
        });

        res.json({
            status:"Calculation Successful",
            result:{
                TotalInvestmentAmount,
                TotalInterestGained,
                TotalMaturityValue,
            },
            Investment,
        });

    } catch (error) {
        console.log(error);
        res.json({status:"Server Error"});
    }
})

module.exports={investmentController};