import { Static, Type } from '@sinclair/typebox';
import { validate } from '../validations';

const T = Type.Object({
  server: Type.Object({
    port: Type.Number(),
    host: Type.String(),
  }),
  mail: Type.Object({
    host: Type.String(),
    port: Type.Number(),
    secure: Type.Boolean(),
    auth: Type.Object({
      user: Type.String(),
      pass: Type.String(),
    }),
  }),
});

type T = Static<typeof T>;

function validateEnv(raw: Record<string, unknown>) {
  const config: T = {
    server: {
      port: parseInt(raw.PORT as string) || 3000,
      host: raw.HOST as string || 'localhost',
    },
    mail: {
      host: raw.MAIL_HOST as string,
      port: parseInt(raw.MAIL_PORT as string),
      secure: raw.MAIL_SECURE === 'true',
      auth: {
        user: raw.MAIL_USER as string,
        pass: raw.MAIL_PASS as string,
      },
    },
  };
  validate(T, config);
  return config;
}

export default validateEnv(process.env);