import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dto/approve-report.dto';
import { GetEstimateDto } from './dto/get-estimate.dto';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    createReport(body: CreateReportDto, user: User): Promise<import("./report.entity").Report>;
    approveReport(id: string, body: ApproveReportDto): Promise<import("./report.entity").Report>;
    getEstimate(query: GetEstimateDto): Promise<any>;
}
