(async function(){
 const root=document.getElementById("productDetail");if(!root)return;
 const id=new URLSearchParams(location.search).get("id");
 try{
  const products=await SS.getProducts(), p=products.find(x=>x.id===id);
  if(!p){root.innerHTML='<div class="empty-state"><h2>Saree not found</h2><p>This product may have been removed or the link may be incorrect.</p><a class="btn btn-dark" href="index.html#collection">Back to collection</a></div>';return;}
  document.title=p.name+" | Saree Satkahan";document.getElementById("crumbName").textContent=p.name;
  const imgs=(p.images&&p.images.length?p.images:["assets/images/placeholder-saree.svg"]);
  root.innerHTML=`<div class="product-gallery"><div class="main-product-image"><img id="mainProductImage" src="${SS.escape(SS.imagePath(imgs[0]))}" alt="${SS.escape(p.name)}" onerror="this.src='assets/images/placeholder-saree.svg'"></div><div class="thumbnail-row">${imgs.map((src,i)=>`<button class="thumbnail ${i===0?"selected":""}" data-src="${SS.escape(src)}" aria-label="View product image ${i+1}"><img src="${SS.escape(SS.imagePath(src))}" alt=""></button>`).join("")}</div></div>
  <div class="product-summary"><span class="eyebrow">${SS.escape(p.category||"SAREE COLLECTION")}</span><h1>${SS.escape(p.name)}</h1><div class="detail-price">${SS.formatPrice(p.price)}</div><p class="detail-description">${SS.escape(p.description||p.shortDescription||"Contact us for product details.")}</p>
  <div class="detail-specs"><div><span>Fabric</span><strong>${SS.escape(p.fabric||"Please enquire")}</strong></div><div><span>Colour</span><strong>${SS.escape(p.colour||"Please enquire")}</strong></div><div><span>Availability</span><strong>${SS.escape(p.availability||"Please enquire")}</strong></div></div>
  <button class="btn btn-dark buy-now" id="buyNow">Buy Now on WhatsApp ↗</button><p class="small-note">Your order is confirmed personally with our team on WhatsApp. Please confirm availability, shipping and payment details before placing an order.</p><a class="text-link" href="index.html#collection">← Back to all sarees</a></div>`;
  root.querySelectorAll(".thumbnail").forEach(b=>b.addEventListener("click",()=>{root.querySelectorAll(".thumbnail").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");document.getElementById("mainProductImage").src=b.dataset.src;}));
  document.getElementById("buyNow").addEventListener("click",()=>SS.openWhatsApp(`Hello Saree Satkahan! I would like to enquire about / buy this saree:\nProduct: ${p.name}\nPrice: ${SS.formatPrice(p.price)}\nProduct page: ${location.href}\nPlease confirm availability, delivery and payment details.`));
  const related=products.filter(x=>x.id!==p.id&&(x.category===p.category||x.featured)).slice(0,3), target=document.getElementById("relatedGrid");
  related.forEach(x=>target.appendChild(SS.productCard(x)));
 }catch(e){root.innerHTML='<p class="error">Unable to load this product. Please try again.</p>';}
})();