 const https          = require('https');
 const stringSearcher = require('string-search');
 const nodemailer     = require('nodemailer');

var interval = setInterval(runIt,3600000);

runIt();


function runIt() {
  https.get('https://www.railyatri.in/pnr-status/8214797858', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        //res.render('index.ejs',{body:data});
        stringSearcher.find(data, '<p class="pnr-bold-txt">CNF</p>')
        .then(function(resultArr) {
          //console.log(resultArr,resultArr.length);
     //resultArr => [ {line: 1, text: 'This is the string to search text in'} ]
         if(resultArr.length){
           console.log('goa is on');
           mailMe();
           clearInterval(interval);
         }
         });
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
async function mailMe() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = await nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'maheshbhaibc@gmail.com',
        pass: 'sasasakru'
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Goa is On 🎉🎉🚋" <maheshbhaibc@gmail.com>', // sender address
      to: "panjasaurabh@gmail.com", // list of receivers
      subject: "Ticket Book thai gayu✔", // Subject line
      text: "Ticket has been booked /n https://www.railyatri.in/pnr-status/8505061129", // plain text body
    });

    //console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
