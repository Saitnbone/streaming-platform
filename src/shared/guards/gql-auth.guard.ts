import {
	type CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { PrismaService } from '@/core/prisma/prisma.service'

@Injectable()
export class GqlAuthGuard implements CanActivate {
	constructor(private readonly prisma: PrismaService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const ctx = GqlExecutionContext.create(context)
		const request = ctx.getContext().req as Request & {
			session: { userId?: string }
		}

		if (typeof request.session?.userId === 'undefined') {
			throw new UnauthorizedException('Unauthorized')
		}

		const user = await this.prisma.user.findUnique({
			where: {
				id: request.session.userId
			}
		})

		if (!user) {
			throw new UnauthorizedException('Unauthorized')
		}

		return true
	}
}
