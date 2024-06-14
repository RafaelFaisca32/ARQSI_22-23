import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";

interface likeProps {
  like: string[];
}

export class Like extends ValueObject<likeProps> {

  get like (): string[] {
    return this.props.like;
  }

  public constructor (props) {
    super(props)
  }

  public static create (props: likeProps): Result<Like> {
    return Result.ok<Like>(new Like({
      like: props.like
    }));
  }

}
