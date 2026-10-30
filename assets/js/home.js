(async function(){
 const grid=document.getElementById("productGrid"); if(!grid)return;
 const filters=document.getElementById("categoryFilters"), search=document.getElementById("searchInput"), sort=document.getElementById("sortSelect"), count=document.getElementById("resultCount");
 let products=[], category="All";
 try{products=await SS.getProducts();}catch(err){grid.innerHTML='<p class="error">The collection could not be loaded. Check data/products.json and run this site through a local web server.</p>';count.textContent="";return;}
 const categories=["All",...new Set(products.map(p=>p.category).filter(Boolean))];
 filters.innerHTML=categories.map(c=>`<button class="filter-chip ${c==="All"?"active":""}" data-category="${SS.escape(c)}">${SS.escape(c==="All"?"All sarees":c)}</button>`).join("");
 filters.addEventListener("click",e=>{const b=e.target.closest("button[data-category]");if(!b)return;category=b.dataset.category;filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));render();});
 function render(){
  let list=products.filter(p=>(category==="All"||p.category===category)&&(`${p.name} ${p.category} ${p.shortDescription||""}`).toLowerCase().includes(search.value.toLowerCase()));
  if(sort.value==="price-low")list.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));
  if(sort.value==="price-high")list.sort((a,b)=>(b.price??-Infinity)-(a.price??-Infinity));
  if(sort.value==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
  if(sort.value==="featured")list.sort((a,b)=>Number(!!b.featured)-Number(!!a.featured));
  count.textContent=`Showing ${list.length} ${list.length===1?"saree":"sarees"}`;
  grid.innerHTML=""; if(!list.length){grid.innerHTML='<p class="empty-state">No sarees found. Try another search or category.</p>';return;}
  list.forEach(p=>grid.appendChild(SS.productCard(p)));
 }
 search.addEventListener("input",render);sort.addEventListener("change",render);render();
})();