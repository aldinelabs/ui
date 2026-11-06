/**
 * Class recipes mirroring Pine's shadcn-vue button (reka-rhea style):
 * rounded-2xl, h-8, text-sm font-medium, gap-1.5, ring-3 focus.
 */
const base =
	'inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl border border-transparent text-sm font-medium outline-none transition-all select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4';

export const button = {
	primary: `${base} h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/80`,
	secondary: `${base} h-8 px-3 bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]`,
	outline: `${base} h-8 px-3 border-border bg-card hover:bg-muted dark:bg-transparent dark:hover:bg-input/30`,
	ghost: `${base} h-8 px-3 hover:bg-muted`,
	icon: `${base} size-8 hover:bg-muted`,
};

export const container = 'mx-auto w-full max-w-[1440px] px-4 sm:px-8';
