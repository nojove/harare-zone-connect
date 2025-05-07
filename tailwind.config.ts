import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                // Category theme colors
                category: {
                    // Base theme colors
                    'home': '#4C9AFF',
                    'directory': '#36B37E',
                    'classifieds': '#FF5630',
                    'events': '#FFAB00',
                    'business': '#6554C0',
                    'personal': '#FF8B00',
                    
                    // Pastel theme colors
                    'personal-soft': '#FFF8F0',
                    'business-soft': '#F0F4FF',
                    'classifieds-soft': '#FFF8E8',
                    'events-soft': '#F8FFF0',
                    
                    // Additional category colors - keeping existing ones
                    'restaurants': '#FF8B00',
                    'shopping': '#00B8D9',
                    'services': '#6554C0',
                    'education': '#36B37E',
                    'health': '#00875A',
                    'entertainment': '#FF5630',
                    'transport': '#4C9AFF',
                    'community': '#FFAB00'
                },
                
                // Background gradients for themes
                'gradient': {
                    'personal': 'linear-gradient(135deg, #FFF8F0 0%, #FFECD9 100%)',
                    'business': 'linear-gradient(135deg, #F0F4FF 0%, #DCE4FF 100%)',
                    'classifieds': 'linear-gradient(135deg, #FFF8E8 0%, #FFF0C9 100%)',
                    'events': 'linear-gradient(135deg, #F8FFF0 0%, #ECFFD9 100%)',
                },
                
                // Design tools colors
                'design': {
                    'panel': '#F8FAFC',
                    'border': '#E2E8F0',
                    'active': '#4C9AFF',
                    'hover': '#E0EDFF',
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'slide-in': {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'slide-in': 'slide-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
