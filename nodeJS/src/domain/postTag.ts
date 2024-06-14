import { ValueObject } from "../core/domain/ValueObject";
import {Result} from "../core/logic/Result";

interface postTagProps {
  value: string;
}

export class PostTag extends ValueObject<postTagProps>{
  get value (): string {
    return this.props.value;
  }

  set value(value: string) {
    this.props.value = value;
  }

  private constructor (props: postTagProps) {
    super(props);
  }

  public static create (props: postTagProps): Result<PostTag> {
    return Result.ok<PostTag>(new PostTag({
      value: props.value
    }));
  }
}
