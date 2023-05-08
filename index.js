const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const ejs=require("ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(express.static(__dirname));

mongoose.connect("mongodb+srv://akhtar-admin:pulsar150@atlascluster.ux104bi.mongodb.net/ArtGalMgmt",{ useNewUrlParser: true })

const dbSchema=new mongoose.Schema({
    artistName:String,
    email:String,
    Title:String,
    Price: Number,
    Quantity: Number,
    Description: String,
    ArtUrl:String,
    Exhibition: Number
});
const details= mongoose.model("details",dbSchema);
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    // res.send("Haa");
})
app.get("/artist",(req,res)=>{
    // console.log(__dirname);
    res.sendFile("/artist.html", {root: __dirname });
})
app.get("/index.ejs",(req,res)=>{
    details.find({},function(err,object){
        res.render("index",{detailedList: object});
    })
})
app.post("/",(req,res)=>{
    var todayy = new Date();
    const newDetails=new details({
        artistName:req.body.name,
        email:req.body.email,
        Title:req.body.tittle,
        Price: req.body.Price,
        Quantity: req.body.quantity,
        Description: req.body.desc,
        ArtUrl:req.body.url,
        Exhibition:req.body.Exhibition
    })
    newDetails.save();
    res.redirect("/");
})


app.listen(3000,function(){
    console.log("Server started at port 3000.");
})