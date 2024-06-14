import { Service, Inject } from 'typedi';
import {Document, FilterQuery, Model} from 'mongoose';
import IPostRepo from "../services/IRepos/IPostRepo";
import {IPostPersistence} from "../dataschema/IPostPersistence";
import {PostId} from "../domain/postId";
import {Post} from "../domain/post";
import {PostMap} from "../mappers/PostMap";

@Service()
export default class PostRepo implements IPostRepo {
  private models: any;

  constructor(
    @Inject('postSchema') private postSchema : Model<IPostPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (postId: PostId | string): Promise<boolean> {

    const idX = postId instanceof PostId ? (<PostId>postId).id.toValue() : postId;

    const query = { domainId: idX};
    const userDocument = await this.postSchema.findOne( query );

    return !!userDocument === true;
  }

  public async save (post: Post): Promise<Post> {
    const query = { domainId: post.id.toString() };

    const postDocument = await this.postSchema.findOne( query );

    try {
      if (postDocument === null ) {
        const rawPost: any = PostMap.toPersistence(post);

        const postCreated = await this.postSchema.create(rawPost);

        return PostMap.toDomain(postCreated);
      } else {
        postDocument.description = post.description.value;
        postDocument.postTag = post.postTag.value;
        postDocument.userId = post.userId.value;
        postDocument.like = post.like.like;
        postDocument.dislike = post.dislike.dislike;
        postDocument.commentPostId = post.commentPostId.value;

        await postDocument.save();

        return post;
      }
    } catch (err) {
      throw err;
    }
  }
  async findByUserId(userId:string):Promise<Post[]>{
    const postRecord = await this.postSchema.find();
    const posts : Post[]=[];
    postRecord.forEach((value)=>posts.push(PostMap.toDomain(value)))
    return posts.filter((post)=>post.userId.value == userId);

  }

  public async findByDomainId (postId: PostId | string): Promise<Post> {
    const query = { domainId: postId};
    const postRecord = await this.postSchema.findOne( query as FilterQuery<IPostPersistence & Document> );

    if( postRecord != null) {
      return PostMap.toDomain(postRecord);
    }
    else
      return null;
  }

}
