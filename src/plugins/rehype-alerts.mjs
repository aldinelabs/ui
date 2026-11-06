/**
 * GitHub-style callouts: a blockquote that starts with `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`,
 * `[!WARNING]` or `[!CAUTION]` becomes the structure of shadcn-vue's Alert (icon, AlertTitle,
 * AlertDescription). Like shadcn, there are two variants: default, and destructive for
 * WARNING / CAUTION. Styling lives in src/styles/docs.css.
 */
const labels = {
	en: { note: 'Note', tip: 'Tip', important: 'Important', warning: 'Warning', caution: 'Caution' },
	zh: { note: '说明', tip: '提示', important: '重要', warning: '警告', caution: '注意' },
};
// Lucide icon nodes (https://lucide.dev), as in Pine's icon set.
const icons = {
	note: [['circle', { cx: '12', cy: '12', r: '10' }], ['path', { d: 'M12 16v-4' }], ['path', { d: 'M12 8h.01' }]],
	tip: [
		['path', { d: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5' }],
		['path', { d: 'M9 18h6' }],
		['path', { d: 'M10 22h4' }],
	],
	important: [
		['path', { d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z' }],
		['path', { d: 'M12 15h.01' }],
		['path', { d: 'M12 7v4' }],
	],
	warning: [
		['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' }],
		['path', { d: 'M12 9v4' }],
		['path', { d: 'M12 17h.01' }],
	],
	caution: [['circle', { cx: '12', cy: '12', r: '10' }], ['path', { d: 'M12 8v4' }], ['path', { d: 'M12 16h.01' }]],
};
const marker = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\r?\n?/i;

const el = (tagName, properties, children = []) => ({ type: 'element', tagName, properties, children });

/** @param {any} node */
function convert(node, lang) {
	const paragraph = node.children.find((child) => child.type === 'element' && child.tagName === 'p');
	const first = paragraph?.children[0];
	if (!first || first.type !== 'text') return;
	const match = marker.exec(first.value);
	if (!match) return;
	const kind = match[1].toLowerCase();
	first.value = first.value.slice(match[0].length);
	if (!first.value) paragraph.children.shift();
	if (paragraph.children.length === 0) node.children.splice(node.children.indexOf(paragraph), 1);
	const destructive = kind === 'warning' || kind === 'caution';
	const icon = el(
		'svg',
		{
			xmlns: 'http://www.w3.org/2000/svg',
			width: 24,
			height: 24,
			viewBox: '0 0 24 24',
			fill: 'none',
			stroke: 'currentColor',
			strokeWidth: 2,
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
			ariaHidden: 'true',
		},
		icons[kind].map(([tag, props]) => el(tag, props)),
	);
	const body = node.children.filter((child) => child.type !== 'text' || child.value.trim());
	node.tagName = 'div';
	node.properties = { dataSlot: 'alert', dataVariant: destructive ? 'destructive' : 'default', role: 'note' };
	node.children = [
		icon,
		el('div', { dataSlot: 'alert-title' }, [{ type: 'text', value: labels[lang][kind] }]),
		el('div', { dataSlot: 'alert-description' }, body),
	];
}

/** @param {any} node */
function walk(node, lang) {
	if (!node.children) return;
	for (const child of node.children) walk(child, lang);
	if (node.type === 'element' && node.tagName === 'blockquote') convert(node, lang);
}

export default function rehypeAlerts() {
	return (/** @type {any} */ tree, /** @type {any} */ file) => {
		walk(tree, /[\\/]zh-CN[\\/]/.test(file.path ?? '') ? 'zh' : 'en');
	};
}
