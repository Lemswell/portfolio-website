// scripts/generate-icons.ts
import { transform } from '@svgr/core';
import fs from 'fs';
import path from 'path';

const ICON_SOURCE = '../public/icons';
const ICON_OUTPUT = '../components/icons';

async function generate() {
  const files = fs.readdirSync(ICON_SOURCE).filter(file => file.endsWith('.svg'));

  for (const file of files) {
    const svgCode = fs.readFileSync(path.join(ICON_SOURCE, file), 'utf8');
    const componentName = path.parse(file).name.charAt(0).toUpperCase() + path.parse(file).name.slice(1);

    // Transform raw SVG into a React Component
    const jsCode = await transform(
      svgCode,
      {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        icon: true,
        typescript: true,
        // Crucial: replaces hardcoded colors with 'currentColor'
        replaceAttrValues: { '#000': 'currentColor', '#000000': 'currentColor' },
        svgProps: { className: '{props.className}', fill: 'currentColor' },
      },
      { componentName }
    );

    fs.writeFileSync(path.join(ICON_OUTPUT, `${componentName}.tsx`), jsCode);
  }
  console.log('✅ Icons generated successfully!');
}

generate();