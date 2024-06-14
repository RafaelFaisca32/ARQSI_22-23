import IPostDTO from "../../../src/dto/IPostDTO";
import * as sinon from 'sinon';
import ICreatePostDTO from "../../../src/dto/ICreatePostDTO";
import {Post} from "../../../src/domain/post";
import {Result} from "../../../src/core/logic/Result";
import IPostRepo from "../../../src/services/IRepos/IPostRepo";
import {Container} from "typedi";
import PostService from "../../../src/services/postService";
import 'reflect-metadata';


describe('Post service create', () => {

  let post: ICreatePostDTO = ({
    id : "1",
    description: "ola",
    postTag: "boxe",
    userId: "12",
    like: [],
    dislike: [],
    commentPostId: []
  })

  let post1: Result<Post> = Post.create({
    id : "1",
    description: "ola",
    postTag: "boxe",
    userId: "12",
    like: [],
    dislike: [],
    commentPostId: []
  })

  let res = Result.ok<IPostDTO>({
    id : "1",
    description: "ola",
    postTag: "boxe",
    userId: "12",
    like: [],
    dislike: [],
    commentPostId: []
  })

  let resPosts = Result.ok<IPostDTO[]>([{
    id : "1",
    description: "ola",
    postTag: "boxe",
    userId: "12",
    like: ["12"],
    dislike: [],
    commentPostId: []
  }])


  let postSchemaInstance = require("../../../src/persistence/schemas/postSchema").default;
  Container.set("postSchema", postSchemaInstance);

  let postRepoClass = require("../../../src/repos/postRepo").default;
  let postRepoInstance = Container.get(postRepoClass);
  Container.set("PostRepo", postRepoInstance);

  sinon.stub(postRepoInstance, "save").returns(post1.getValue())

  afterEach(function () {
    sinon.restore();
  });

  it('should create post ', async function (done) {
    const service = new PostService(postRepoInstance as IPostRepo);
    const postResult = await service.createPost(post);
    Promise.resolve(res).then(function (value) {
      sinon.assert.match(postResult.getValue().postTag ,value.getValue().postTag);
      sinon.assert.match(postResult.getValue().description ,value.getValue().description);
      sinon.assert.match(postResult.getValue().userId ,value.getValue().userId);
      sinon.assert.match(postResult.getValue().like ,value.getValue().like);
      sinon.assert.match(postResult.getValue().dislike ,value.getValue().dislike);
      sinon.assert.match(postResult.getValue().commentPostId ,value.getValue().commentPostId);
    });
    done();
  })

  it('should get all posts of a certain user', async function(done){
    const service = new PostService(postRepoInstance as IPostRepo);
    done();
    const postResult = await service.getPosts(post.id);
    Promise.resolve(resPosts).then(function (value){
      sinon.assert.match(postResult[0].getValue().postTag,value[0].getValue().postTag);
      sinon.assert.match(postResult[0].getValue().description ,value[0].getValue().description);
      sinon.assert.match(postResult[0].getValue().userId ,value[0].getValue().userId);
      sinon.assert.match(postResult[0].getValue().like ,value[0].getValue().like);
      sinon.assert.match(postResult[0].getValue().dislike ,value[0].getValue().dislike);
      sinon.assert.match(postResult[0].getValue().commentPostId ,value[0].getValue().commentPostId);
    });
  })

  it('should give a like to a post of a certain user', async function(done){
    const service = new PostService(postRepoInstance as IPostRepo);
    done();
    const postResult = await service.giveLikePost(post.id,"1")
    console.log(postResult)
    Promise.resolve(res).then(function (value){
      sinon.assert.match(["1"],value.getValue().like);
    });
  })

  it('should give a dislike to a post of a certain user', async function(done){
    const service = new PostService(postRepoInstance as IPostRepo);
    done();
    const postResult = await service.giveDisikePost(post.id,"1")
    console.log(postResult)
    Promise.resolve(res).then(function (value){
      sinon.assert.match(["1"],value.getValue().dislike);
    });
  })

})
