import { Hono } from 'hono';
import { Track } from '../model/post.model';

const app = new Hono();

app.get('/:trackingId', async (c) => {
	const trackingId = c.req.param('trackingId');

	if (!trackingId) {
		return c.json({ error: 'trackingId is required' }, 400);
	}

	try {
		const track = await Track.findOne({ trackingId });

		if (!track) {
			return c.json({ error: 'trackingId not found' }, 404);
		}

		return c.json({
			success: true,
			message: 'Status fetched successfully',
			data: track,
		});
	} catch (error) {
		console.error('Error while checking status:', error);
	}
});

export default app;
