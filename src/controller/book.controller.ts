import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from 'src/services/book.service';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    // check all books
    @Get('check')
    checkBooks() {
        return this.bookService.checkBooks();
    }
}