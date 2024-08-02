import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { seeder } from "nestjs-seeder";
import Member from "src/entities/member.entity";
import Book from "src/entities/book.entity";
import BorrowBook from "src/entities/borrow_book.entity";
import { MemberSeeder } from "src/seed/member.seeder";
import { BookSeeder } from "src/seed/book.seeder";
import { MemberService } from "src/services/member.service";
import { BookService } from "src/services/book.service";

const entities = [
    Member, Book, BorrowBook
]

seeder({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || "3306"),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: entities,
            synchronize: false,
        }),
        TypeOrmModule.forFeature(entities)
    ],
    providers: [MemberService, BookService],
}).run([MemberSeeder, BookSeeder]);