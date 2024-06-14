import { ValueObject } from "../core/domain/ValueObject";
import {Result} from "../core/logic/Result";


interface CommentPostIdProps {
  value: string[]
}
export class CommentPostId extends ValueObject<CommentPostIdProps> {

  get value (): string[] {
    return this.props.value;
  }

  private constructor (props: CommentPostIdProps) {
    super(props);
  }

  public static create (props: CommentPostIdProps): Result<CommentPostId> {
    return Result.ok<CommentPostId>(new CommentPostId({
      value: props.value
    }));
  }
}

