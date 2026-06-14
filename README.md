# E-Commerce (JSX Learning Path)

## Overview

This is a learning project for an e-commerce front-end built with React and Vite. It demonstrates common e-commerce features such as product listing, product details, search, cart, user profile, authentication (register/login), wishlist and basic layout patterns.

## Key Features

- Single Page Application built with React (JSX).
- State management via React Contexts (Auth, Cart, Wish, Order).
- UI components for payment card, cart drawer, and wishlist drawer.
- A simple fake API for demo/testing under `src/api`.
- Styles written with plain CSS and Bootstrap.
b
## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- CSS / Boostrap

## Quick Start (Local)

Open a terminal in the project root (`/Users/dg/Desktop/E-Commerce/commerce`) and run the following commands (zsh):

```bash
cd commerce
npm install
npm run dev
```

Then open the shown address (usually `http://localhost:5173`) in your browser.

## Useful Scripts

- `npm run dev` — start the Vite dev server.
- `npm run build` — create a production build.
- `npm run preview` — preview the production build locally.

## Project Structure (important files/folders)

- `commerce/` — app root.
  - `index.html` — HTML template.
  - `src/` — source code.
    - `main.jsx` — entry point.
    - `App.jsx` — root component.
    - `view/` — pages (Home, Products, ProductDetails, Profile, etc.).
    - `components/` — reusable UI components (CartDrawer, WishListDrawer, Loading, etc.).
    - `context/` — React contexts for Auth, Cart, Order, Wish.
    - `api/` — fake API and demo logic.
    - `styles/` and `scss/` — CSS and SCSS files.
  - `package.json` — dependencies and scripts.

## Deployment

You can deploy the app to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.). Build the production files with `npm run build` and upload the `dist` folder to your host.



## Contributing

1. Fork the repository and create a feature branch.
2. Make changes and add tests when possible.
3. Open a Pull Request with a clear description of your changes.

## Developer Notes

- Check `src/context` for logic related to authentication and cart state.
- `src/api/FakeApi.js` contains example logic for loading products and processing orders.

## Contact

If you have questions or want help adding features, open an issue in the repo or contact the maintainers.

## License

This project is intended for learning purposes. Add a license of your choice or use MIT.

---

