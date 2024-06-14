import { Service, Inject } from 'typedi';
import {Document, FilterQuery, Model} from 'mongoose';
import ICommentRepo from "../services/IRepos/ICommentRepo";
import {ICommentPersistence} from "../dataschema/ICommentPersistance";
import {Comment} from "../domain/comment";
import {CommentMap} from "../mappers/CommentMap";
import {CommentId} from "../domain/commentId";

@Service()
export default class CommentRepo implements ICommentRepo {
  private models: any;

  constructor(
    @Inject('commentSchema') private commentSchema : Model<ICommentPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (commentId: CommentId | string): Promise<boolean> {

    const idX = commentId instanceof CommentId ? (<CommentId>commentId).id.toValue() : commentId;

    const query = { domainId: idX};
    const userDocument = await this.commentSchema.findOne( query );

    return !!userDocument === true;
  }

  public async save (comment: Comment): Promise<Comment> {
    const query = { domainId: comment.id.toString() };

    const commentDocument = await this.commentSchema.findOne( query );

    try {
      if (commentDocument === null ) {
        const rawComment: any = CommentMap.toPersistence(comment);

        const commentCreated = await this.commentSchema.create(rawComment);

        return CommentMap.toDomain(commentCreated);
      } else {
        commentDocument.description = comment.description.value;
        commentDocument.postTag = comment.postTag.value;
        commentDocument.userId = comment.userId.value;


        await commentDocument.save();

        return comment;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (commentId: CommentId | string): Promise<Comment> {
    const query = { domainId: commentId};
    const commentRecord = await this.commentSchema.findOne( query as FilterQuery<ICommentPersistence & Document> );

    if( commentRecord != null) {
      return CommentMap.toDomain(commentRecord);
    }
    else
      return null;
  }

}
