//import { PartialType } from "@nestjs/mapped-types";

export class UserDto {
    readonly id?: string;
    readonly username: string;
    readonly email: string;
    readonly provider?: string;
    readonly thirdPartyId?: string;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly photoUrl?: string;
    readonly mobileTel?: string;
    readonly local?: string;
    readonly created_at?:  Date;
    readonly updated_at?: Date;
  }
  export class UserCreateDto extends UserDto {
  }
  export class UserUpdateDto extends UserDto {
    _id?: string; //force in update to not generate new  _id
    id?: string;
  }
  