export declare function _parse(
	str: string,
	sep: string,
	eq: string,
	decode: (val: string) => string,
	callback: (key: string, val: string) => any
): void

export declare function _stringify(
	obj: object,
	encode: (val: string) => string,
	callback: (ret: string[], key: string, eq: any, val: string) => any
): void

export declare function escape(str: string): string

export declare function unescape(str: string): string

export declare function parse(
	str: string,
	sep?: string,
	eq?: string,
	options?: { decodeURIComponent?: Function }
): object

export { parse as decode }

export declare function stringify(
	obj: object,
	sep?: string,
	eq?: string,
	options?: { encodeURIComponent?: Function }
): string

export { stringify as encode }
