export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
};

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`
};

export const getResponsiveStyles = (baseStyles, responsiveOverrides = {}) => {
  if (typeof window === 'undefined') return baseStyles;
  
  const width = window.innerWidth;
  
  if (width <= 480 && responsiveOverrides.mobile) {
    return { ...baseStyles, ...responsiveOverrides.mobile };
  }
  if (width <= 768 && responsiveOverrides.tablet) {
    return { ...baseStyles, ...responsiveOverrides.tablet };
  }
  if (width >= 1024 && responsiveOverrides.desktop) {
    return { ...baseStyles, ...responsiveOverrides.desktop };
  }
  
  return baseStyles;
};
