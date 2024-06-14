import {Inject, Service} from "typedi";
import config from "../../config";
import {Result} from "../core/logic/Result";
import ICommentService from "./IServices/ICommentService";
import ICommentRepo from "./IRepos/ICommentRepo";
import ICommentDTO from "../dto/ICommentDTO";
import ICreateCommentDTO from "../dto/ICreateCommentDTO";
import {Comment} from "../domain/comment";
import {CommentMap} from "../mappers/CommentMap";
import IPostRepo from "./IRepos/IPostRepo";

@Service()
export default class CommentService implements ICommentService {

  constructor(
    @Inject(config.repos.comment.name) private commentRepo: ICommentRepo,
    @Inject(config.repos.post.name) private postRepo : IPostRepo
  ) {
  }

  async createComment(postId:string, commentDTO: ICreateCommentDTO): Promise<Result<ICommentDTO>> {

    try {

      const commentOrError = await Comment.create(commentDTO);
      const postOrError = await this.postRepo.findByDomainId(postId);
      if (commentOrError.isFailure) {
        return Result.fail<ICommentDTO>(commentOrError.errorValue());
      }
      if (postOrError == null) {
        return Result.fail("No post found");
      }
      const commentResult = commentOrError.getValue();

      postOrError.commentPostId.value.push(commentResult.id.toString());

      await this.commentRepo.save(commentResult);
      await this.postRepo.save(postOrError);

      const commentDTOResult = CommentMap.toDTO(commentResult) as ICommentDTO;
      return Result.ok<ICommentDTO>(commentDTOResult)
    } catch (e) {
      throw e;
    }
  }

  async getComments(postId: string): Promise<Result<ICommentDTO[]>> {
    try {
      let getPost = await this.postRepo.findByDomainId(postId);

      if (getPost==null) {
        return Result.fail("No posts found");
      }

      const commentDTOResult =[];
      for (let i = 0; i <getPost.commentPostId.value.length ; i++) {
        commentDTOResult.push(CommentMap.toDTO(await this.commentRepo.findByDomainId(getPost.commentPostId.value[i])) as ICommentDTO);
      }

      return Result.ok<ICommentDTO[]>(commentDTOResult)
    } catch (e) {
      throw e;
    }
  }
}
