import mongoose from "mongoose";
import {ICommentPersistence} from "../../dataschema/ICommentPersistance";

const Comment = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },

    description: {
      type: String,
      index: true,
    },

    postTag: {
      type: String,
      index: true,
    },

    userId: String

  },
  { timestamps: true },
);

export default mongoose.model<ICommentPersistence & mongoose.Document>('Comment', Comment);
