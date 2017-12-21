module.exports = app => {
	const mongoose = app.mongoose;
	const UserSchema = new mongoose.Schema({
		username: { type: String, default: 'unkown' },
		email: { type: String },
		password: { type: String },
		salt: { type: String },
		avatar: { type: String },
		created_time: { type: Number },
		github: { type: String },
	});

	return mongoose.model('User', UserSchema);
}