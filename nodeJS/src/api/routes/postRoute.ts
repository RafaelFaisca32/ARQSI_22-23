import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IPostController from "../../controllers/IControllers/IPostController";

const route = Router();

export default (app: Router) => {
  app.use('/posts', route);

  const ctrl = Container.get(config.controllers.post.name) as IPostController;

  route.post('',
    celebrate({
      body: Joi.object({
        description : Joi.string().required(),
        postTag : Joi.string().required(),
        userId : Joi.string().required(),
        like : Joi.array().items(Joi.string()),
        dislike : Joi.array().items(Joi.string()),
        commentPostId : Joi.array().items(Joi.string())
      })
    }),
    (req, res, next) => ctrl.createPost(req, res, next) );

  route.get('/getPosts/:userId',
    (req, res, next) => ctrl.getPosts(req, res, next) );

  route.put('/giveLike/:id/:userFrontend',
    (req, res, next) => ctrl.giveLike(req, res, next) );

  route.put('/giveDislike/:id/:userFrontend',
    (req, res, next) => ctrl.giveDislike(req, res, next) );

};
