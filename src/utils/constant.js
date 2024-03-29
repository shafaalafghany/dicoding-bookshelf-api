module.exports = {
  getCurrentTime: () => {
    const date = new Date().toISOString();
    return date;
  },
  ERROR: (res, code, status, message) => {
    const response = res.response({
      status,
      message,
    });
    response.code(code);
    return response;
  },
  SUCCESS: (res, code, status, message, data) => {
    let result;
    if (message === '' || message == null) {
      result = {
        status,
        data,
      };
    } else if (data === '' || data == null) {
      result = {
        status,
        message,
      };
    } else {
      result = {
        status,
        message,
        data,
      };
    }
    const response = res.response(result);
    response.code(code);
    return response;
  },
  VALIDATE: (params, type) => {
    if (params.name === null || params.name === undefined) {
      return `Gagal ${type === 'insert' ? 'menambahkan' : 'memperbarui'} buku. Mohon isi nama buku`;
    }

    if (params.readPage > params.pageCount) {
      return `Gagal ${type === 'insert' ? 'menambahkan' : 'memperbarui'} buku. readPage tidak boleh lebih besar dari pageCount`;
    }

    return null;
  },
};
