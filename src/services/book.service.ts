import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Book from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepo: Repository<Book>,
    ) { }

    async create(bookData: Partial<Book>): Promise<Book> {
        const book = this.bookRepo.create(bookData);
        return this.bookRepo.save(book);
    }

    async checkBooks(): Promise<Book[]> {
        const books = await this.bookRepo.find();
        const borrowedBooks = await this.bookRepo.find({ relations: ['books'] });

        return books.map(book => ({
            ...book,
            stock: book.stock - borrowedBooks.filter(b => b.id === book.id).length
        }));
    }
}