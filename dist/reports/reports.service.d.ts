import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './report.entity';
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Report>);
    create(reportDto: CreateReportDto, user: User): Promise<Report>;
    changeApproval(id: string, approved: boolean): Promise<Report>;
}
