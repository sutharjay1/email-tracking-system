import { Hono } from 'hono';
import { v4 as uuid } from 'uuid';
import { Track } from '../model/post.model';
import { sendMail } from '../utils/sendMail';

const app = new Hono();

app.post('/send-mail', async (c) => {
	try {
		const { email, password, title } = await c.req.json<{
			email: string[];
			password: string;
			title: string;
		}>();

		console.log({
			email,
			password,
			title,
		});

		if (!email) {
			return c.json({ error: 'Email is required' }, 400);
		}
		if (!title) {
			return c.json({ error: 'Title is required' }, 400);
		}
		if (password !== 'password') {
			return c.json({ error: 'Invalid password' }, 400);
		}

		console.log({
			email,
			password,
			title,
		});

		const trackingId = uuid();

		await Track.create({ trackingId, title });
		console.log('track saved');
		await sendMail(email, trackingId);
		console.log('mail sent');
		return c.json({ success: true, trackingId });
	} catch (error) {
		console.error('Error in /send-mail:', error);
		return c.json({ error: 'Error processing request' }, 500);
	}
});

export default app;
