import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

// import { IS_DEV_ENV } from '@/shared/utils/is-dev.utils'

import { getGraphQLConfig } from './config/graphql.config'
import { PrismaModule } from './prisma/prisma.module'
import { RedisModule } from './redis/redis.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
			// envFilePath: !IS_DEV_ENV
		}),
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			// imports: [ConfigService],
			useFactory: getGraphQLConfig,
			inject: [ConfigService]
		}),
		PrismaModule,
		RedisModule
	]
})
export class CoreModule {}
