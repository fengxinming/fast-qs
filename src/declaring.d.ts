export interface ParseOptions {
  sep?: string;
  eq?: string;
  decodeURIComponent?: (str: string) => string;
  filter?: (key: string, val: any) => any;
  searchIndex?: number;
  searchChar?: string | false;
}

export interface StringifyOptions {
  sep?: string;
  eq?: string;
  encodeURIComponent?: (str: string) => string;
  filter?: (key: string, val: any) => any;
}

export interface AppendOptions {
  sep?: string;
  eq?: string;
  encodeURIComponent?: (str: string) => string;
  decodeURIComponent?: (str: string) => string;
  filter?: (key: string, val: any) => any;
}
