import mongoose from "mongoose";

export async function testDbConn() {
	// db.createUser({user:"admin", pwd: "admin", roles: ["root"]})
	const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}:27017`;
	await mongoose.connect(url);
	return mongoose.disconnect();
}
