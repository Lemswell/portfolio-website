// scripts/generate-icons.ts
import { transform } from '@svgr/core';
import fs from 'fs';
import path from 'path';

const ICON_SOURCE = '..assets/icons';
const ICONS_OUTPUT = '../components/ui/iconIndex.tsx';

async function generate() {
  const files = fs.readdirSync(ICON_SOURCE).filter(file => file.endsWith('.svg'));
  let iconIndexCode = '';

  for (const file of files) {
    const componentName = path.parse(file).name.charAt(0).toUpperCase() + path.parse(file).name.slice(1);
    const svgCode = fs.readFileSync(path.join(ICON_SOURCE, file), 'utf8');
    // Transforms raw SVG into a React Component
    const jsCode = await transform(
      svgCode,
      {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        icon: true,
        typescript: true,
        replaceAttrValues: { '#000': 'currentColor', '#000000': 'currentColor' },
        svgProps: { className: '{props.className}', fill: 'currentColor' },
      },
      { componentName }
    );

    iconIndexCode += `${jsCode}\nexport { default as ${componentName} } from './${componentName}';\n`;
  }

  fs.writeFileSync(ICONS_OUTPUT, iconIndexCode);
}

generate();