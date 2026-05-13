import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MinLength
} from 'class-validator'

@InputType()
export class CreateUserInput {
	@Field(() => String)
	@IsNotEmpty()
	@IsEmail()
	public email: string

	@Field(() => String)
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	public password: string

	@Field(() => String)
	@IsNotEmpty()
	@IsString()
	@Matches(/^[a-zA-Z0-9_]+(?:$|[a-zA-Z0-9_]+)*$/)
	public username: string
}
