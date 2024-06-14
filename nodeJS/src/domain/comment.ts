import {Description} from "./description";
import {PostTag} from "./postTag";
import {UserId} from "./userId";
import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";
import ICreateCommentDTO from "../dto/ICreateCommentDTO";

interface CommentProps{
  description: Description;
  postTag: PostTag;
  userId: UserId;
}

export class Comment extends AggregateRoot<CommentProps> {

  get description(): Description {
    return this.props.description;
  }
  set description(value: Description) {
    this.props.description = value;
  }

  get postTag(): PostTag {
    return this.props.postTag;
  }

  set postTag(value: PostTag) {
    this.props.postTag = value;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  set userId(value: UserId) {
    this.props.userId = value;
  }

  private constructor(props: CommentProps,id?: UniqueEntityID) {
    super(props,id);
  }

  public static create(commentDTO: ICreateCommentDTO,id?: UniqueEntityID): Result<Comment> {

    const description = commentDTO.description;
    const postTag = commentDTO.postTag;
    const userId = commentDTO.userId;

    if (!!description === false || description.length === 0) {
      return Result.fail<Comment>('Must provide a description')
    } else {

      const comment = new Comment({ description: Description.create({value : description}).getValue(),
        postTag : PostTag.create({value : postTag}).getValue(),
        userId : UserId.create(userId).getValue()},id);
      return Result.ok<Comment>( comment )
    }
  }
}
