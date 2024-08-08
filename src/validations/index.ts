import { TObject } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export const validate = (schema: TObject, data: unknown) => {
  const validate = [...Value.Errors(schema, data)];
  if (validate.length > 0) {
    throw new Error(
      `Invalid data: ${validate
        .map((e) => `${e.path} ${e.message}`)
        .join(', ')}`
    );
  }
};
