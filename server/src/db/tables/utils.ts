import zod from 'zod';
import kysely from 'kysely';

export function generated(t: zod.ZodType): zod.ZodType<
kysely.ColumnType<zod.infer<typeof t>, never, never>> {
  // @ts-ignore: can't figure out another way for now...
  return zod.lazy(() => zod.object({
    __select__: t,
    __insert__: zod.never(),
    __update__: zod.never(),
  }));
}

export function created(t: zod.ZodType): zod.ZodType<
kysely.ColumnType<zod.infer<typeof t>, zod.infer<typeof t>, never>> {
  // @ts-ignore: can't figure out another way for now...
  return zod.lazy(() => zod.object({
    __select__: t,
    __insert__: t,
    __update__: zod.never(),
  }));
}

export function dateType(): zod.ZodType<
kysely.ColumnType<Date, Date | string | undefined, Date | string>> {
  // @ts-ignore: can't figure out another way for now...
  return zod.lazy(() => zod.object({
    __select__: zod.date(),
    __insert__: zod.date().or(zod.string().or(zod.undefined())),
    __update__: zod.date().or(zod.string()),
  }));
}

export const timestamps = () => ({
  created_at: dateType(),
  updated_at: dateType(),
});
