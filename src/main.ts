import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RedisStore } from 'connect-redis'
import cookieParser from 'cookie-parser'
import session from 'express-session'

import { CoreModule } from './core/core.module'
import { RedisService } from './core/redis/redis.service'
import { type StringValue, ms } from './shared/utils/ms.util'
import { parseBoolean } from './shared/utils/pars-boolean.util'

async function bootstrap() {
	const app = await NestFactory.create(CoreModule)
	const redis = app.get(RedisService)

	const config = app.get(ConfigService)

	app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')))
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)
	app.use(
		session({
			secret: config.getOrThrow<string>('SESSION_SECRET'),
			name: config.getOrThrow<string>('SESSION_NAME'),
			resave: false,
			saveUninitialized: false,
			cookie: {
				domain: config.getOrThrow<string>('SESSION_COOKIE_DOMAIN'),
				httpOnly: parseBoolean(
					config.getOrThrow<string>('SESSION_COOKIE_HTTP_ONLY')
				),
				secure: parseBoolean(
					config.getOrThrow<string>('SESSION_COOKIE_SECURE')
				),
				maxAge: ms(config.getOrThrow<StringValue>('SESSION_COOKIE_MAX_AGE')),
				sameSite: 'lax'
			},
			store: new RedisStore({
				client: redis,
				prefix: config.getOrThrow<string>('SESSION_REDIS_PREFIX')
			})
		})
	)
	app.enableCors({
		origin: config.getOrThrow<string>('CORS_ORIGIN'),
		credentials: true,
		exposedHeaders: ['set-cookie']
	})

	await app.listen(config.getOrThrow<number>('APPLICATION_PORT') ?? 3000)
}

bootstrap()
