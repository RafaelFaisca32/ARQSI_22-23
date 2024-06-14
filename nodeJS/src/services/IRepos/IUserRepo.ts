import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";
import {UserId} from "../../domain/userId";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: UserEmail | string): Promise<User>;
	findById (userId: UserId | string): Promise<User>;
}
