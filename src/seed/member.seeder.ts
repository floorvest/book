import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import Member from "src/entities/member.entity";
import { MemberService } from "src/services/member.service";
import { Repository } from "typeorm";

@Injectable()
export class MemberSeeder implements Seeder {
    constructor(
        private readonly memberService: MemberService,
        @InjectRepository(Member)
        private readonly memberRepo: Repository<Member>
    ) { }

    async seed(): Promise<any> {

        const members = [
            { code: "M001", name: "Angga" },
            { code: "M002", name: "Ferry" },
            { code: "M003", name: "Putri" },
        ];

        // Insert into the database.
        for (const member of members) {
            await this.memberService.create(member);
        }

        return 'ok'
    }

    async drop(): Promise<any> {
        return this.memberRepo.delete({});
    }
}