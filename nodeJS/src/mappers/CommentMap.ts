import {Mapper} from "../core/infra/Mapper";
import {Document, Model} from "mongoose";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import { Comment } from "../domain/comment";
import ICommentDTO from "../dto/ICommentDTO";
import {ICommentPersistence} from "../dataschema/ICommentPersistance";

export class CommentMap extends Mapper<Comment> {

  public static toDTO( comment: Comment): ICommentDTO {
    return {
      id: comment.id.toString(),
      description: comment.description.value,
      postTag: comment.postTag.value,
      userId : comment.userId.value,

    } as ICommentDTO;
  }

  public static toDomain (comment: any | Model<ICommentPersistence & Document> ): Comment {
    const commentOrError = Comment.create(
      comment,
      new UniqueEntityID(comment.domainId)
    );

    commentOrError.isFailure ? console.log(commentOrError.error) : '';

    return commentOrError.isSuccess ? commentOrError.getValue() : null;
  }

  public static toPersistence (comment: Comment): any {
    const a = {
      domainId: comment.id.toString(),
      description: comment.description.value,
      postTag: comment.postTag.value,
      userId : comment.userId.value,
    }
    return a;
  }
}
