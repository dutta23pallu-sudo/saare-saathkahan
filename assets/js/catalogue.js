window.SS = window.SS || {};
SS.formatPrice = function(value) {
  if (value === null || value === undefined || value === "") return "Ask for price";
  return new Intl.NumberFormat(SS_CONFIG.currencyLocale || "en-IN", {style:"currency",currency:SS_CONFIG.currency || "INR",maximumFractionDigits:0}).format(Number(value));
};
SS.imagePath = function(path) { return path || "assets/images/placeholder-saree.svg"; };
SS.whatsappUrl = function(message) {
  const number = (SS_CONFIG.whatsappNumber || "").replace(/\D/g,"");
  if (!number || number === "91XXXXXXXXXX") return "#";
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
};
SS.openWhatsApp = function(message) {
  const url = SS.whatsappUrl(message);
  if (url === "#") { alert("Please add your real WhatsApp number in assets/js/config.js before publishing."); return; }
  window.open(url, "_blank", "noopener,noreferrer");
};
SS.getProducts = async function() {
  const endpoint = (SS_CONFIG.productsApiUrl || "").trim();
  const response = await fetch(endpoint || "data/products.json", {cache:"no-store"});
  if (!response.ok) throw new Error("Could not load product catalogue (" + response.status + ")");
  const data = await response.json();
  return Array.isArray(data) ? data : (data.products || []);
};
SS.productUrl = function(product) { return "product.html?id=" + encodeURIComponent(product.id); };
SS.productCard = function(p) {
  const card = document.createElement("article"); card.className = "product-card";
  card.innerHTML = `
    <a class="product-card-link" href="${SS.productUrl(p)}" aria-label="View ${SS.escape(p.name)}">
      <div class="product-card-image"><img src="${SS.escape(SS.imagePath(p.images && p.images[0]))}" alt="${SS.escape(p.name)}" loading="lazy" onerror="this.src='assets/images/placeholder-saree.svg'">
      ${p.badge ? `<span class="product-badge">${SS.escape(p.badge)}</span>` : ""}</div>
      <div class="product-card-info"><div class="product-card-title"><h3>${SS.escape(p.name)}</h3><span>${SS.formatPrice(p.price)}</span></div><p>${SS.escape(p.shortDescription || p.description || "")}</p><span class="view-link">View details ↗</span></div>
    </a>`;
  return card;
};
SS.escape = function(value) { return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); };
SS.initGeneralWhatsApp = function() {
  document.querySelectorAll(".whatsapp-general").forEach(a => {
    const message = "Hello Saree Satkahan! I would like to know more about your saree collection.";
    const url = SS.whatsappUrl(message); if (url !== "#") { a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer"; }
    else a.addEventListener("click", e => { e.preventDefault(); SS.openWhatsApp(message); });
  });
};