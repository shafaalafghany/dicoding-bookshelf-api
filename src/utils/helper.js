export function VALIDATE(params, type) {
  if (params.name === null || params.name === undefined) {
    return `Gagal ${type === 'insert' ? 'menambahkan' : 'memperbarui'} buku. Mohon isi nama buku`;
  }

  if (params.readPage > params.pageCount) {
    return `Gagal ${type === 'insert' ? 'menambahkan' : 'memperbarui'} buku. readPage tidak boleh lebih besar dari pageCount`;
  }

  return null;
}
