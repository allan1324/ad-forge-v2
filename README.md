# AdForge RE - Visual System & Architecture

This document outlines the frontend visual system and architecture for the AdForge RE application. The primary goal of this design is to provide a professional, polished, and robust user experience that is immune to styling conflicts when embedded in foreign environments (the "sandbox immunity" principle).

## Sandbox Immunity ("Style Shield")

This is a critical architectural constraint. To prevent host page CSS from breaking the application's UI, we employ a two-part strategy:

1.  **Tailwind Prefix:** All Tailwind utility classes are prefixed with `af-` (e.g., `af-text-center`, `af-bg-accent`). This is configured in `tailwind.config.js`.
2.  **Tailwind `important` Selector:** We use Tailwind's `important` configuration option, setting it to `#adforge-root`. This makes every prefixed utility class more specific (e.g., `#adforge-root .af-text-center`), giving them priority over most host styles.
3.  **Root Element:** The entire React application is rendered inside a single `<div id="adforge-root"></div>` in `index.tsx`.

This ensures our styles are scoped and have high specificity, creating a protective shell for the application's UI.

## Visual System (Design Tokens)

All styling is derived from a set of design tokens configured in `tailwind.config.js`. This ensures consistency across the entire application.

-   **Palette:** A dark-mode-first, professional color scheme.
    -   `ink`: Deepest black, for the main page background.
    -   `surface`: A slightly lighter shade for secondary backgrounds.
    -   `panel`: The primary color for UI elements like cards and inputs.
    -   `line`: For borders and dividers.
    -   `accent`: The primary brand color (`#00E5C3`), used for calls-to-action and highlights.
    -   `text-hi`: For headings and important text.
    -   `text-lo`: For body copy and muted text.

-   **Typography:**
    -   **Sans-serif:** `Inter` (system font fallback) for all UI text, ensuring readability.
    -   **Display:** `Sora` (system font fallback) for headings, providing a touch of brand personality.

-   **Spacing & Sizing:** A consistent grid and spacing scale is used throughout for a harmonious layout. The main container is capped at `max-w-7xl`.

-   **Border Radius:**
    -   `card`: 16px
    -   `input` / `button`: 12px

-   **Shadows:** A soft, modern shadow (`soft`) is used to lift interactive elements and cards off the background, creating a sense of depth.

## Core Components

The UI is built from a set of powerful, reusable components.

-   `Header.tsx`: The main header for the application.
-   `Card.tsx`: The primary layout component for sectioning content.
-   `Button.tsx`, `Input.tsx`, `Textarea.tsx`, `Tabs.tsx`: A suite of styled, accessible form controls.
-   `Loader.tsx`: Provides a full-screen loading indicator during ad kit generation.
-   `Accordion.tsx`: A reusable component for creating collapsible content sections.

## Architecture

The application follows a straightforward, two-step user flow managed by the main `App.tsx` component. This architecture separates the input and output phases for a clear and focused user experience.

1.  **Input Step (`InputForm.tsx`):** The user is first presented with a form to provide property details, either by fetching from a URL or by pasting text directly. All configuration options are available on this screen.
2.  **Ad Kit Step (`AdKitDisplay.tsx`):** After the user submits the details and the ad kit is generated, the application transitions to a dedicated results view. This view displays the complete, generated ad kit, organized into clear, collapsible sections.

State management and the core business logic (API calls, state transitions) are centralized in `App.tsx`, which acts as a controller, conditionally rendering either the `InputForm` or the `AdKitDisplay` based on the current application step (`AppStep` state).
