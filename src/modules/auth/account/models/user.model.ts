import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserModel {
	@Field(() => String)
	id: string

	@Field(() => String)
	email: string

	@Field(() => String)
	name: string

	@Field(() => Number)
	age: number

	@Field(() => String)
	password: string

	@Field(() => String)
	username: string

	@Field(() => String)
	displayName: string

	@Field(() => String, { nullable: true })
	avatar?: string

	@Field(() => String, { nullable: true })
	bio?: string

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
