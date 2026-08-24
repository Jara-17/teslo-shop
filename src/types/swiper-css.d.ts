// swiper ships its CSS via subpath exports (e.g. "swiper/css", "swiper/css/navigation")
// without a matching "types" condition, which TypeScript 6's
// `noUncheckedSideEffectImports` now flags (TS2882). These are side-effect-only
// CSS imports, so an empty ambient module declaration is enough to satisfy the checker.
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
