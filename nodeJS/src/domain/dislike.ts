import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";

interface dislikeProps {
  dislike: string[];
}

export class Dislike extends ValueObject<dislikeProps> {

  get dislike (): string[] {
    return this.props.dislike;
  }

  public constructor (props) {
    super(props)
  }

  public static create (props: dislikeProps): Result<Dislike> {
    return Result.ok<Dislike>(new Dislike({
      dislike: props.dislike
    }));
  }

}
