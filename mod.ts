import fs from 'fs';

const files = ['src/LandingPage.tsx', 'src/Navbar.tsx', 'src/TestimonialSlider.tsx', 'src/FloatingCards.tsx', 'src/App.tsx'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Background replacements
  content = content.replace(/bg-white([^/])/g, 'bg-white dark:bg-[#1E293B]$1');
  content = content.replace(/bg-\[#F4F9FC\]/g, 'bg-[#F4F9FC] dark:bg-[#0p0]'.replace('#0p0', '#0F172A'));
  
  // Text color replacements
  content = content.replace(/text-\[#110195\]/g, 'text-[#110195] dark:text-white');
  content = content.replace(/text-\[#1E293B\]/g, 'text-[#1E293B] dark:text-[#E2E8F0]');
  content = content.replace(/text-gray-600/g, 'text-gray-600 dark:text-gray-300');
  content = content.replace(/text-gray-500/g, 'text-gray-500 dark:text-gray-400');
  
  // Border colors
  content = content.replace(/border-[#110195]/g, 'border-[#110195] dark:border-white/20');
  
  fs.writeFileSync(file, content);
}
console.log('Styles updated.');
