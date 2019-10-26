
var express = require("express");
var  path = require('path');
var  nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('../public'));

//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '../public/css'));
app.use('/js', express.static(__dirname + '../public/js'));
app.use('/images', express.static(__dirname + '../public/images'));

//Name, Email Add, Phone, previous University, previous degree, country of origin, year of graduation, desired program, country to go to.


app.get('/home', function (req, res) {
   res.sendFile(path.join(__dirname, '../public', 'index.html'));
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

    var fromName =req.body.contactName;
    var fromAddress = req.body.contactEmail;
    var subject = req.body.contactSubject; 
    var messageContent = req.body.contactTextArea;

    let mailOptions = {
           from: {
               name: fromName,
               address: fromAddress
           }, 
           to: 'kebbakedi@gmail.com', 
           subject: fromName,
           html: `<b>User Details</b> <p>Name: ${fromName}</p> <p>Email: ${fromAddress}</p> <p>Telephone: ${subject}</p> <p>Message: ${messageContent}</p>`
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
    app.listen(port, function(req, res){
      console.log('Server is running at port: ',port);
    });

