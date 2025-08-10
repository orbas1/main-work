# Orbas Design Whitepaper

## macOS-Inspired Dashboard Theme

The interface uses glass surfaces, subtle shadows, and window chrome to mirror native macOS widgets. Tokens define a neutral palette with a blue accent, while automatic light mode is handled through `prefers-color-scheme` media queries. Surfaces layer translucency and blur to create depth without sacrificing readability.

## Components

- Window shells with traffic-light controls
- Segmented toolbars and silky primary buttons
- Widget cards with scroll areas and enterprise tables
- Form controls (`.input`, `.select`, `.textarea`) and status indicators (`.pill`, `.chip`)
- Custom scrollbars and toast notifications

## Accessibility & Theming

A modern CSS reset, visible focus outlines, and motion-reduction queries provide a11y foundations. The theme respects the user's system preference but also exposes a toggle that updates `:root[data-theme="light"|"dark"]` for manual switching.
