import IPostDTO from "../../../src/dto/IPostDTO";
import * as sinon from 'sinon';
import {Result} from "../../../src/core/logic/Result";
import {Container} from "typedi";
import PostService, {default as postServiceClass} from "../../../src/services/postService";
import 'reflect-metadata';
import {NextFunction, Request, Response} from "express";
import PostController from "../../../src/controllers/postController";
import IPostService from "../../../src/services/IServices/IPostService";

describe('post controller', function () {

  afterEach(function () {
    sinon.restore();
  });

  let postSchemaInstance = require("../../../src/persistence/schemas/postSchema").default;
  Container.set("postSchema", postSchemaInstance);

  let postRepoClass = require("../../../src/repos/postRepo").default;
  let postRepoInstance = Container.get(postRepoClass);
  Container.set("PostRepo", postRepoInstance);

  let postServiceClass = require("../../../src/services/postService").default;
  let postServiceInstance = Container.get(postServiceClass);
  Container.set("PostService", postServiceInstance);

  it('returns json with values when createPost', async function () {
    let body = {
      "description":'desc',
      "postTag":'boxe',
      "userId":'1',
      "like":[],
      "dislike":[],
      "commentPostId":[]
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    postServiceInstance = Container.get("PostService");
    sinon.stub(postServiceInstance, "createPost").returns( Result.ok<IPostDTO>( {id:"123", description:'desc',
      postTag:'boxe',
      userId:'1',
      like:[],
      dislike:[],
      commentPostId:[]} ));

    const ctrl = new PostController(postServiceInstance as IPostService);

    await ctrl.createPost(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ "id":"123", "description":'desc',
      "postTag":'boxe',
      "userId":'1',
      "like":[],
      "dislike":[],
      "commentPostId":[]}));
  });

  it('returns json with values of postdto when posts of a certain user are requested', async function () {
    let param = {
      userId: "2"
    };
    let body = {}
    let req: Partial<Request> = {};
    req.body = body;
    req.params = param;

    let res: Partial<Response> = {
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {
    };

    postServiceInstance = Container.get("PostService");
    sinon.stub(postServiceInstance, "getPosts").returns(Result.ok<IPostDTO[]>([
      {
        id: "1",
        description: "getPost",
        postTag: "ola",
        userId: "2",
        like: [],
        dislike: [],
        commentPostId:[]
      }
    ]));

    const ctrl = new PostController(postServiceInstance as IPostService);

    await ctrl.getPosts(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWithMatch(res.json, sinon.match([{
      "id": "1",
      "description": "getPost",
      "postTag": "ola",
      "userId": "2",
      "like": [],
      "dislike": [],
      "commentPostId":[]
    }]));
  })

  it('returns json with value postdto when a user gives a like', async function () {
    let param = {
      id: "12343",
      userFrontend: "1234"
    };
    let body = {}
    let req: Partial<Request> = {};
    req.body = body;
    req.params = param;

    let res: Partial<Response> = {
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {
    };

    postServiceInstance = Container.get("PostService");
    sinon.stub(postServiceInstance, "giveLikePost").returns(Result.ok<IPostDTO>(
      {
        id: "12343",
        description: "getPost",
        postTag: "ola",
        userId: "2",
        like: [],
        dislike: [],
        commentPostId:[]
      }
    ));

    const ctrl = new PostController(postServiceInstance as IPostService);

    await ctrl.giveLike(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWithMatch(res.json, sinon.match({
      "id": "12343",
      "description": "getPost",
      "postTag": "ola",
      "userId": "2",
      "like": ["1234"],
      "dislike": [],
      "commentPostId":[]
    }));
  })

  it('returns json with value postdto when a user gives a dislike', async function () {
    let param = {
      id: "12343",
      userFrontend: "1234"
    };
    let body = {}
    let req: Partial<Request> = {};
    req.body = body;
    req.params = param;

    let res: Partial<Response> = {
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {
    };

    postServiceInstance = Container.get("PostService");
    sinon.stub(postServiceInstance, "giveDisikePost").returns(Result.ok<IPostDTO>(
      {
        id: "12343",
        description: "getPost",
        postTag: "ola",
        userId: "2",
        like: [],
        dislike: [],
        commentPostId:[]
      }
    ));

    const ctrl = new PostController(postServiceInstance as IPostService);

    await ctrl.giveDislike(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWithMatch(res.json, sinon.match({
      "id": "12343",
      "description": "getPost",
      "postTag": "ola",
      "userId": "2",
      "like": [],
      "dislike": ["1234"],
      "commentPostId":[]
    }));

  })
});
