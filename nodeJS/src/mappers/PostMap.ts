import { Mapper } from "../core/infra/Mapper";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import {Post} from "../domain/post";
import IPostDTO from "../dto/IPostDTO";
import {Document, Model} from "mongoose";
import {IPostPersistence} from "../dataschema/IPostPersistence";

export class PostMap extends Mapper<Post> {

  public static toDTO( post: Post): IPostDTO {
    return {
      id: post.id.toString(),
      description: post.description.value,
      postTag: post.postTag.value,
      userId : post.userId.value,
      like : post.like.like,
      dislike : post.dislike.dislike,
      commentPostId : post.commentPostId.value
    } as IPostDTO;
  }

  public static toDomain (post: any | Model<IPostPersistence & Document> ): Post {
    const postOrError = Post.create(
      post,
      new UniqueEntityID(post.domainId)
    );

    postOrError.isFailure ? console.log(postOrError.error) : '';

    return postOrError.isSuccess ? postOrError.getValue() : null;
  }

  public static toPersistence (post: Post): any {
    const a = {
      domainId: post.id.toString(),
      description: post.description.value,
      postTag: post.postTag.value,
      userId : post.userId.value,
      like : post.like.like,
      dislike : post.dislike.dislike,
      commentPostId : post.commentPostId.value
    }
    return a;
  }
}
