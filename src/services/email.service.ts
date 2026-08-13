import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_yytzizk';
const TEMPLATE_ID = 'template_e4eqpnx';
const PUBLIC_KEY = 'QYfwdZPzInxarW3tY';

export const sendResponse = async (answer: string) => {
	try {
		const templateParams = {
			answer: answer,
			to_name: 'Gillette',
			message: `She said ${answer}!`,
			title: 'Proposal Response',
			name: 'Kemi',
		};

		await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
		console.log('Email sent successfully!');
	} catch (error) {
		console.error('Failed to send email:', error);
	}
};

export const sendSixMonthNote = async (note: string) => {
	try {
		const templateParams = {
			answer: note,
			to_name: 'Gillette',
			message: note,
			title: 'A note back from Kemi (6 Months In)',
			name: 'Kemi',
		};

		await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
		console.log('Note sent successfully!');
	} catch (error) {
		console.error('Failed to send note:', error);
	}
};
