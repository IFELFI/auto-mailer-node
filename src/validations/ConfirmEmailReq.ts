import { Static, Type } from '@sinclair/typebox';

export const ConfirmEmailReqSchema = Type.Object({
  link: Type.String(),
  email: Type.String(),
});

export type ConfirmEmailReq = Static<typeof ConfirmEmailReqSchema>;
