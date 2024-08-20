import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateGreaterThan', async: false })
export class IsDateGreaterThan implements ValidatorConstraintInterface {
  validate(start_time: Date, args: ValidationArguments): boolean {
    const [end_timeField] = args.constraints;
    const end_time = (args.object as any)[end_timeField];
    return end_time instanceof Date && end_time > start_time;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Početno vreme mora biti pre krajnjeg.`;
  }
}
