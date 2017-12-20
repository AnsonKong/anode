module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const TopicSchema = new Schema({
		category: { type: String },
		title: { type: String },
		content: { type: String },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		created_time: { type: Number },
		last_modified_time: { type: Number },
		view_account: { type: Number, default: 0 },
		replies: [{ content: String, created_time: Number, user: { type: Schema.Types.ObjectId, ref: 'User' } }],
	});

	return mongoose.model('Topic', TopicSchema);
}