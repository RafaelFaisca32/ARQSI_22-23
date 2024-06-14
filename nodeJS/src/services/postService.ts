import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IPostService from "./IServices/IPostService";
import IPostDTO from "../dto/IPostDTO";
import IPostRepo from "./IRepos/IPostRepo";
import {Post} from "../domain/post";
import {PostMap} from "../mappers/PostMap";
import ICreatePostDTO from "../dto/ICreatePostDTO";

@Service()
export default class PostService implements IPostService {

  constructor(
    @Inject(config.repos.post.name) private postRepo : IPostRepo
  ) {}

  async createPost(postDTO: ICreatePostDTO): Promise<Result<IPostDTO>> {

    try {

      const postOrError = await Post.create(postDTO);

      if (postOrError.isFailure) {
        return Result.fail<IPostDTO>(postOrError.errorValue());
      }
      const postResult = postOrError.getValue();

      await this.postRepo.save(postResult);

      const postDTOResult = PostMap.toDTO(postResult) as IPostDTO;
      return Result.ok<IPostDTO>(postDTOResult)
    } catch (e) {
      throw e;
    }
  }
  async getPosts(userId: string): Promise<Result<IPostDTO[]>> {
    try {
      let getPosts = await this.postRepo.findByUserId(userId);


      if (getPosts==null) {
        return Result.fail("No posts from this user");
      }
      const postDTOResult =[];
      for (let i = 0; i <getPosts.length ; i++) {
        postDTOResult.push(PostMap.toDTO(getPosts[i]) as IPostDTO);
      }

      return Result.ok<IPostDTO[]>(postDTOResult)
    } catch (e) {
      throw e;
    }
  }

  async giveLikePost(postId: string,userFrontend: string): Promise<Result<IPostDTO>> {

    try {
      let getPost = await this.postRepo.findByDomainId(postId);

      if (getPost==null){
        return Result.fail("No post provided");
      }
      else{
        if(!getPost.like.like.length){
          getPost.like.like.push(userFrontend);
        } else {
            if(getPost.like.like.includes(userFrontend)){
              return Result.fail("Cannot like a post twice");
            } else {
              getPost.like.like.push(userFrontend);
            }
        }

        if(getPost.dislike.dislike.includes(userFrontend)){
          for(let j=0;j<getPost.dislike.dislike.length;j++){
            if(getPost.dislike.dislike[j] == userFrontend){
              getPost.dislike.dislike.splice(j,1);
            }
          }
        }

        await this.postRepo.save(getPost);

        const postDTOResult = PostMap.toDTO( getPost ) as IPostDTO;
        return Result.ok<IPostDTO>( postDTOResult )
      }

    } catch (e) {
      throw e;
    }
  }

  async giveDisikePost(postId: string,userFrontend: string): Promise<Result<IPostDTO>> {
    try {

      let getPost = await this.postRepo.findByDomainId(postId);

      if (getPost==null){
        return Result.fail("No post provided");
      }
      else{
        if(!getPost.dislike.dislike.length){
          getPost.dislike.dislike.push(userFrontend);
        } else {
          if(getPost.dislike.dislike.includes(userFrontend)){
            return Result.fail("Cannot like a post twice");
          } else {
            getPost.dislike.dislike.push(userFrontend);
          }
        }

        if(getPost.like.like.includes(userFrontend)){
          for(let j=0;j<getPost.like.like.length;j++){
            if(getPost.like.like[j] == userFrontend){
              getPost.like.like.splice(j,1);
            }
          }
        }

        await this.postRepo.save(getPost);

        const postDTOResult = PostMap.toDTO( getPost ) as IPostDTO;
        return Result.ok<IPostDTO>( postDTOResult )
      }

    } catch (e) {
      throw e;
    }
  }

}
