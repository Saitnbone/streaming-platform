const s = 1000
const m = s * 60
const h = m * 60
const d = h * 24
const w = d * 7
const y = d * 365.25

type Unit =
	| 'Years'
	| 'Year'
	| 'Yrs'
	| 'Yr'
	| 'Y'
	| 'Weeks'
	| 'Week'
	| 'Wks'
	| 'W'
	| 'Days'
	| 'Day'
	| 'D'
	| 'Hours'
	| 'Hour'
	| 'H'
	| 'Minutes'
	| 'Minute'
	| 'M'
	| 'Seconds'
	| 'Second'
	| 'S'
	| 'Ms'
	| 'Millisecond'
	| 'Milliseconds'
	| 'Msecs'
	| 'Msec'

type UnitAnyCase = Unit | Lowercase<Unit> | Uppercase<Unit>

export type StringValue =
	| `${number}`
	| `${number}${UnitAnyCase}`
	| `${number} ${UnitAnyCase}`

export function ms(str: StringValue): number {
	if (typeof str !== 'string' || str.length === 0 || str.length > 100) {
		throw new Error(
			'Value provider to ms() must be a string with length between 1 and 99.'
		)
	}

	const match =
		/^(?<value>-?(?:\d+)?\.?\d+) *(?<type>Years|Year|Yrs|Yr|Y|Weeks|Week|Wks|W|Days|Day|D|Hours|Hour|H|Minutes|Minute|M|Seconds|Second|S|Ms|Millisecond|Milliseconds|Msecs|Msec)?$/i.exec(
			str
		)
	if (!match) {
		throw new Error('Invalid format for ms()')
	}

	const groups = match?.groups as { value: string; type?: string } | undefined
	if (!groups) {
		throw new Error('Invalid format for ms()')
	}
	const n = parseFloat(groups.value)
	const type = (groups.type || 'ms').toLowerCase() as Lowercase<Unit>

	switch (type) {
		case 'years':
		case 'year':
		case 'yrs':
		case 'yr':
		case 'y':
			return n * y

		case 'weeks':
		case 'week':
		case 'wks':
		case 'w':
			return n * w
		case 'days':
		case 'day':
		case 'd':
			return n * d
		case 'hours':
		case 'hour':
		case 'h':
			return n * h
		case 'minutes':
		case 'minute':
		case 'm':
			return n * m
		case 'seconds':
		case 'second':
		case 's':
			return n * s
		case 'ms':
		case 'millisecond':
		case 'milliseconds':
		case 'msecs':
		case 'msec':
			return n
		default:
			throw new Error(
				`Ошибка: Единица времени была распознана, но не обработана.`
			)
	}
}
