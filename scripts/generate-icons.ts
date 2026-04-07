import { transform } from '@svgr/core';
import fs from 'fs';
import path from 'path';

const ICON_SOURCE = path.join(__dirname, '..', 'assets', 'icons')
const ICON_OUTPUT = path.join(__dirname, '..', 'components', 'ui', 'icons')

async function generate() {
  if (!fs.existsSync(ICON_OUTPUT)) {
    fs.mkdirSync(ICON_OUTPUT, { recursive: true });
  }

  const files = fs.readdirSync(ICON_SOURCE).filter(file => file.endsWith('.svg'));
  let barrelExcerpts = '';

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
        svgProps: { className: '{props.className}', fill: 'currentColor', stroke: 'currentColor' },
      },
      { componentName },
    );

    fs.writeFileSync(path.join(ICON_OUTPUT, `${componentName}.tsx`), jsCode);
    barrelExcerpts += `export { default as ${componentName} } from './${componentName}';\n`;
  }

  fs.writeFileSync(path.join(ICON_OUTPUT, 'index.ts'), barrelExcerpts);
}

generate();