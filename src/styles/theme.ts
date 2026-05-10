// 웹 프로젝트의 Tailwind 스타일을 React Native로 변환한 테마

export const colors = {
  // 기본 색상
  white: '#ffffff',
  black: '#000000',
  
  // Gray 색상
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',

  // Stone 색상 (웹의 stone 계열 탭/카드 톤)
  stone50: '#fafaf9',
  stone100: '#f5f5f4',
  stone200: '#e7e5e4',
  stone300: '#d6d3d1',
  stone500: '#78716c',
  stone700: '#44403c',
  stone800: '#292524',
  
  // Orange/Yellow/Red (그라데이션용)
  orange50: '#fff7ed',
  orange100: '#ffedd5',
  orange200: '#fed7aa',
  orange400: '#fb923c',
  orange500: '#f97316',
  orange600: '#ea580c',
  orange700: '#c2410c',

  amber50: '#fffbeb',
  amber100: '#fef3c7',
  
  yellow50: '#fefce8',
  yellow100: '#fef9c3',
  yellow200: '#fef08a',
  
  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red500: '#ef4444',
  red600: '#dc2626',
  
  // Green
  green50: '#f0fdf4',
  green100: '#dcfce7',
  green600: '#16a34a',
  
  // Rose
  rose50: '#fff1f2',
  rose100: '#ffe4e6',
};

// 웹의 rounded-[32px] = 32
export const borderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32, // rounded-[32px]
};

// 웹의 shadow-sm / shadow-lg 감각을 모바일 카드에 맞춘 값
export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 4,
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  orangeButton: {
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 4,
  },
};

// 그라데이션 색상 (LinearGradient용)
export const gradients = {
  orangeYellowRed: ['#fff7ed', '#fefce8', '#fef2f2'], // from-orange-50 via-yellow-50 to-red-50
  orangeRoseYellow: ['#ffedd5', '#ffe4e6', '#fef9c3'], // from-orange-100 via-rose-100 to-yellow-100
  grayWhite: ['#f9fafb', '#ffffff'], // from-gray-50 to-white
  whiteGray: ['#ffffff', '#f3f4f6'], // from-white to-gray-100
};

// 폰트 크기
export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

// 간격
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

