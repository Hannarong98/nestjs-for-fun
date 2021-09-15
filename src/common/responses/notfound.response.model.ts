import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponseModel {
  @ApiProperty({ example: 404 })
  'statusCode': number;

  @ApiProperty({ example: 'Not found' })
  'message': string;
}
