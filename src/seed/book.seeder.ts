import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import Book from "src/entities/book.entity";
import Member from "src/entities/member.entity";
import { BookService } from "src/services/book.service";
import { MemberService } from "src/services/member.service";
import { Repository } from "typeorm";

@Injectable()
export class BookSeeder implements Seeder {
    constructor(
        private readonly bookService: BookService,
        @InjectRepository(Book)
        private readonly bookRepo: Repository<Book>
    ) { }

    async seed(): Promise<any> {

        const books = [
            { code: "JK-45", title: "Harry Potter", author: "J.K Rowling", stock: 1 },
            { code: "SHR-1", title: "A Study in Scarlet", author: "Arthur Conan Doyle", stock: 1 },
            { code: "TW-11", title: "Twilight", author: "Stephenie Meyer", stock: 1 },
            { code: "HOB-83", title: "The Hobbit, or There and Back Again", author: "J.R.R. Tolkien", stock: 1 },
            { code: "NRN-7", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", stock: 1 },
        ];

        for (const book of books) {
            await this.bookService.create(book);
        }

        return 'ok'
    }

    async drop(): Promise<any> {
        return this.bookRepo.delete({});
    }
}