import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common'
import { CurrentUser } from '../users/decorator/current-user.decorator'
import { AuthGuard } from '../guards/auth.guard'
import { CreateReportDto } from './dto/create-report.dto'
import { ReportsService } from './reports.service'
import { User } from '../users/user.entity'
import { Serialize } from '../interceptors/serialize-interceptor'
import { ReportDto } from './dto/report.dto'
import { ApproveReportDto } from './dto/approve-report.dto'
import { AdminGuard } from '../guards/admin.guard'
import { GetEstimateDto } from './dto/get-estimate.dto'

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user)
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved)
  }

  /**
   * Get estimated amount of cars by sending * query request to controller
   */
  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query)
  }
}
