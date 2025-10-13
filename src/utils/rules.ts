import z from 'zod';

export const rules = {
  required: (value) => !!value || 'Campo obligatorio',
  email: (value) =>
    z.email().safeParse(value).success || 'Correo electrónico inválido',
} satisfies Record<string, (value: string) => true | string>;
