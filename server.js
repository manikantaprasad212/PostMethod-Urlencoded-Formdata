const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app =express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    
    cb(null, 'Uploadings')
  },
  filename:  (req, file, cb) =>{
    console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage })


let userSchema = new mongoose.Schema({
  profilePic: String,
  firstName:String,
  // {
  //   type:String,
  //   required:[true,"First Name is Required"],
  //   minlength:2,
  //   maxlength:20,
  //   RegExp:[/^[a-zA-Z]+$/, 'First name must only contain letters']
  // },
  lastName:String,
  //  {
  //   type:String,
  //   required:[true,"last Name is Required"],
  //   minlength:2,
  //   maxlength:20,
  //   RegExp:[/^[a-zA-Z]+$/,'last name must only contain letters']
  // },
  age:Number,
  // {
  //   type:Number,
  //   RegExp:[/^[1-9][0-9]?[0-9]?$/ ,"Age must be enter in numbers"]
  // },
  email:String,
  // {
  //   type:String,
  //   required:[true,"email is required"],
  //   RegExp:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "email is required"],
  // },
  mobileNo:String,
  // {
  //   type: String,
  //   require:[true,"Mobile No is required"],
  //   RegExp:[/^[6-9]\d{9}$/,"Mobile No is require"],
  //  },
   password:String,
  //  {
  //   type:String,
  //   required:[true,"password is required"],
  //   RegExp:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password is required"],
  // },
});

let User = mongoose.model("User", userSchema);

app.post("/signup",upload.single("profilePic"),async(req,res)=>
  {
    console.log(req.body);
  try{

    let newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        age:req.body.age,
        email:req.body.email,
        mobileNo:req.body.mobileNo,
        password:req.body.password,
        profilePic:req.file.path,


    });

   await User.insertMany([newUser]),

    res.json({ status:"success",message:"User created successfully."});

  }catch(error){
    res.json({ status:"failure",message:"Unable to create user."});

  }
   
});

app.listen(9898,()=>{
    console.log("LISTENING TO PORT 9898");
})

let connectToMDB = async ()=>{

try{
    mongoose.connect("mongodb+srv://manikantaprasadprasadula:prasadmani@cluster0.ftdog.mongodb.net/Post1?retryWrites=true&w=majority&appName=Cluster0");
  console.log("SUCCESSFULLY CONNECTED TO DATABASE");
}catch(err){
    console.log("UNABLE TO CONNECT TO DATABASE");
}
   
};
connectToMDB();




// const mongoose = require("mongoose");
// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Updated user schema with correct validation
// let userSchema = new mongoose.Schema({
//     profilePic: String,
//     firstName: {
//         type: String,
//         required: [true, "First Name is required"],
//         minlength: 2,
//         maxlength: 20,
//         match: [/^[a-zA-Z]+$/, "First Name should contain only letters"]
//     },
//     lastName: {
//         type: String,
//         required: [true, "Last Name is required"],
//         minlength: 2,
//         maxlength: 20,
//         match: [/^[a-zA-Z]+$/, "Last Name should contain only letters"]
//     },
//     age: {
//         type: Number,
//         required: [true, "Age is required"],
//         min: [1, "Age must be at least 1"],
//         max: [150, "Age must not exceed 150"]
//     },
//     email: {
//         type: String,
//         required: [true, "Email is required"],
//         match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"]
//     },
//     mobileNo: {
//         type: String,
//         required: [true, "Mobile number is required"],
//         match: [/^[6-9]\d{9}$/, "Mobile number must be valid"]
//     },
//     password: {
//         type: String,
//         // required: [true, "Password is required"],
//         // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Password must contain at least 8 characters, including uppercase, lowercase, and digits"]
//     }
// });

// let User = mongoose.model("User", userSchema);

// app.post("/signup", async (req, res) => {
//     console.log(req.body);
//     try {
//         let newUser = new User({
//             profilePic: req.body.profilePic,  // ensure profilePic is included
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             age: req.body.age,
//             email: req.body.email,
//             mobileNo: req.body.mobileNo,
//             password: req.body.password,
//         });

//         await newUser.save();  // Use `save` instead of `insertMany` for a single document

//         res.json({ status: "success", message: "User created successfully." });

//     } catch (error) {
//         console.error(error);  // Log the actual error to see what's wrong
//         res.status(400).json({ status: "failure", message: error.message });
//     }
// });

// app.listen(9898, () => {
//     console.log("LISTENING TO PORT 9898");
// });

// // MongoDB connection
// let connectToMDB = async () => {
//     try {
//         await mongoose.connect("mongodb+srv://manikantaprasadprasadula:prasadmani@cluster0.ftdog.mongodb.net/Post1?retryWrites=true&w=majority&appName=Cluster0", {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("SUCCESSFULLY CONNECTED TO DATABASE");
//     } catch (err) {
//         console.log("UNABLE TO CONNECT TO DATABASE", err);
//     }
// };
// connectToMDB();
