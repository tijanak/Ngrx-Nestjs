import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotInPast', async: false })
export class IsNotInPast implements ValidatorConstraintInterface {
  validate(start_time: Date): boolean {
    return start_time >= new Date();
  }

  defaultMessage(): string {
    return 'Početno vreme ne može biti u prošlosti.';
  }
}
