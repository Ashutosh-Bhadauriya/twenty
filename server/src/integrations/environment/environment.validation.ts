import { plainToClass, Transform } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
  validateSync,
  IsBoolean,
} from 'class-validator';
import { assert } from 'src/utils/assert';
import { IsDuration } from './decorators/is-duration.decorator';
import { StorageType } from './interfaces/storage.interface';
import { AwsRegion } from './interfaces/aws-region.interface';
import { IsAWSRegion } from './decorators/is-aws-region.decorator';
import { CastToBoolean } from './decorators/cast-to-boolean.decorator';

export class EnvironmentVariables {
  // Database
  @IsUrl({ protocols: ['postgres'], require_tld: false })
  PG_DATABASE_URL: string;

  // Json Web Token
  @IsString()
  ACCESS_TOKEN_SECRET: string;
  @IsDuration()
  ACCESS_TOKEN_EXPIRES_IN: string;

  @IsString()
  REFRESH_TOKEN_SECRET: string;
  @IsDuration()
  REFRESH_TOKEN_EXPIRES_IN: string;

  @IsString()
  LOGIN_TOKEN_SECRET: string;
  @IsDuration()
  LOGIN_TOKEN_EXPIRES_IN: string;

  // Auth
  @IsUrl({ require_tld: false })
  FRONT_AUTH_CALLBACK_URL: string;

  @CastToBoolean()
  @IsOptional()
  @IsBoolean()
  AUTH_GOOGLE_ENABLED?: boolean;

  @IsString()
  @ValidateIf((env) => env.AUTH_GOOGLE_ENABLED === true)
  AUTH_GOOGLE_CLIENT_ID?: string;

  @IsString()
  @ValidateIf((env) => env.AUTH_GOOGLE_ENABLED === true)
  AUTH_GOOGLE_CLIENT_SECRET?: string;

  @IsUrl({ require_tld: false })
  @ValidateIf((env) => env.AUTH_GOOGLE_ENABLED === true)
  AUTH_GOOGLE_CALLBACK_URL?: string;

  // Storage
  @IsEnum(StorageType)
  @IsOptional()
  STORAGE_TYPE?: StorageType;

  @ValidateIf((env) => env.STORAGE_TYPE === StorageType.S3)
  @IsAWSRegion()
  STORAGE_S3_REGION?: AwsRegion;

  @ValidateIf((env) => env.STORAGE_TYPE === StorageType.S3)
  @IsString()
  STORAGE_S3_NAME?: string;

  @IsString()
  @ValidateIf((env) => env.STORAGE_TYPE === StorageType.Local)
  STORAGE_LOCAL_PATH?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config);

  const errors = validateSync(validatedConfig);
  assert(!errors.length, errors.toString());

  return validatedConfig;
}
