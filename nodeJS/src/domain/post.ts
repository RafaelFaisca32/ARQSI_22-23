import { AggregateRoot } from "../core/domain/AggregateRoot";
import { Result } from "../core/logic/Result";
import {PostTag} from "./postTag";
import { UserId } from "./userId";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Description } from "./description"
import ICreatePostDTO from "../dto/ICreatePostDTO";
import {Like} from "./like";
import {Dislike} from "./dislike";
import { CommentPostId } from "./commentPostId";
import { Comment } from "./comment";

interface PostProps{
  description: Description;
  postTag: PostTag;
  userId: UserId;
  like : Like;
  dislike : Dislike;
  commentPostId : CommentPostId;
}

export class Post extends AggregateRoot<PostProps> {

  get id (): UniqueEntityID {
    return this._id;
  }

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

  get like(): Like {
    return this.props.like;
  }

  set like(value: Like) {
    this.props.like = value;
  }

  set dislike(value: Dislike) {
    this.props.dislike = value;
  }

  get dislike(): Dislike {
    return this.props.dislike;
  }

  get commentPostId(): CommentPostId {
    return this.props.commentPostId;
  }

  set commentPostId(value: CommentPostId) {
    this.props.commentPostId = value;
  }

  private constructor(props: PostProps,id?: UniqueEntityID) {
    super(props,id);
  }

  public static create(postDTO: ICreatePostDTO,id?: UniqueEntityID): Result<Post> {

    const description = postDTO.description;
    const postTag = postDTO.postTag;
    const userId = postDTO.userId;
    const like = postDTO.like;
    const dislike = postDTO.dislike;
    const commentPostId = postDTO.commentPostId;

    if (!!description === false || description.length === 0) {
      return Result.fail<Post>('Must provide a description')
    } else {

      const post = new Post({ description: Description.create({value : description}).getValue(),
        postTag : PostTag.create({value : postTag}).getValue(),
        userId : UserId.create(userId).getValue(),
        like: Like.create({like: like}).getValue(),
        dislike: Dislike.create({dislike: dislike}).getValue(),
        commentPostId: CommentPostId.create({value: commentPostId}).getValue()}, id);
      return Result.ok<Post>( post )
    }
  }
}
