import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ICommentController from "../../controllers/IControllers/ICommentController";

const route = Router();

export default (app: Router) => {
  app.use('/comments', route);

  const ctrl = Container.get(config.controllers.comment.name) as ICommentController;
  route.post('/:postId',
    celebrate({
      body: Joi.object({
        description : Joi.string().required(),
        postTag : Joi.string().required(),
        userId : Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createComment(req, res, next) );

  route.get('/getComments/:postId',
    (req, res, next) => ctrl.getComments(req, res, next));

};
