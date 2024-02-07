import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongo_db successfully connected..");
});

connection.on("error", (error) => {
    console.log("Connection failed..");
});

export default mongoose;