const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist/css');

// Read all CSS files and combine them
const files = [
  'tokens.css',
  'themes/dark.css',
  'themes/light.css'
];

let combined = `/**
 * Alchemy Design System
 * Auto-generated CSS - Do not edit directly
 *
 * @package @alchemy-ui/core
 * @version 1.0.0
 */

/* ========================================
   Font Import
   ======================================== */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

`;

// Add each file's content
files.forEach(file => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    combined += `/* ${file} */\n${content}\n`;
  }
});

// Add base styles
combined += `
/* ========================================
   Base Styles
   ======================================== */

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-family: var(--font-family-sans);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* ========================================
   Scrollbar Styles
   ======================================== */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--theme-scrollbar-track);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--theme-scrollbar-thumb);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--theme-scrollbar-thumbHover);
}

/* ========================================
   Focus Styles
   ======================================== */

:focus-visible {
  outline: 2px solid var(--theme-border-focus);
  outline-offset: 2px;
}

/* ========================================
   Selection Styles
   ======================================== */

::selection {
  background-color: var(--color-accent-primary);
  color: var(--theme-text-onAccent);
}

/* ========================================
   Keyframe Animations
   ======================================== */

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scaleOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* ========================================
   Glass Effect Utilities
   ======================================== */

.glass {
  background: var(--theme-bg-glass-primary);
  backdrop-filter: blur(var(--blur-xl));
  -webkit-backdrop-filter: blur(var(--blur-xl));
  border: 1px solid var(--theme-border-glass);
}

.glass-heavy {
  background: var(--theme-bg-glass-heavy);
  backdrop-filter: blur(var(--blur-2xl));
  -webkit-backdrop-filter: blur(var(--blur-2xl));
  border: 1px solid var(--theme-border-glass);
}

.glass-modal {
  background: var(--theme-bg-glass-modal);
  backdrop-filter: blur(var(--blur-2xl));
  -webkit-backdrop-filter: blur(var(--blur-2xl));
  border: 1px solid var(--theme-border-glass);
}

/* ========================================
   Gradient Text Utility
   ======================================== */

.text-gradient {
  background: var(--theme-gradient-accentStrong);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ========================================
   Reduced Motion
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// Write combined file
fs.writeFileSync(path.join(distDir, 'alchemy.css'), combined);

console.log('✓ Combined CSS written to dist/css/alchemy.css');
