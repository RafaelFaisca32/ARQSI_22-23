import { Repo } from "../../core/infra/Repo";
import {Comment} from "../../domain/comment";
import {CommentPostId} from "../../domain/commentPostId";
import {CommentId} from "../../domain/commentId";

export default interface ICommentRepo extends Repo<Comment> {


  save(comment: Comment): Promise<Comment>;
  findByDomainId (commentId: CommentId | string): Promise<Comment>;
}
