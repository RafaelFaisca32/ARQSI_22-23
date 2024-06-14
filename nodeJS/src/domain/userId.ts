
import { ValueObject } from "../core/domain/ValueObject";
import {Result} from "../core/logic/Result";
import {Guard} from "../core/logic/Guard";

interface UserIdProps {
  value: string;
}

export class UserId extends ValueObject<UserIdProps> {

  get value (): string {
    return this.props.value;
  }

  private constructor (props: UserIdProps) {
    super(props);
  }

  public static create (id: string): Result<UserId> {
    const guardResult = Guard.againstNullOrUndefined(id, 'id');
    if (!guardResult.succeeded) {
      return Result.fail<UserId>(guardResult.message);
    } else {
      return Result.ok<UserId>(new UserId({ value: id }))
    }
  }
}
