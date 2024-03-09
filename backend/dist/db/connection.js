import { connect, disconnect } from "mongoose"; //setting up mongodb.
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}
async function disconnectFromDatabase() {
    try {
        await disconnect(); //Disconnecting from db if workflow in our app is not flowing as expected - security check
    }
    catch (error) {
        console.log(error);
        throw new Error("Couldn't disconnect to MongoDB");
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map