
const generatePagination = (
  totalRecords: number,
  startRecord: number,
  recordsPerPage: number,
): { pages: string[]; currentPage: string } => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const currentPage = Math.floor(startRecord / recordsPerPage) + 1;
  const pages: (number | string)[] = [];

  if (
    !totalRecords ||
    typeof totalRecords !== 'number' ||
    typeof startRecord !== 'number' ||
    typeof recordsPerPage !== 'number'
  ) {
    return { pages: [], currentPage: '' };
  }

  pages.push(currentPage);

  if (currentPage !== 1) pages.unshift(currentPage - 1);
  if (currentPage === totalPages && totalPages >= 3)
    pages.unshift(currentPage - 2);
  if (+pages[0] > 2) pages.unshift('...');
  if (pages[0] !== 1) pages.unshift(1);

  if (currentPage !== totalPages) pages.push(currentPage + 1);
  if (currentPage === 1 && totalPages >= 3) pages.push(currentPage + 2);
  if (+pages[pages.length - 1] <= totalPages - 2) pages.push('...');
  if (pages[pages.length - 1] !== totalPages) pages.push(totalPages);

  return {
    pages: pages.map((n) => n.toString()),
    currentPage: currentPage.toString(),
  };
};

export default generatePagination;
