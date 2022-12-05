import { Controller, Get, Request } from '@nestjs/common';
import { RolemenupermissionService } from './rolemenupermission.service';

@Controller('rolemenupermission')
export class RolemenupermissionController {
  constructor(private rolemenupermissionService: RolemenupermissionService) {}

  @Get()
  async getRolemenupermission(@Request() req: any) {
    return await this.rolemenupermissionService.findOne(req);
  }
}
