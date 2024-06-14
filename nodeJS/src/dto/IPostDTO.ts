import { Comment } from "../domain/comment";

export default interface IPostDTO {
  id: string;
  description: string;
  postTag: string;
  userId: string;
  like: string[];
  dislike: string[];
  commentPostId: string[];
}
