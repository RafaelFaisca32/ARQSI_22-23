export interface Post {
  id: string;
  description: string;
  postTag: string;
  userId: string;
  like: string[];
  dislike: string[];
  commentPostId: string[];
}
