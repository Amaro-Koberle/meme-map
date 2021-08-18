const sendEmail = require('@sendgrid/mail');
sendEmail.setApiKey(
	'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'
);

module.exports = sendEmail;
