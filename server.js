
var express = require("express");
var  path = require('path');
var  nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

//make way for some custom css, js and images
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));

//Name, Email Add, Phone, previous University, previous degree, country of origin, year of graduation, desired program, country to go to.


app.get('/home', function (req, res) {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Code For Send Mail:
app.post('/contact', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'excelabroadsmtp@gmail.com',
              pass: 'Windows7Ultimate'
          }
      });

      var firstName = req.body.firstName;
      var lastName = req.body.lastName;
      var contactEmail = req.body.contactEmail;
      var countryOrigin = req.body.countryOrigin;
      var mobileNumber = req.body.mobileNumber;
      var previousUniv = req.body.previousUniv;
      var previousDegree = req.body.previousDegree;
      var gradYear = req.body.gradYear;
      var desiredProgram = req.body.desiredProgram;
      var desiredCountry = req.body.desiredCountry;
      var contactTextArea = req.body.contactTextArea;
      var educationLevels = req.body.educationLevels;

    let mailOptions = {
           from: {
               name: `${firstName} ${lastName} `,
               address: contactEmail
           }, 
           to: 'info@excel-abroad.com', 
           subject: `${educationLevels} - ${desiredProgram}`,
           html: `
           <b> User Details</b> 
           <p> Last Name: ${firstName}</p> 
           <p> First Name: ${lastName}</p> 
           <p> Email: ${contactEmail}</p> 
           <p> Country Of Origin: ${countryOrigin}</p> 
           <p> Mobile Number: ${mobileNumber}</p> 
           <p> Previous University: ${previousUniv}</p> 
           <p> Previous Degree: ${previousDegree}</p> 
           <p> Graduation Year: ${gradYear}</p> 
           <p> Desired Program: ${desiredProgram}</p> 
           <p> Desired Level : ${educationLevels}</p> 
           <p> Desired Country: ${desiredCountry}</p> 
           <p> AnyOther Information: ${contactTextArea}</p>`
       }; 

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
        //   console.log('Message %s sent: %s', info.messageId, info.response);
     
                res.redirect('/successMessage.html');
             
          });
      });

  
 var port = 3000;
    app.listen(process.env.PORT || port, function(req, res){
      console.log('Server is running at port: ',port);
    });

