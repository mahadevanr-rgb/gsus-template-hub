# 🔘 Button Components - Quick Reference

## Installation & Import

### Import Individual Buttons

```jsx
import { PrimaryButton } from "@/components/atoms/buttons";
import { SecondaryButton } from "@/components/atoms/buttons";
import { AnimatedButton } from "@/components/atoms/buttons";
```

### Import All Buttons

```jsx
import {
  PrimaryButton,
  SecondaryButton,
  AnimatedButton,
  GhostButton,
  GradientButton,
  PulseButton,
  ShadowButton,
  OutlineButton,
  FloatingButton,
  IconButton,
} from "@/components/atoms/buttons";
```

## Basic Usage

```jsx
<PrimaryButton label="Click Me" onClick={() => handleClick()} />
```

## Common Props

All button components accept:

| Prop        | Type       | Required   | Description            |
| ----------- | ---------- | ---------- | ---------------------- |
| `label`     | string     | Yes (most) | Button text            |
| `icon`      | string/JSX | No         | Icon/emoji to display  |
| `onClick`   | function   | No         | Click handler          |
| `className` | string     | No         | Additional CSS classes |
| `disabled`  | boolean    | No         | Disable button         |
| `variant`   | string     | No         | Style variant          |

## Size Modifiers

```jsx
<PrimaryButton label="Small" className="btn-sm" />
<PrimaryButton label="Normal" />
<PrimaryButton label="Large" className="btn-lg" />
<PrimaryButton label="Extra Large" className="btn-xl" />
<PrimaryButton label="Full Width" className="btn-full" />
```

## Real-World Examples

### Form Submission

```jsx
<form onSubmit={handleSubmit}>
  <input type="text" placeholder="Name" />
  <PrimaryButton label="Submit" onClick={handleSubmit} />
</form>
```

### Toggle Actions

```jsx
<div>
  <GhostButton label="Cancel" onClick={handleCancel} />
  <PrimaryButton label="Save" onClick={handleSave} />
</div>
```

### Floating Action Button

```jsx
<FloatingButton icon="+" label="Add New" onClick={handleAdd} />
```

### Animated Call-to-Action

```jsx
<div className="cta-section">
  <h2>Ready to get started?</h2>
  <AnimatedButton label="Start Now" icon="→" onClick={handleStart} />
</div>
```

### Icon Toolbar

```jsx
<div className="toolbar">
  <IconButton icon="✏️" label="Edit" variant="primary" />
  <IconButton icon="🗑️" label="Delete" variant="secondary" />
  <IconButton icon="⚙️" label="Settings" variant="primary" />
</div>
```

### Success/Confirmation Flow

```jsx
{
  showSuccess && (
    <div className="success-message">
      <p>✓ Operation completed!</p>
      <PulseButton label="Done" onClick={() => navigate("/")} />
    </div>
  );
}
```

### Product CTA (Ecommerce Style)

```jsx
<div className="product-card">
  <img src={productImage} />
  <h3>{productName}</h3>
  <p>${price}</p>
  <GradientButton label="Add to Cart" icon="🛒" onClick={handleAddCart} />
  <OutlineButton label="View Details" onClick={handleViewDetails} />
</div>
```

### Navigation Buttons

```jsx
<div className="pagination">
  <OutlineButton label="← Previous" onClick={handlePrev} />
  <span>Page 2 of 10</span>
  <PrimaryButton label="Next →" onClick={handleNext} />
</div>
```

### Status-Based Rendering

```jsx
{
  status === "loading" && <PulseButton label="Processing..." disabled />;
}
{
  status === "success" && <PrimaryButton label="Success ✓" />;
}
{
  status === "error" && (
    <ShadowButton label="Try Again" onClick={handleRetry} />
  );
}
```

## CSS Classes for Customization

```css
/* Size variants */
.btn-sm       /* Small button */
.btn-lg       /* Large button */
.btn-xl       /* Extra large button */
.btn-full     /* Full width button */

/* States */
:disabled     /* Disabled state */
:hover        /* Hover state */
:active       /* Active/pressed state */
:focus        /* Focus state */

/* Type classes */
.btn-primary      /* Primary button */
.btn-secondary    /* Secondary button */
.btn-animated     /* Animated button */
.btn-ghost        /* Ghost button */
.btn-gradient     /* Gradient button */
.btn-pulse        /* Pulse button */
.btn-shadow       /* Shadow button */
.btn-outline      /* Outline button */
.btn-floating     /* Floating button */
.btn-icon-only    /* Icon button */
```

## Styling Custom Buttons

```jsx
// Custom styled button
<PrimaryButton
  label="Custom Button"
  onClick={handleClick}
  className="btn-lg btn-full"
/>
```

```css
/* Custom CSS */
.my-custom-button {
  background-color: #your-color;
  border-radius: 20px;
}

.my-custom-button:hover {
  transform: scale(1.1);
}
```

## Accessibility Tips

```jsx
// Always provide onClick handler
<PrimaryButton label="Action" onClick={handleAction} />

// Use meaningful labels
<PrimaryButton label="Send Message" />  // Good
<PrimaryButton label="Click" />         // Bad

// Provide alternative for icons
<IconButton
  icon="🗑️"
  label="Delete"  // Important for accessibility
/>

// Disabled state
<PrimaryButton
  label="Submit"
  disabled={!formValid}
  onClick={handleSubmit}
/>
```

## Animation Performance

Buttons use CSS animations which are performant. For best results:

```jsx
// Good: Single button
<PrimaryButton label="Click" />

// Good: Multiple buttons (normal)
<PrimaryButton label="Button 1" />
<PrimaryButton label="Button 2" />

// Avoid: Excessive animations
// Don't animate the entire page every millisecond
```

## Mobile Considerations

Buttons automatically adapt to mobile:

- Larger touch targets (48px minimum)
- Adjusted padding on small screens
- Optimized font sizes
- Better tap feedback

```jsx
// Same code works on all devices
<PrimaryButton label="Tap Me" onClick={handleTap} />
```

## Browser Support

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers
- ✅ IE 11+ (with polyfills)

## Performance Tips

1. **Memoize click handlers** for repeated renders
2. **Use useState carefully** to avoid unnecessary re-renders
3. **Lazy load** buttons if you have many
4. **Test animations** on lower-end devices

```jsx
// Good: Memoized handler
const handleClick = useCallback(() => {
  // Handle click
}, []);

<PrimaryButton label="Click" onClick={handleClick} />;
```

## Common Issues & Solutions

### Issue: Button not responding to clicks

```jsx
// Problem
<PrimaryButton label="Click" />

// Solution: Add onClick handler
<PrimaryButton label="Click" onClick={() => console.log('clicked')} />
```

### Issue: Style conflicts

```jsx
// Problem: Class name conflicts
<PrimaryButton className="my-button" />

// Solution: Use higher specificity or modify root styles
<PrimaryButton className="my-btn-override" />
```

### Issue: Animation stuttering

```jsx
// Solution: Ensure hardware acceleration
.btn {
  will-change: transform;
  transform: translate3d(0, 0, 0);
}
```

---

**Need more help? Check the ButtonDetails page in the app for live examples!**
