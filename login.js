var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

var admin = require("firebase-admin");

var serviceAccount = require("./db.json");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/reg", function (req, res){
    res.sendFile(__dirname + "/public/" + "reg.html")
})



const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

app.post("/registration", async function (req, res){
    const { fullname, email, password } = req.body;


    const emailExists = await checkingEmail(email);

    if (emailExists) {
       
        res.send('<p style="color: #87CEEB; font-size: 25px; text-align: center; background-color: black; padding: 400px">EMAIL ALREADY EXIST !! PLEASE LOGIN!!</p>');

    } else {
     
        const hashedPassword = await bcrypt.hash(password, 10);

        db.collection('Students').add({
           FullName: fullname,
           Email: email,
           Password: hashedPassword 
        })
        .then(()=>{
        
            res.send('<p style="color: #87CEEB; font-size: 25px; text-align: center; background-color: black; padding: 400px">REGISTRATION SUCCESFULL!!</p>');
        });
    }
});


async function checkingEmail(email) {
    const firebaseData= await db.collection('Students')
        .where("Email", "==", email)
        .get();
    return !firebaseData.empty;
}

app.get("/login", function (req, res){
    res.sendFile(__dirname + "/public/" + "login.html");
});

app.post("/signin", function (req, res){
    const { email, password } = req.body;

    db.collection('Students')
    .where("Email", "==", email)
    .get()
    .then(async (collectionData) => {
        if(collectionData.empty){
            res.send('<p style="color: #87CEEB; font-size: 25px; text-align: center; background-color: black; padding: 400px">USER NOT FOUND!!!</p><p>PLEASE LOGIN WITH CORRECT EMAIL OR CREATE YOUR ACCOUNT !! FIRST</p>');
        }
        else{
            const user = collectionData.docs[0].data();
            const hashedPassword = user.Password;

  
            const passwordMatch = await bcrypt.compare(password, hashedPassword);

            if (passwordMatch) {
                res.redirect("/pincode.html");
            } else {
                res.send("LOGIN NOT SUCCESFULL!!");
            }
        }
    });
});

app.listen(3000, function () {  
    console.log('Run your server on localhost 3000!');
});
