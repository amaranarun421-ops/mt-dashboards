# Premium Loaders & Spinners

Modern, advanced premium loaders and spinners for the mtverse dashboard.

## Components

### 1. PremiumSpinner
A versatile spinner component with multiple variants and sizes.

**Location:** `src/app/components/loaders/PremiumSpinner.tsx`

**Features:**
- 4 variants: default (gradient), dots, pulse, orbit
- 4 sizes: sm, md, lg, xl
- Optional loading text
- Smooth animations
- Fully responsive
- Dark mode support

**Usage:**
```tsx
import PremiumSpinner from '@/app/components/loaders/PremiumSpinner';

// Basic usage
<PremiumSpinner />

// With options
<PremiumSpinner 
  size="lg" 
  variant="orbit" 
  showText={true} 
  text="Loading data..." 
/>
```

**Props:**
- `size?: "sm" | "md" | "lg" | "xl"` - Spinner size (default: "md")
- `variant?: "default" | "dots" | "pulse" | "orbit"` - Animation style (default: "default")
- `showText?: boolean` - Show loading text (default: true)
- `text?: string` - Custom loading text (default: "Loading...")

### 2. SiteLoader
Full-screen loader shown on initial site load.

**Location:** `src/app/components/loaders/SiteLoader.tsx`

**Features:**
- Covers entire viewport on initial load
- Animated background gradients
- Brand logo display
- Smooth fade-out animation
- Minimum display time for smooth UX
- Auto-dismisses after page load

**Usage:**
Already integrated in `src/app/layout.tsx`. No manual implementation needed.

### 3. NavigationProgress
Content-area loader for page navigation.

**Location:** `src/app/components/navigation/NavigationProgress.tsx`

**Features:**
- Shows ONLY in content area (not over header/sidebar)
- Triggers on route changes
- Blurred background overlay
- Fast performance with useRef cleanup
- Mobile responsive
- Positioned absolutely within content container

**Usage:**
Already integrated in `src/app/(DashboardLayout)/layout.tsx`. No manual implementation needed.

## Implementation Details

### Content-Area Positioning
The NavigationProgress loader uses `absolute` positioning instead of `fixed` to ensure it only covers the content area:

```tsx
// Positioned within the content container
<div className="absolute inset-0 z-9999 flex items-center justify-center bg-background/90 backdrop-blur-md rounded-3xl">
  <PremiumSpinner />
</div>
```

This is placed inside the content wrapper in the layout:
```tsx
<div className="bg-lightgray dark:bg-[#111827] mr-3 rounded-3xl min-h-[90vh] relative overflow-hidden">
  <NavigationProgress /> {/* Absolute positioned within this container */}
  <div className="container mx-auto px-6 py-30">{children}</div>
</div>
```

### Mobile Responsiveness
All loaders are fully responsive:
- **Desktop:** Loader appears in content area, header and sidebar remain visible
- **Mobile:** Loader appears in content area, header remains visible, sidebar is hidden by default
- **Tablet:** Smooth transitions between layouts

### Z-Index Hierarchy
- SiteLoader: `z-[99999]` (highest - covers everything on initial load)
- NavigationProgress: `z-[9999]` (high - covers content area only)
- Header: `z-2` (stays visible above content)
- Sidebar: Default stacking (stays visible on desktop)

## Testing

Visit `/ui/loader-demo` to see all loader variants and test the implementation.

The demo page includes:
- Navigation loader testing
- All spinner variants showcase
- Size variations
- Interactive demos
- Mobile responsiveness verification

## Customization

### Colors
Loaders use CSS variables from the theme:
- `--primary` - Main spinner color
- `--background` - Background overlay
- `--defaultBorder` - Border colors

### Animation Speed
Adjust animation duration in the component styles:
```tsx
style={{ animation: "premium-spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
```

### Display Duration
Modify timeout in NavigationProgress:
```tsx
timeoutRef.current = setTimeout(() => setLoading(false), 500); // Change 500ms
```

## Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Performance
- No intervals used (only setTimeout)
- Proper cleanup with useRef
- Minimal re-renders
- CSS animations (GPU accelerated)
- Lazy loading ready

## Accessibility
- ARIA labels included
- `role="status"` for screen readers
- `aria-live="polite"` for updates
- `aria-busy="true"` during loading
- Keyboard navigation friendly