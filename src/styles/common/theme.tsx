// 웹 디자인과 통일된 색상 및 스타일 상수

export const colors = {
  // 그라데이션 색상 (웹의 orange-50, yellow-50, red-50)
  gradient: {
    orange: '#FFF7ED',      // orange-50
    yellow: '#FEFCE8',      // yellow-50
    red: '#FEF2F2',         // red-50
    orangeLight: '#FFEDD5', // orange-100
    yellowLight: '#FEF9C3', // yellow-100
    redLight: '#FEE2E2',    // red-100
  },
  // 기본 색상
  white: '#FFFFFF',
  black: '#171717',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  // 액센트 색상
  orange: {
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
  },
  yellow: {
    400: '#FACC15',
    500: '#EAB308',
  },
  red: {
    400: '#F87171',
    500: '#EF4444',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const shadows = {
  // 웹의 shadow-[6px_6px_0_rgba(0,0,0,0.05)] 스타일
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 3,
  },
  // 일반 그림자
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // 큰 그림자
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

// 그라데이션 배경 스타일
export const gradientBackground = {
  // 웹의 from-orange-50 via-yellow-50 to-red-50
  primary: {
    backgroundColor: colors.gradient.orange,
    // React Native에서는 LinearGradient를 사용해야 하지만, 
    // 기본적으로 배경색을 설정
  },
};

// 카드 스타일 (웹의 rounded-[32px] border border-gray-200 bg-white)
export const cardStyle = {
  borderRadius: borderRadius.xl,
  borderWidth: 1,
  borderColor: colors.gray[200],
  backgroundColor: colors.white,
  ...shadows.card,
  padding: spacing.lg,
};

