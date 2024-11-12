import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import sendMail from './api/send-mail';
import mailStatus from './api/status-mail';
import trackMail from './api/track-email';
import { connectDB } from './config/db';
const app = new Hono();

app.use('*', cors());

(async () => {
	try {
		await connectDB();
		console.log('Database connected');
	} catch (error) {
		console.error('Database connection failed', error);
	}
})();

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

app.route('/mail', sendMail);
app.route('/track', trackMail);
app.route('/status', mailStatus);

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return c.json({ error: err.message }, err.status);
	}
	console.error('Unhandled error:', err);
	return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;
