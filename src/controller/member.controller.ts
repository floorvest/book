import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { MemberService } from 'src/services/member.service';

@Controller('members')
export class MemberController {
    constructor(private readonly memberService: MemberService) { }

    // borrow book
    @Post(':id/borrow/:bookId')
    borrowBook(@Param('id') id: number, @Param('bookId') bookId: number) {
        return this.memberService.borrowBook(id, bookId);
    }

    // return book
    @Post(':id/return/:bookId')
    returnBook(@Param('id') id: number, @Param('bookId') bookId: number) {
        return this.memberService.returnBook(id, bookId);
    }

    // check member books
    @Get('check')
    checkMembers() {
        return this.memberService.checkMembers();
    }
}