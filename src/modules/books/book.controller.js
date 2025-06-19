import { nanoid } from 'nanoid';
import bookshelf from './book.data.js';
import { getCurrentTime } from '../../utils/constant.js';
import { VALIDATE } from '../../utils/helper.js';
import { ERROR, SUCCESS } from '../../utils/response.js';

export function createBook(req, res) {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = getCurrentTime();
  const updatedAt = insertedAt;
  const validate = VALIDATE({ name, pageCount, readPage }, 'insert');

  if (validate != null) return ERROR(res, 400, 'fail', validate);

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  bookshelf.push(newBook);

  const result = bookshelf.filter((book) => book.id === id).length > 0;
  if (!result) return ERROR(res, 500, 'error', 'Buku gagal ditambahkan');

  return SUCCESS(res, 201, 'success', 'Buku berhasil ditambahkan', { bookId: id });
}

export function getAllBook(req, res) {
  const { name, reading, finished } = req.query;

  let books = bookshelf;

  if (name != null) {
    books = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading != null) {
    books = books.filter((book) => (
      parseInt(reading, 10) === 1 ? book.reading === true : book.reading === false
    ));
  }

  if (finished != null) {
    books = books.filter((book) => (
      parseInt(finished, 10) === 1 ? book.finished === true : book.finished === false
    ));
  }

  books = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return SUCCESS(res, 200, 'success', '', { books });
}

export function getDetailBook(req, res) {
  const { bookId } = req.params;

  const newBook = bookshelf.filter((book) => (book.id === bookId));

  if (newBook.length === 0) return ERROR(res, 404, 'fail', 'Buku tidak ditemukan');

  return SUCCESS(res, 200, 'success', '', { book: newBook[0] });
}

export function updateBook(req, res) {
  const { name, pageCount, readPage } = req.payload;
  const { bookId } = req.params;

  req.payload.updatedAt = getCurrentTime();
  req.payload.finished = pageCount === readPage;
  const validate = VALIDATE({ name, pageCount, readPage }, 'update');

  if (validate != null) return ERROR(res, 400, 'fail', validate);

  const findId = bookshelf.findIndex((book) => book.id === bookId);

  if (findId === -1) return ERROR(res, 404, 'fail', 'Gagal memperbarui buku. Id tidak ditemukan');

  bookshelf[findId] = {
    ...bookshelf[findId],
    ...req.payload,
  };

  return SUCCESS(res, 200, 'success', 'Buku berhasil diperbarui');
}

export function deleteBook(req, res) {
  const { bookId } = req.params;

  const findId = bookshelf.findIndex((book) => book.id === bookId);

  if (findId === -1) return ERROR(res, 404, 'fail', 'Buku gagal dihapus. Id tidak ditemukan');

  bookshelf.splice(findId, 1);

  return SUCCESS(res, 200, 'success', 'Buku berhasil dihapus');
}
