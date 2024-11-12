import { Resend } from 'resend';
const resend = new Resend(Bun.env.RESEND_API_KEY as string);

export const sendMail = async (email: string[], trackingId: string) => {
	const trackingURL = `${Bun.env.APP_URL}/track/track-email/${trackingId}`;

	try {
		console.log(`Sending email to  `, email);
		await await resend.emails.send({
			from: `Femeraa <${Bun.env.FROM_EMAIL}>`,
			to: email,
			subject: 'Email Open Tracking',
			html: `
				<h1>Email Open Tracking</h1>
				<p>Tracking ID: ${trackingId}</p>
                <img src="${trackingURL}" alt="dead pixel technique" style="display: none;"/>
			`,
		});
		console.log(`Email sent successfully to `);
	} catch (error) {
		console.error('Error sending email:', error);
		throw new Error('Failed to send email');
	}
};
