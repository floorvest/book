import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Member from "./member.entity";
import Book from "./book.entity";

@Entity({
    name: "borrow_books"
})
export default class BorrowBook {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    borrowAt: Date;

    @Column()
    returnAt: Date;

    @ManyToOne(() => Member, member => member.books)
    member: Member

    @ManyToOne(() => Book, book => book.books)
    book: Book

    @Column({
        nullable: true
    })
    updatedAt: Date;
}