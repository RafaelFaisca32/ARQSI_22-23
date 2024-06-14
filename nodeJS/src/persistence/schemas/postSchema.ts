import { IPostPersistence } from '../../dataschema/IPostPersistence';
import mongoose from 'mongoose';

const Post = new mongoose.Schema(
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

    userId: String,

    like: [String],

    dislike: [String],

    commentPostId: [String],
  },
  { timestamps: true },
);

export default mongoose.model<IPostPersistence & mongoose.Document>('Post', Post);
