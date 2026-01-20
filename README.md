# Sanvya Software - Hospital Management System

A overview of the project . Read this file to understand the project structure and how to contribute to it.
Only the Frontend is described here . The Backend is not described here .

---

## 🚨 Vital Development Guidelines

**All contributors must strictly adhere to the following rules.**

### 1. 🎨 Styling: Tailwind CSS ONLY

- **Strict Requirement**: Use [Tailwind CSS](https://tailwindcss.com/) for ALL styling.
- **Prohibited**: Do NOT use raw CSS modules, SCSS, or inline styles unless absolutely unavoidable for complex animations not possible with Tailwind.
- **Consistency**: Utilize the configured `globals.css` variable and the `components.json` configuration.

### 2. 🖼️ Icons: Lucide React ONLY

- **Strict Requirement**: Use [Lucide React](https://lucide.dev/) for ALL icons.
- **Prohibited**: Do NOT install or use FontAwesome, Material Icons, HeroIcons, or any other icon library.
- **Usage**:
  ```tsx
  import { Activity } from "lucide-react";
  // ...
  <Activity className="h-4 w-4" />;
  ```

### 3. ☀️ Theme: Light Mode ONLY

- **Strict Requirement**: This project is **Light Mode ONLY**.
- **Prohibited**: Do NOT implement, enable, or test Dark Mode.
- **Design System**: Stick to the "Strict Blue & White" professional theme defined in the design tokens.
- **Note**: While `next-themes` might be present in dependencies, it should be configured to force light mode or disregarded for new feature development.

---

## 🛠️ Tech Stack

This project is built on a modern Next.js ecosystem.

| Category          | Technology                                                                  | Version       | Usage                               |
| ----------------- | --------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| **Framework**     | [Next.js](https://nextjs.org/)                                              | v16 `app` dir | Core application framework          |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                               | v5+           | Static typing (Strict mode enabled) |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/)                                    | v4            | Utility-first CSS framework         |
| **UI Components** | [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/) | Latest        | Accessible, headless UI primitives  |
| **Icons**         | [Lucide React](https://lucide.dev/)                                         | Latest        | Consistent icon set                 |
| **Forms**         | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)   | Latest        | Form handling and schema validation |
| **Animations**    | [Framer Motion](https://www.framer.com/motion/)                             | v12           | Complex animations and gestures     |
| **Charts**        | [Recharts](https://recharts.org/)                                           | Latest        | Data visualization                  |

---

## 📂 Project Structure

```bash
.
├── app/                  # Next.js App Router pages and layouts
│   ├── auth/             # Authentication routes
│   └── globals.css       # Global styles and Tailwind directives
├── components/           # React components
│   ├── ui/               # Shadcn UI primitives (Buttons, Inputs, etc.)
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions and shared logic
├── public/               # Static assets (images, fonts)
└── styles/               # Additional style configurations (if any)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` or `pnpm` or `yarn`

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Scripts

| Script  | Command      | Description                                      |
| ------- | ------------ | ------------------------------------------------ |
| `dev`   | `next dev`   | Starts the development server with hot-reloading |
| `build` | `next build` | Creates an optimized production build            |
| `start` | `next start` | Starts the production server                     |
| `lint`  | `eslint .`   | Runs ESLint checks                               |

---

## 🤝 Contribution Workflow

1. **Components**: When creating new UI elements, check `components/ui` first. If a primitive exists (e.g., Button, Input), USE IT. Do not reinvent the wheel.
2. **Icons**: Always search [Lucide Icons](https://lucide.dev/icons) before deciding an icon is missing.
3. **Clean Code**: Ensure no TypeScript errors or linting warnings before pushing.

---

## Lead Engineer

Pratham bhaiiiiiii.
_© 2024 Sanvya Software. All rights reserved._
