import { model, Schema } from 'mongoose';

interface TTrack {
	trackingId: string;
	isOpen: boolean;
	title: string;
	userIP: [string];
}

const TrackSchema = new Schema<TTrack>(
	{
		trackingId: {
			type: String,
			required: true,
		},
		isOpen: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			required: true,
		},
		userIP: {
			type: [String],
		},
	},
	{
		timestamps: true,
	}
);

const Track = model('Track', TrackSchema);
export { Track };
