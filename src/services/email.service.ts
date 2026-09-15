
const RECIPIENT_EMAIL = 'corby12rich@gmail.com';

export const sendResponse = async (answer: string) => {
	try {
		const response = await fetch(
			`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					_subject: `💕 She said ${answer}! — Proposal Response`,
					name: 'Aseye',
					phone: '0509829682',
					answer: answer,
					message: `She said ${answer}! 🎉❤️ (Phone: 0509829682)`,
					_captcha: 'false',
					_template: 'table',
				}),
			},
		);

		const data = await response.json();
		if (data.success === 'true' || data.success === true) {
			console.log('✅ Email sent successfully to', RECIPIENT_EMAIL);
		} else {
			console.warn('⚠️ Formsubmit response:', data);
		}
	} catch (error) {
		console.error('❌ Failed to send email:', error);
	}
};

export const sendSixMonthNote = async (note: string) => {
	try {
		const response = await fetch(
			`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					_subject: `💌 A note from Aseye`,
					name: 'Aseye',
					phone: '0509829682',
					message: note,
					_captcha: 'false',
					_template: 'table',
				}),
			},
		);

		const data = await response.json();
		return data.success === 'true' || data.success === true;
	} catch (error) {
		console.error('❌ Failed to send note:', error);
		return false;
	}
};

