import { Request, Response, NextFunction } from 'express';

export default interface IPostController  {
  createPost(req: Request, res: Response, next: NextFunction);
  getPosts(req: Request, res: Response, next: NextFunction);
  giveLike(req: Request, res: Response, next: NextFunction);
  giveDislike(req: Request, res: Response, next: NextFunction);
}
