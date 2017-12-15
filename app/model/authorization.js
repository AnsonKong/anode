module.exports = app => {
	const mongoose = app.mongoose;
	const AuthorizationSchema = new mongoose.Schema({
		provider: { type: String },
		uid: { type: String },
		user_id: { type: String },
	});

	return mongoose.model('Authorization', AuthorizationSchema);
}