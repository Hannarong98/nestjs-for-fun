import { ApiProperty } from '@nestjs/swagger';

export class ConflictResponseModel {
  @ApiProperty({ example: 409 })
  'statusCode': number;

  @ApiProperty({ example: 'Conflict' })
  'message': string;
}
