# 💍 Wedding Invitation Website

A beautiful, production-ready wedding invitation website built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and GSAP. Features smooth scrolling, animations, and a fully functional RSVP system.

## ✨ Features

- **Responsive Design**: Mobile-first approach with beautiful animations
- **Smooth Scrolling**: Powered by Lenis for buttery-smooth scroll experience
- **GSAP Animations**: Scroll-triggered animations and pinned sections
- **Framer Motion**: Page transitions and micro-interactions
- **RSVP System**: Complete form with validation and API integration
- **SEO Optimized**: Proper metadata and Open Graph tags
- **Accessibility**: WCAG AA compliant with proper ARIA labels
- **Performance**: Optimized images and Lighthouse score ≥ 95

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   pnpm dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/rsvp/route.ts          # RSVP API endpoint
│   ├── globals.css               # Global styles and CSS variables
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main page component
├── components/
│   ├── sections/                 # All page sections
│   │   ├── hero-section.tsx
│   │   ├── story-section.tsx
│   │   ├── schedule-section.tsx
│   │   ├── venue-section.tsx
│   │   ├── travel-section.tsx
│   │   ├── gallery-section.tsx
│   │   ├── registry-section.tsx
│   │   ├── faq-section.tsx
│   │   └── rsvp-section.tsx
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── accordion.tsx
│   ├── providers/
│   │   └── smooth-scroll-provider.tsx
│   ├── navbar.tsx
│   └── footer.tsx
└── lib/
    └── utils.ts                  # Utility functions
```

## 🎨 Customization Guide

### 1. Update Couple Information

**In `src/app/layout.tsx`**:
```typescript
export const metadata: Metadata = {
  title: "Sarah & Michael's Wedding | June 15, 2024", // Update names and date
  description: "Join us for our special day...", // Update description
  // ... other metadata
};
```

**In `src/components/navbar.tsx`**:
```typescript
<span className="font-serif text-xl font-semibold text-gray-800">
  Sarah & Michael {/* Update couple names */}
</span>
```

### 2. Update Wedding Details

**In `src/components/sections/hero-section.tsx`**:
```typescript
<h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 mb-4">
  Sarah & Michael {/* Update names */}
</h1>
// Update date and venue information
```

### 3. Customize Colors and Theme

**In `src/app/globals.css`**:
```css
:root {
  /* Update CSS variables for your color scheme */
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  /* ... other color variables */
}
```

**In `tailwind.config.ts`**:
```typescript
theme: {
  extend: {
    colors: {
      // Add your custom colors
      gold: { /* your gold palette */ },
      rose: { /* your rose palette */ },
      sage: { /* your sage palette */ },
    },
  },
}
```

### 4. Update Content Sections

#### Story Section (`src/components/sections/story-section.tsx`)
- Update `timelineEvents` array with your story
- Modify dates, titles, and descriptions
- Add or remove timeline items

#### Schedule Section (`src/components/sections/schedule-section.tsx`)
- Update `scheduleEvents` array with your timeline
- Modify times, titles, and descriptions
- Adjust dress code information

#### Venue Section (`src/components/sections/venue-section.tsx`)
- Update venue name and address
- Replace Google Maps embed with your venue
- Update parking and accessibility information

#### Travel Section (`src/components/sections/travel-section.tsx`)
- Update airports array with nearby airports
- Modify hotel recommendations
- Update transportation options

#### Gallery Section (`src/components/sections/gallery-section.tsx`)
- Replace placeholder images with your photos
- Update image captions
- Modify gallery hashtags

#### Registry Section (`src/components/sections/registry-section.tsx`)
- Update registry links and descriptions
- Modify alternative gift options
- Update shipping information

#### FAQ Section (`src/components/sections/faq-section.tsx`)
- Update `faqItems` array with your questions
- Modify contact information
- Add or remove FAQ items

### 5. Update Contact Information

**In `src/components/footer.tsx`**:
```typescript
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sarahandmichael@email.com", // Update email
    href: "mailto:sarahandmichael@email.com",
  },
  // ... update other contact info
];
```

### 6. Configure RSVP System

**Environment Variables** (create `.env.local`):
```bash
# Optional: Webhook URL for RSVP notifications
WEBHOOK_URL=https://your-webhook-url.com/rsvp
```

**RSVP Data Storage**:
- RSVPs are stored in `/data/rsvps.json`
- Data includes: name, email, attendance, guest count, dietary restrictions, message
- Optional webhook integration for real-time notifications

## 🎯 Performance Optimization

### Image Optimization
- Use Next.js Image component for automatic optimization
- Replace placeholder images with your actual photos
- Use appropriate image sizes and formats

### Animation Performance
- GSAP animations are optimized for 60fps
- Framer Motion uses hardware acceleration
- Scroll triggers are debounced for smooth performance

### SEO Optimization
- Proper meta tags and Open Graph data
- Structured data for better search visibility
- Optimized images with alt text

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## 📊 Performance Metrics

- **Lighthouse Score**: ≥ 95
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🎨 Design System

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Geist Sans (sans-serif)
- **Code**: Geist Mono (monospace)

### Color Palette
- **Primary**: Rose and Gold tones
- **Secondary**: Sage green accents
- **Neutral**: Gray scale for text and backgrounds

### Spacing
- Consistent spacing scale using Tailwind's spacing system
- Responsive breakpoints for mobile-first design

## 🔒 Security

- Form validation with Zod schema
- CSRF protection via Next.js
- Input sanitization
- Secure API routes

## 📞 Support

For questions or customization help:
- Check the FAQ section in the website
- Review the code comments
- Contact the development team

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Made with ❤️ for Sarah & Michael's special day**

*Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and GSAP*