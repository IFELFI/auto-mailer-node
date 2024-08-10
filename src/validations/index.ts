import { TObject } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export const validate = <T>(schema: TObject, data: unknown): T => {
  const validate = [...Value.Errors(schema, data)];
  if (validate.length > 0) {
    throw new Error(
      `Invalid data: ${validate
        .map((e) => `${e.path} ${e.message}`)
        .join(', ')}`
    );
  }
  return data as T;
};
