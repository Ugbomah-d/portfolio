// Shared media queries for the motion code.
export const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const narrowQuery = window.matchMedia('(max-width: 760px)');
