import mongoose from"mongoose";
// import Messages from "../../chatpages/Messages";

const MessageSchema = new mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Messages= mongoose.model('Message', MessageSchema);

export default Messages;
