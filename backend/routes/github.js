const express=require("express");


const router=express.Router();

const { analyzeGitHubProfile}=require("../controllers/githubController.js");
try {
    router.get("/:username",analyzeGitHubProfile);
    
} catch (error) {
    console.log("Error in Routing stats");
}



module.exports=router;