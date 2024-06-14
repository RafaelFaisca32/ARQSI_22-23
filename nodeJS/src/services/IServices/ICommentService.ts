import { Result } from '../../core/logic/Result';
import ICreateCommentDTO from "../../dto/ICreateCommentDTO";
import ICommentDTO from "../../dto/ICommentDTO";

export default interface ICommentService  {
  createComment(postId:string,commentDTO: ICreateCommentDTO): Promise<Result<ICommentDTO>>;
  getComments(postId: string): Promise<Result<ICommentDTO[]>>;
}
