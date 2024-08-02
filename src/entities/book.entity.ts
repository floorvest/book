import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Member from "./member.entity";
import BorrowBook from "./borrow_book.entity";

@Entity({
    name: "books"
})
export default class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    code: string;

    @Column()
    author: string;

    @Column()
    stock: number;

    @OneToMany(() => BorrowBook, borrowBook => borrowBook.book)
    books: BorrowBook[]
}