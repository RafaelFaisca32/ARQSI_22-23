import { Repo } from "../../core/infra/Repo";
import {Post} from "../../domain/post";
import {PostId} from "../../domain/postId";
import {Result} from "../../core/logic/Result";

export default interface IPostRepo extends Repo<Post> {
  save(post: Post): Promise<Post>;
  findByUserId(userId:string):Promise<Post[]>;
  findByDomainId (postId: PostId | string): Promise<Post>;
}
