import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotEmpty', async: false })
export class HasAtLeastOneFieldConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any) {
    return value && Object.keys(value).length > 0;
  }

  defaultMessage() {
    return 'At least one property must be provided';
  }
}
