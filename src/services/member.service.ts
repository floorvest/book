import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Book from "src/entities/book.entity";
import BorrowBook from "src/entities/borrow_book.entity";
import Member from "src/entities/member.entity";
import { Repository } from "typeorm";

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(Member)
        private readonly memberRepo: Repository<Member>,

        @InjectRepository(BorrowBook)
        private readonly bookRepo: Repository<Book>,

        @InjectRepository(BorrowBook)
        private readonly borrowBookRepo: Repository<BorrowBook>
    ) { }

    async create(memberData: Partial<Member>): Promise<Member> {
        const member = this.memberRepo.create(memberData);
        return this.memberRepo.save(member);
    }

    async borrowBook(memberId: number, bookId: number): Promise<string> {
        const member = await this.memberRepo.findOne({
            where: {
                id: memberId,
            },
            relations: [
                'books'
            ]
        });
        const book = await this.bookRepo.findOne({
            where: {
                id: bookId,
            },
            relations: ['borrowedBooks']
        });

        if (!member || !book) {
            throw new Error('Member or book not found');
        }

        if (member.penalty != null) {
            throw new Error('Member is currently penalized');
        }

        if (member.books.length >= 2) {
            throw new Error('Member cannot borrow more than 2 books');
        }

        if (book.stock <= 0) {
            throw new Error('Book is not available');
        }

        const borrowedBook = this.borrowBookRepo.create()
        borrowedBook.book = book
        borrowedBook.member = member
        borrowedBook.borrowAt = new Date()
        borrowedBook.updatedAt = new Date()

        await this.borrowBookRepo.save(borrowedBook);
        book.stock -= 1;
        await this.bookRepo.save(book);

        return 'Book borrowed successfully';
    }

    async returnBook(memberId: number, bookId: number): Promise<string> {
        const member = await this.memberRepo.findOne({
            where: {
                id: memberId,
            },
            relations: ['books']
        });

        const borrowedBook = await this.borrowBookRepo.findOne({
            where: {
                member,
                book: { id: bookId }
            }
        });

        if (!borrowedBook) {
            throw new Error('Book not borrowed by the member');
        }

        borrowedBook.returnAt = new Date();
        await this.borrowBookRepo.save(borrowedBook);

        const book = await this.bookRepo.findOne({
            where: {
                id: bookId
            }
        });
        book.stock += 1;
        await this.bookRepo.save(book);

        const borrowDuration = (new Date().getTime() - borrowedBook.borrowAt.getTime()) / (1000 * 3600 * 24);
        if (borrowDuration > 7) {
            member.penalty = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
            await this.memberRepo.save(member);
        }

        return 'Book returned successfully';
    }

    async checkMembers(): Promise<Member[]> {
        return this.memberRepo.find({ relations: ['books'] });
    }
}
