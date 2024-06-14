import { Request, Response, NextFunction } from 'express';

export default interface IPostController  {
  createComment(req: Request, res: Response, next: NextFunction);
  getComments(req: Request, res: Response, next: NextFunction);
}
