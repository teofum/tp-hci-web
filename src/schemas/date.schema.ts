import z from 'zod';

export const dateSchema = z.stringFormat(
  'date',
  /^\d+-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,
);
