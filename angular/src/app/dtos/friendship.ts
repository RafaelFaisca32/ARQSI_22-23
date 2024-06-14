import {User} from "./user";

export interface Friendship{
  id: string;
  relationTag: string;
  connectionStrength: string;
  relationshipStrength: string;
  friendA: User;
  friendB: User;
  friendshipState: string;
}
