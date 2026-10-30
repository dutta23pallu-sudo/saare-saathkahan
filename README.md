# Saree Satkahan — GitHub Pages Storefront

A responsive, multi-page saree catalogue built with HTML, CSS and vanilla JavaScript. No build step or paid hosting required.

## Pages
- `index.html` — homepage, search, category filters and product grid
- `product.html?id=festive-edit` — reusable individual product detail page
- `about.html` — brand story
- `contact.html` — contact / WhatsApp page

## 1. Configure WhatsApp
Edit `assets/js/config.js` and replace:
```js
whatsappNumber: "91XXXXXXXXXX"
```
with your active WhatsApp number including country code, digits only. Example format: `919876543210`.

## 2. Add your saree photos
1. Upload photos into `assets/images/`.
2. Open `data/products.json`.
3. For the product you want to update, change its `images` array:
```json
"images": [
  "assets/images/red-kanjivaram-front.jpg",
  "assets/images/red-kanjivaram-border.jpg"
]
```
4. Keep the first image as the main catalogue image. Additional images appear as thumbnails on the product page.
5. Change the hero image in `index.html` by replacing `assets/images/placeholder-saree.svg` with your preferred image path. You can also change the story image there.

## 3. Set prices and descriptions
Edit `data/products.json`. Each product supports:
- `id` — unique URL key; use lowercase and hyphens
- `name`
- `category` — used by the category filters
- `badge`
- `price` — number only, e.g. `3499` (or `null` to show “Ask for price”)
- `shortDescription`
- `description`
- `fabric`, `colour`, `availability`
- `images` — array of image paths
- `featured` — true/false

Example:
```json
{
  "id": "red-kanjivaram",
  "name": "Red Kanjivaram Silk Saree",
  "category": "Festive",
  "badge": "New arrival",
  "price": 8500,
  "shortDescription": "Traditional silk with a rich zari border.",
  "description": "Add full product description, weave details and care instructions here.",
  "fabric": "Silk",
  "colour": "Red and gold",
  "availability": "In stock",
  "images": ["assets/images/red-kanjivaram.jpg"],
  "featured": true
}
```
To add a product, add another object to the JSON array. Ensure every `id` is unique and the JSON syntax is valid (commas and quotes matter).

## 4. WhatsApp checkout behaviour
On a product detail page, **Buy Now on WhatsApp** opens a pre-filled message containing the product name, displayed price and page URL. It is an enquiry/confirmation flow, not an online payment gateway. Confirm availability, delivery and payment manually.

## 5. Publish to GitHub Pages
1. Extract the ZIP.
2. Upload the contents of this folder to the root of your existing repository `paulsubh-lab/saree-satkahan` (not the outer ZIP folder).
3. Commit to the branch/folder configured in **Repository → Settings → Pages**.
4. Open the GitHub Pages URL and test the homepage and a product detail page.

Relative paths are used, so the project works under a GitHub Pages project URL such as `https://paulsubh-lab.github.io/saree-satkahan/`.

## 6. Preview locally
Because the site loads `data/products.json` using `fetch`, do not open `index.html` directly as a `file://` URL. Run a local static server from this folder:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## 7. Optional Spring Boot backend integration
The default version reads `data/products.json`. If you later expose a public JSON endpoint with the same array shape, set `productsApiUrl` in `assets/js/config.js`:
```js
productsApiUrl: "https://api.example.com/api/products"
```
Your endpoint should return JSON with the same fields documented above and allow public read access (CORS must allow your website origin). The frontend uses `fetch()` and displays the returned catalogue.

**Important:** A GitHub Pages website cannot securely host admin credentials or write changes to `products.json`. To manage products from a protected dashboard, implement authenticated Spring Boot endpoints and an admin UI, or update the JSON file and redeploy. Do not put database passwords, API secrets or private admin tokens in frontend JavaScript.

## Suggested next backend endpoints
- `GET /api/products` — public product list
- `GET /api/products/{id}` — public product detail
- `POST /api/admin/products` — create product (authenticated)
- `PUT /api/admin/products/{id}` — update price/details (authenticated)
- `DELETE /api/admin/products/{id}` — remove product (authenticated)
- `POST /api/admin/products/{id}/images` — upload product image (authenticated)

For uploads, store images in object storage or your backend media store and return public HTTPS image URLs. Keep admin authentication and authorization on the server.

## Before launch checklist
- [ ] Replace demo WhatsApp number in `assets/js/config.js`
- [ ] Replace placeholder photos with your own product photos
- [ ] Replace sample product names, descriptions and prices
- [ ] Confirm stock, shipping, return and payment terms
- [ ] Test all product links and WhatsApp messages on mobile
- [ ] Add your custom domain later through GitHub Pages → Settings → Pages
