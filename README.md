# 🔣 Latapals Symbols

Over 600 symbols available for you to use, open-source and free to use.

## Installation

To install dependencies:

```bash
bun install @latapals/symbols
```

## Usage

To use the icons, simply import the icon you want to use:

```tsx
import { Cursor } from "@latapals/symbols";
```

and use it in your component, you can also pass in props to the icon and define the size:

```tsx
<Cursor size={16} className="text-blue-500 fill-current" />
```

## All icons

You can find all icons in the `svg` folder.

## Adding other icons

To add custom icons, follow these steps:

1. Fork the repository.
2. Install dependencies with `bun install`
3. Throw the SVG of your icon into the SVG folder
4. Run `bun run build`
5. Push

> [!IMPORTANT]  
> If you're getting errors on a Windows machine, try using WSL.

## Contributing

Please see our [contribution guidelines](/CONTRIBUTING.md). Latapals Symbols is an open-source project.
