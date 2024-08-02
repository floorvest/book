import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Book from 'src/entities/book.entity';
import BorrowBook from 'src/entities/borrow_book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepo: Repository<Book>,

        @InjectRepository(BorrowBook)
        private borrowBookRepo: Repository<BorrowBook>,
    ) { }

    async create(bookData: Partial<Book>): Promise<Book> {
        const book = this.bookRepo.create(bookData);
        return this.bookRepo.save(book);
    }

    async checkBooks(): Promise<Book[]> {
        const books = await this.bookRepo.find();
        const borrowedBooks = await this.borrowBookRepo.find({ relations: ['book'] });

        return books.map(book => ({
            ...book,
            stock: book.stock - borrowedBooks.filter(b => b.id === book.id).length
        }));
    }
}