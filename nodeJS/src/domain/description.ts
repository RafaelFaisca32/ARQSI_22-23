import { ValueObject } from "../core/domain/ValueObject";
import {Result} from "../core/logic/Result";

interface descriptionProps {
  value: string;
}

export class Description extends ValueObject<descriptionProps>{
  get value (): string {
    return this.props.value;
  }

  public constructor (props: descriptionProps) {
    super(props);
  }

  public static create (props: descriptionProps): Result<Description> {
    return Result.ok<Description>(new Description({
      value: props.value
    }));
  }
}
