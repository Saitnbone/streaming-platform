import { type ExecutionContext, createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import type { Request } from 'express'

import type { GqlContext } from '../types/gfl-context.types'

export const UserAgent = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		if (ctx.getType() === 'http') {
			const request = ctx.switchToHttp().getRequest<Request>()
			return request.headers['user-agent']
		} else {
			const gqlContext = GqlExecutionContext.create(ctx)
			const { req } = gqlContext.getContext<GqlContext>()
			return req.headers['user-agent']
		}
	}
)
