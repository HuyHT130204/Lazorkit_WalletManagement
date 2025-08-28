type IconName =
	| 'qr'
	| 'send'
	| 'swap'
	| 'buy'
	| 'search'
	| 'chevron-left'
	| 'home'
	| 'activity'
	| 'browser'
	| 'settings'

export function Icon({ name, className = 'w-6 h-6' }: { name: IconName; className?: string }) {
	switch (name) {
		case 'qr':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
					<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h3v3h-3z"/>
					<path d="M20 14v6h-6"/>
				</svg>
			)
		case 'send':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
					<path d="M22 2L11 13"/>
					<path d="M22 2l-7 20-4-9-9-4 20-7z"/>
				</svg>
			)
		case 'swap':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
					<path d="M4 7h11l-3-3m3 13H4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			)
		case 'buy':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
					<path d="M3 6h18M5 6l1.5 12h11L19 6M10 10v6M14 10v6" strokeLinecap="round"/>
				</svg>
			)
		case 'search':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
					<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4" strokeLinecap="round"/>
				</svg>
			)
		case 'chevron-left':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
					<path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			)
		case 'home':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
					<path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			)
		case 'activity':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
					<path d="M3 12h4l2 7 4-14 2 7h4" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			)
		case 'browser':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
					<circle cx="12" cy="12" r="9"/><path d="M3 9h18M9 21c1.5-3 1.5-15 0-18m6 18c-1.5-3-1.5-15 0-18"/>
				</svg>
			)
		case 'settings':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
					<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H2a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 6.04 4.3l.06.06A1.65 1.65 0 0 0 7.92 4a1.65 1.65 0 0 0 1-1.51V2a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 14.9 4a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82c.12.57.53 1.02 1.1 1.14H22a2 2 0 1 1 0 4h-.09c-.57.12-.98.57-1.1 1.14z"/>
				</svg>
			)
	}
}

export type { IconName } 