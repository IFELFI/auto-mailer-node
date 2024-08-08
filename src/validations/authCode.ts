import { Static, Type } from '@sinclair/typebox';

export const AuthCodeDataSchema = Type.Object({
  code: Type.String(),
  email: Type.String(),
});

export type AuthCodeData = Static<typeof AuthCodeDataSchema>;