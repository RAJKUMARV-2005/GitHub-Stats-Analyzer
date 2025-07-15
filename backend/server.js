const express=require("express");
const dotenv=require("dotenv");
const githubRoutes=require("./routes/github");

const cors=require("cors");



const app=express();
app.use(cors());
dotenv.config();

const PORT=process.env.PORT || 5000

app.use("/api/github",githubRoutes);

app.listen(PORT,()=>{
    console.log(`SERVER STARTED ON PORT ${PORT}`);
});