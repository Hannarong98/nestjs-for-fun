import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponseModel {
  @ApiProperty({ example: 401 })
  'statusCode': number;

  @ApiProperty({ example: 'Unauthorized' })
  'message': string;
}
