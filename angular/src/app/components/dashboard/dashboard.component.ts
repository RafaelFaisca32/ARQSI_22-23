import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginUserService} from "../../services/loginUserService";
import {PostService} from "../../services/PostService";
import {CommentService} from "../../services/CommentService";
import {Post} from "../../dtos/post";
import {UserService} from "../../services/UserService";
import {User} from "../../dtos/user";
import {Comment} from "../../dtos/comment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent {
  posts: Post[] = [];
  comments: Comment[] = []
  status: string | undefined;
  postFinal: Post | undefined;
  user: User | undefined;

  constructor(private router: Router,private loginUserService:LoginUserService,private postService: PostService,private userService: UserService,private commentService: CommentService) { }

  create(descritption: string,postTag: string): void {
    var like = ["1"];
    like.length = 0;
    var dislike = ["1"];
    dislike.length = 0;
    var commentPostId = ["1"];
    commentPostId.length = 0;
    if(!descritption){ return;}
    if(!postTag) { return;}
    const id = localStorage.getItem('id');
    if(!id) { return; }
    const finalId = id.slice(1,id.length-1);
    this.postService.createPost({ description:descritption,postTag:postTag,userId:finalId,like:like,dislike:dislike,commentPostId:commentPostId} as Post).subscribe(post => {
        this.posts.push(post);
      },
      (error => {
          alert('Invalid data, please try again');
        }
      ));
  }

  getPosts(email: string){

    if(!email) { return; }
    this.userService.getUserByEmail(email).subscribe(user => {
      this.user = user;
      this.postService.getPostUser(this.user.id).subscribe(post => {
        this.posts = post;
      });
    })
  }

  createComment(descritption: string,postTag: string,idPost: string){

    const id = localStorage.getItem('id');
    if(!id) { return; }
    const finalId = id.slice(1,id.length-1);
    this.commentService.createComment({description:descritption,postTag:postTag,userId:finalId} as Comment,idPost).subscribe(comment => {
        this.comments.push(comment);
      },
      (error => {
          alert('Invalid data, please try again');
        }
      ));
  }

  getComments(idPost: string){
    this.commentService.getComments(idPost).subscribe(comment=> {
      this.comments = comment;
    })
  }

  giveLike(id: string){
    const idFrontend = localStorage.getItem('id');
    if(!idFrontend) { return; }
    const finalId = idFrontend.slice(1,idFrontend.length-1);
    this.postService.giveLike(id,finalId).subscribe(post => {
      this.postFinal = post;
    })
  }

  giveDislike(id: string){
    const idFrontend = localStorage.getItem('id');
    if(!idFrontend) { return; }
    const finalId = idFrontend.slice(1,idFrontend.length-1);
    this.postService.giveDislike(id,finalId).subscribe(post => {
      this.postFinal = post;
    })
  }

  logout(){
    this.loginUserService.logout();
    this.router.navigateByUrl('/loginUser');
  }

  deactivate(){
    const id = localStorage.getItem('id');
    if(!id) { return; }
    const finalId = id.slice(1,id.length-1);
    this.userService.deactivateAccount(finalId).subscribe(() => this.status = 'Soft deleted');
    this.userService.deleteAccount(finalId).subscribe({
      next: data => {
        alert("User deleted");
      }
    });
    this.logout();
  }
}
