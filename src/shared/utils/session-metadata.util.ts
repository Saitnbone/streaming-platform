import DeviceDetector from 'device-detector-js'
import type { Request } from 'express'
import { lookup } from 'geoip-lite'
import * as countries from 'i18n-iso-countries'
import type { LocaleData } from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'

import type { SessionMetadata } from '../types/session-metadata.types'

import { IS_DEV_ENV } from './is-dev.utils'

countries.registerLocale(enLocale as LocaleData)

export function getSessionMetadata(
	req: Request,
	userAgent: string
): SessionMetadata {
	const ip = IS_DEV_ENV
		? '127.0.0.1'
		: Array.isArray(req.headers['cf-connecting-ip'])
			? req.headers['cf-connecting-ip'][0]
			: req.headers['cf-connecting-ip'] ||
				(typeof req.headers['x-forwarded-for'] === 'string'
					? req.headers['x-forwarded-for'].split(',')[0]
					: req.ip)
	const location = lookup(ip as string)
	const device = new DeviceDetector().parse(userAgent)

	return {
		location: {
			country: countries.getName(location?.country, 'en') || 'Unknown',
			city: location?.city || 'Unknown',
			lat: location?.ll[0] || 0,
			lng: location?.ll[1] || 0
		},
		device: {
			browser: device.client?.name || 'Unknown',
			os: device.os?.name || 'Unknown',
			deviceType: device.device?.type || 'Unknown'
		},
		ip
	}
}
