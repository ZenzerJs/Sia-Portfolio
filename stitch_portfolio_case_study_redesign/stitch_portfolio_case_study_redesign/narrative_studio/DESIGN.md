---
name: Narrative Studio
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#43474e'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#476083'
  primary: '#000613'
  on-primary: '#ffffff'
  primary-container: '#001f3f'
  on-primary-container: '#6f88ad'
  inverse-primary: '#afc8f0'
  secondary: '#5c5f60'
  on-secondary: '#ffffff'
  secondary-container: '#e1e3e4'
  on-secondary-container: '#626566'
  tertiary: '#110200'
  on-tertiary: '#ffffff'
  tertiary-container: '#391303'
  on-tertiary-container: '#b5785f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#afc8f0'
  on-primary-fixed: '#001c3a'
  on-primary-fixed-variant: '#2f486a'
  secondary-fixed: '#e1e3e4'
  secondary-fixed-dim: '#c5c7c8'
  on-secondary-fixed: '#191c1d'
  on-secondary-fixed-variant: '#454748'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#fdb69a'
  on-tertiary-fixed: '#351002'
  on-tertiary-fixed-variant: '#6b3a25'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  accent-lime: '#D4FF00'
  accent-pink: '#FF007F'
  accent-orange: '#FF5F1F'
  accent-eco: '#00A86B'
  grid-line: '#E5E5E5'
  meta-text: '#666666'
typography:
  display-xl:
    fontFamily: Bodoni Moda
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  metadata:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
spacing:
  grid-margin: 48px
  grid-gutter: 24px
  section-gap: 120px
  metric-gap: 16px
---

## Brand & Style
The design system is rooted in the "Editorial Minimalist" movement, prioritizing high-end typography and structured white space to elevate creative work. It targets a sophisticated audience within the design, architecture, and luxury sectors.

The aesthetic combines the authority of a broadsheet newspaper with the precision of modern architectural drafting. Visual interest is generated through a rigorous grid system, punctuated by high-contrast serif headlines and vibrant project-specific accents. The experience should feel archival yet contemporary—a digital gallery where the content is the primary focus.

## Colors
The palette is dominated by a deep Navy (`#001F3F`) for typography and structural elements, set against a crisp White base. To maintain the "Editorial" feel, background colors are restricted to pure white or very light grays to ensure the grid lines remain visible.

Dynamic accent colors (Lime, Pink, Orange, Eco-Green) are used sparingly as project-specific property injections. These colors should only appear on interactive elements, small labels, or specific metric highlights to prevent overwhelming the sophisticated base palette.

## Typography
The system employs a high-contrast pairing:
- **Display:** Bodoni Moda provides an elegant, fashion-forward serif for headlines and project titles.
- **Body:** Hanken Grotesk offers a clean, neutral sans-serif for readability and long-form descriptions.
- **Utility:** JetBrains Mono is used for technical metadata, timestamps, and "Project Brief" labels to evoke the precision of a blueprint or a typewriter.

Maintain tight line heights for headlines to emphasize the verticality of the serif characters, while ensuring generous line spacing for body text to support long-form reading.

## Layout & Spacing
The layout follows a strict 12-column fixed grid for desktop and a 4-column fluid grid for mobile. 1px hairline borders (`#E5E5E5`) should be used to visualize the grid, particularly in section breaks and navigation.

- **ProjectBrief:** Uses a 50/50 split on desktop, with text aligned to the left columns and metadata aligned to the right.
- **Vertical Rhythm:** Large vertical gaps (120px+) between major sections emphasize the "museum wall" effect.
- **Alignment:** All text should align to the grid hairlines. Labels should sit directly atop the lines they describe.

## Elevation & Depth
This design system avoids shadows entirely. Depth is communicated through:
- **Tonal Layering:** Using `#F8F9FA` for subtle background shifts between sections.
- **Sticky Positioning:** The "ProcessTimeline" rail sticks to the top of the viewport during scroll, sliding over the background content without a shadow, relying on the clean grid line to separate layers.
- **Hard Outlines:** All containers and dividers use 1px solid lines rather than soft blurs.

## Shapes
The shape language is strictly architectural and sharp. There are no rounded corners in this system. All media, buttons, and input fields must use 90-degree angles to maintain the editorial rigour. 

Media containers should always be filled; avoid cards with padding. Images should bleed to the edge of their assigned grid columns.

## Components
- **ProjectMasthead:** Full-width container featuring the `display-xl` serif title, a thin divider line, and a horizontal row of project metadata using the `metadata` token.
- **HeroMedia:** Large-scale image or video that spans 10-12 columns. No rounded corners. Captions are placed in the 1px gutter below the media in `metadata` style.
- **ProcessTimeline:** A vertical "rail" on the left side (2 columns) containing sticky phase names. As the user scrolls through the phase's media, the text stays fixed until the next phase pushes it up.
- **ImpactMetrics:** A row of three stats. The numerical value uses `display-xl` in the project-specific accent color, with a `label` description underneath in Navy.
- **ProjectNavigator:** A bottom-of-page component with "Previous" and "Next" project titles in large serif type, separated by a vertical hairline.
- **Buttons:** Ghost style with 1px Navy borders, sharp corners, and `label` text. On hover, the background fills with the project's accent color.