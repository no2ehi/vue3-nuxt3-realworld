import { ApiErrorMap } from '../repository/models/api.model';
import { capitalize } from './capitalize';

export function parseErrors(errorMap: ApiErrorMap): string[] {
  const errors: string[] = []

  Object.entries(errorMap).forEach(([key, errorList]) => {
    errorList.forEach((err) => {
      errors.push(key === 'message' ? err : capitalize(`${key} ${err}`))
    })
  })

  return errors
}
