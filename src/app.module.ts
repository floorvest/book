import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from 'src/controller/member.controller';
import { BookController } from 'src/controller/book.controller';
import { MemberService } from 'src/services/member.service';
import { BookService } from 'src/services/book.service';
import Member from './entities/member.entity';
import Book from './entities/book.entity';
import BorrowBook from './entities/borrow_book.entity';


const entities = [
  Member, Book, BorrowBook
]

@Module({
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
      synchronize: true,
    }),
    TypeOrmModule.forFeature(entities)
  ],
  controllers: [MemberController, BookController],
  providers: [MemberService, BookService],
})
export class AppModule { }
