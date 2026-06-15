import fs from 'fs';

const files = ['src/LandingPage.tsx', 'src/Navbar.tsx', 'src/TestimonialSlider.tsx', 'src/FloatingCards.tsx', 'src/App.tsx'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Background replacements
  content = content.replace(/bg-white\/90/g, 'bg-white/90 dark:bg-[#1E293B]/90');
  content = content.replace(/bg-white\/80/g, 'bg-white/80 dark:bg-[#1E293B]/80');
  content = content.replace(/bg-\[#F4F9FC\]\/90/g, 'bg-[#F4F9FC]/90 dark:bg-[#0F172A]/90');
  
  fs.writeFileSync(file, content);
}
console.log('Styles updated further.');
