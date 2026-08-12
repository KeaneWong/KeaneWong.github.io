// Layout and type tokens for the stacked scroll sections.

const CONTENT_MAX_WIDTH_PX = 1000;

/** Gutter between the text column and each viewport edge (theme.spacing(2)). */
export const PAGE_GUTTER = 2;
const PAGE_GUTTER_PX = 16;

export const contentColumnWidth = `min(${CONTENT_MAX_WIDTH_PX}px, 100%)`;

/**
 * Same width as the column, but as a definite length rather than a percentage.
 * Collapse's wrapperInner is a shrink-to-fit flex item, so a percentage there
 * lets the line re-wrap on every frame of the horizontal reveal.
 */
export const collapsibleLineWidth =
    `min(${CONTENT_MAX_WIDTH_PX - 2 * PAGE_GUTTER_PX}px, calc(100vw - ${2 * PAGE_GUTTER_PX}px))`;

export const skillsColumnWidth = 'min(400px, 100%)';

/** Ceilings match the original MUI variants, so desktop is unchanged. */
export const fluidType = {
    heading: 'clamp(1.75rem, 7.5vw, 3.75rem)',
    introHeading: 'clamp(1.75rem, 8vw, 3.75rem)',
    displayName: 'min(6rem, 24vw)',
    caption: 'clamp(0.9rem, 4.2vw, 1.25rem)',
    skill: 'clamp(1rem, 4.4vw, 1.5rem)',
} as const;
