import IPostDTO from '../../dto/IPostDTO';
import { Result } from '../../core/logic/Result';
import ICreatePostDTO from "../../dto/ICreatePostDTO";

export default interface IPostService  {
  createPost(postDTO: ICreatePostDTO): Promise<Result<IPostDTO>>;
  getPosts(postId: string): Promise<Result<IPostDTO[]>>;
  giveLikePost(postId: string,userFrontend: string): Promise<Result<IPostDTO>>;
  giveDisikePost(postId: string,userFrontend: string): Promise<Result<IPostDTO>>;
}
