import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

//connections & listeners
//const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
  app.listen(5000, () => console.log("Listening to port 5000"));
})
  .catch((err) => console.log(err));
