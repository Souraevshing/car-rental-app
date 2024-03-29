import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/user.entity'
import { Repository } from 'typeorm'
import { CreateReportDto } from './dto/create-report.dto'
import { Report } from './report.entity'
import { GetEstimateDto } from './dto/get-estimate.dto'

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createEstimate({ make, model, year, lng, lat, mileage }: GetEstimateDto) {
    /**
     * generating dynamic sql query to fetch all reports in raw form
     * select * from report
     */
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make=:make', { make })
      .andWhere('model=:model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .orderBy('ABS(mileage - :mileage)', 'ASC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne()
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto)
    report.user = user //adding userId association to reports table
    return this.repo.save(report)
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne(id)
    if (!report) {
      throw new NotFoundException(`Report not found!`)
    }

    report.approved = approved
    return this.repo.save(report)
  }
}
