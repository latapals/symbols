import fs from 'fs';

export const config = {
  inputDir: './svg',
  outputDir: './src',
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    { name: 'prefixIds' },
    // Custom plugin to replace fill="black" with fill="currentColor"
    {
      name: 'replaceFillAndStrokeColor',
      fn: (ast) => {
        const traverse = (node) => {
          if (node.attributes) {
            // Check if the node has a fill attribute
            let hasFill = false;
            let hasStroke = false;
    
            for (const key in node.attributes) {
              // Handle fill attribute
              if (key === 'fill') {
                hasFill = true;
                if (node.attributes[key] === 'black') {
                  node.attributes[key] = 'currentColor';
                }
              }
              if (key === 'fill') {
                hasFill = true;
                if (node.attributes[key] === '#000') {
                  node.attributes[key] = 'currentColor';
                }
              }
              if (key === 'fill') {
                hasFill = true;
                if (node.attributes[key] === '#000000') {
                  node.attributes[key] = 'currentColor';
                }
              }
              // Handle stroke attribute
              if (key === 'stroke') {
                hasStroke = true;
                if (node.attributes[key] === 'black') {
                  node.attributes[key] = 'currentColor';
                }
              }
              if (key === 'stroke') {
                hasStroke = true;
                if (node.attributes[key] === '#000') {
                  node.attributes[key] = 'currentColor';
                }
              }
              if (key === 'stroke') {
                hasStroke = true;
                if (node.attributes[key] === '#000000') {
                  node.attributes[key] = 'currentColor';
                }
              }
            }}
    
          // Traverse child nodes
          if (node.children) {
            node.children.forEach(traverse);
          }
        };
    
        traverse(ast);
      },
    }
    
  ],

  transformFilename: (filename) => {
    // Convert to PascalCase
    const newName = filename
      .replace(/-([a-z])/g, (g) => g[1].toUpperCase()) // Convert dashed to camelCase
      .replace(/^(.)/, (g) => g.toUpperCase())         // Capitalize the first letter for PascalCase
      .replace('.svg', '.tsx');
    return newName;
  },

  after: ({ targets }) => {
    fs.writeFileSync(
      'src/index.ts',
      targets
        .map(
          ({ file, componentName }) =>
            `export { default as ${componentName} } from './${file.replace(
              '.tsx',
              '',
            )}'`,
        )
        .join('\n'),
    );
  },

  svgProps: {
    width: '100%',
    height: '100%',
  },

  template: ({ componentName, jsx }) => `import React from 'react';

export type ${componentName}Props = React.ComponentPropsWithoutRef<'div'> & {
    size?: number;
};

const ${componentName} = React.forwardRef<React.ElementRef<'div'>, ${componentName}Props>(
    ({size, ...props}, ref) => {
        return (
            <div
                {...props}
                style={{
                    scale: 'calc(4/3)',
                    width: size ?? '1em',
                    height: size ?? '1em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    ...(props.style ?? {}),
                    aspectRatio: '1 / 1'
                }}
                ref={ref}
            >
                ${jsx}
            </div>
        );
    },
);

${componentName}.displayName = '${componentName}';

export default ${componentName}`
};
