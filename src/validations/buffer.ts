import { Static, Type } from '@sinclair/typebox';

export const BufferDataSchema = Type.Object({
  cmd: Type.String(),
  data: Type.Any(),
});

export type BufferData = Static<typeof BufferDataSchema>;
