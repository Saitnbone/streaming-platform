export interface LocationInfo {
	country: string
	city: string
	lat: number
	lng: number
}

export interface DeviceInfo {
	browser: string
	os: string
	deviceType: string
}

export interface SessionMetadata {
	location: LocationInfo
	device: DeviceInfo
	ip: string | undefined
}
