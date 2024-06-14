import ICommentService from "../services/IServices/ICommentService";
import {Inject, Service} from "typedi";
import config from "../../config";
import {NextFunction, Request, Response} from "express";
import ICreateCommentDTO from "../dto/ICreateCommentDTO";
import {Result} from "../core/logic/Result";
import ICommentDTO from "../dto/ICommentDTO";
import ICommentController from "./IControllers/ICommentController";


@Service()
export default class CommentController implements ICommentController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.comment.name) private commentServiceInstance: ICommentService
  ) {
  }

  public async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const commentOrError = await this.commentServiceInstance.createComment(req.params.postId as string, req.body as ICreateCommentDTO) as Result<ICommentDTO>;
      if (commentOrError.isFailure) {
        return res.status(402).send();
      }

      const commentDTO = commentOrError.getValue();
      return res.json(commentDTO).status(201);
    } catch (e) {
      return next(e);
    }
  };

  public async getComments(req: Request, res: Response, next: NextFunction) {
    try {
      const feedComments = await this.commentServiceInstance.getComments(req.params.postId as string);

      if (feedComments.isFailure) {
        return res.status(402).send();
      }

      const commentDTO = feedComments.getValue();
      return res.json(commentDTO).status(201);
    } catch (e) {
      return next(e);
    }
  };
}
