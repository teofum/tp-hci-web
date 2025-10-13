import z from 'zod';

export const rules = {
  required: (value: string) => !!value || 'Campo obligatorio',
  email: (value: string) =>
    z.email().safeParse(value).success || 'Correo electrónico inválido',
  equal: (referenceValue: string) => (value: string) =>
    value === referenceValue || 'Los campos deben ser iguales',
} as const;
