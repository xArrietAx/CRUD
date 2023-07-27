import { connect } from "mongoose";
(
  async function  Connect() {
    await connect(process.env.MongoDB_URL)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Error connecting to MongoDB", err));
    }
  )()