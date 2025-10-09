const PAGE_SIZE = 50;
export async function fetchAll<T>(
  fetcher: (page: number, pageSize: number) => Promise<T[]>,
) {
  let page = 1;
  const pages: T[][] = [];

  do {
    pages.push(await fetcher(page, PAGE_SIZE));
    page++;
  } while (pages.at(-1)?.length === PAGE_SIZE);

  return pages.flat(1);
}
