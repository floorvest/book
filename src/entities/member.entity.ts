import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Book from "./book.entity";
import BorrowBook from "./borrow_book.entity";

@Entity({
    name: "members"
})
export default class Member {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    code: string;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    penalty: Date;

    @OneToMany(() => BorrowBook, borrowBook => borrowBook.member)
    books: BorrowBook[]
}