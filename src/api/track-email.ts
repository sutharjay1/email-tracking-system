import { Hono } from 'hono';
import { Track } from '../model/post.model';

import { promises as fs } from 'fs';

let imageBuffer: Buffer;
(async () => {
	try {
		imageBuffer = await fs.readFile(__dirname + './assets/pic.png');
	} catch (error) {
		console.error(`Error loading image: ${error}`);
	}
})();

const app = new Hono();

app.post('/track-email/:trackingId', async (c) => {
	try {
		const trackingId = c.req.param('trackingId');
		const userIP = c.req.raw.headers.get('true-client-ip') || '0.0.0.0';

		if (!trackingId) {
			return c.json({ error: 'trackingId is required' }, 400);
		}

		const track = await Track.findOne({ trackingId });

		if (!track) {
			return c.json({ error: 'trackingId not found' }, 404);
		}

		if (!track.userIP.includes(userIP)) {
			track.userIP.push(userIP);
			track.isOpen = true;
			await track.save();
			return c.json(
				{ success: true, message: 'Email tracked successfully' },
				200
			);
		}

        console.log(imageBuffer)

		return new Response(imageBuffer, {
			headers: {
				'Content-Type': 'image/png',
				'Content-Length': imageBuffer.length.toString(),
			},
		});
	} catch (error) {
		console.error(`Error tracking email: ${error}`);
	}
});

export default app;
