import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from '@/core/prisma/prisma.service'

import { CreateUserInput } from './inputs/create-user.input'

@Injectable()
export class AccountService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getMe(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		})

		return user
	}

	public async createUser(input: CreateUserInput) {
		const { email, password, username } = input

		const isUsernameExists = await this.prismaService.user.findUnique({
			where: {
				username
			}
		})

		if (isUsernameExists) {
			throw new Error('Это имя пользователя уже занято')
		}

		const isEmailExists = await this.prismaService.user.findUnique({
			where: {
				email
			}
		})

		if (isEmailExists) {
			throw new Error('Этот email уже занят')
		}

		await this.prismaService.user.create({
			data: {
				email,
				password: await hash(password),
				username,
				displayName: username
			}
		})

		return true
	}
}
