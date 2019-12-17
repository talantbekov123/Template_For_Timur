var nodemailer = require('nodemailer');
var fs = require('fs');

module.exports = function(gmail, gmail_pass, email, subject, text,instructions, cb) {

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true, // secure:true for port 465, secure:false for port 587
		auth: {
			user: gmail,
			pass: gmail_pass
		}
	});

	// setup email data with unicode symbols
	var mailOptions = {
		from: 'Mentor.kg <mentorkyrgyzstan@gmail.com',
		to: email, // list of receivers
		subject: subject,
		text: text
	};
	if(instructions) {
		mailOptions.attachments = [{   // stream as an attachment
	        filename: 'instructions.docx',
	        content: fs.createReadStream('./public/instructions.docx')
	    }]
	}
	
	if(process.env.ENV == 'prod') {
		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
		});	
	}
}