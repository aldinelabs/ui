/**
 * Locales and the strings of the shared page chrome. Every locale is served under its own
 * prefix (`/en/...`, `/zh/...`); a site's own strings stay in the site.
 */
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const languageTag: Record<Locale, string> = { en: 'en', zh: 'zh-CN' };
/** Name of each locale in its own language, for the language switch. */
export const languageName: Record<Locale, string> = { en: 'English', zh: '中文' };

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function localeFromUrl(url: URL): Locale {
	const first = url.pathname.split('/')[1];
	return isLocale(first) ? first : defaultLocale;
}

/** Prefix a root-relative path with the locale, e.g. `/about/` -> `/zh/about/`. */
export function localize(path: string, locale: Locale): string {
	return `/${locale}${path}`;
}

/** The same path with the locale prefix removed. */
export function unlocalize(path: string): string {
	const [, first, ...rest] = path.split('/');
	return isLocale(first) ? `/${rest.join('/')}` : path;
}

const strings = {
	en: {
		home: 'Aldine home',
		skip: 'Skip to content',
		menu: 'Menu',
		contact: 'Contact',
		language: 'Language',
		theme: 'Theme',
		light: 'Light',
		system: 'System',
		dark: 'Dark',
		themeLabel: (name: string) => `${name} theme`,
	},
	zh: {
		home: 'Aldine 首页',
		skip: '跳到正文',
		menu: '菜单',
		contact: '联系方式',
		language: '语言',
		theme: '主题',
		light: '浅色',
		system: '跟随系统',
		dark: '深色',
		themeLabel: (name: string) => `${name}主题`,
	},
};

export type ChromeStrings = (typeof strings)['en'];

/** Strings of the shared header, footer and theme toggle. */
export function chrome(locale: Locale): ChromeStrings {
	return strings[locale];
}
