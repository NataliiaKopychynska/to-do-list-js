(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const n of c)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function s(c){const n={};return c.integrity&&(n.integrity=c.integrity),c.referrerPolicy&&(n.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?n.credentials="include":c.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(c){if(c.ep)return;c.ep=!0;const n=s(c);fetch(c.href,n)}})();const k=document.body,A=document.querySelector(".search-input"),b=document.querySelector(".btn-all");document.querySelectorAll(".item-tittle");const I=document.querySelector(".add-btn"),w=document.querySelector(".delete-list"),x=document.querySelector(".mode-toggle"),g=document.querySelector(".toggle-icon"),u=document.querySelector(".add-modal"),f=document.querySelector(".input-modal-add"),h=document.querySelector(".edit-modal"),y=document.querySelector(".input-modal-edit"),T=document.querySelector(".apply-changes"),M=document.querySelector(".cancel-edit"),p=document.querySelector(".delete-modal"),O=document.querySelector(".delete-yes"),N=document.querySelector(".delete-no"),m=document.querySelector(".delete-list-modal"),L=document.querySelector(".empty-element"),d=document.querySelector(".task-list");document.addEventListener("DOMContentLoaded",t=>{const e=localStorage.getItem("filter")||"all";b.value=e,v(e),localStorage.getItem("theme")==="dark"?(g.setAttribute("href","./img/symbol-defs.svg#icon-sun"),S()):(g.setAttribute("href","./img/symbol-defs.svg#icon-moon"),E())});let o=JSON.parse(localStorage.getItem("tasksArray"))||[];q();I.addEventListener("click",()=>{u.classList.remove("hidden"),u.addEventListener("click",t=>{const e=document.querySelector(".add-window"),s=document.querySelector(".apply"),l=document.querySelector(".cancel");e.contains(t.target)||r(u),s.addEventListener("click",()=>{const c=document.querySelector(".error-message"),n=f.value,a=Date.now();if(n.trim()===""){c.classList.remove("hidden");return}c.classList.add("hidden"),o.push({text:n,id:a,completed:!1}),localStorage.setItem("tasksArray",JSON.stringify(o)),r(u),o.length>0&&L.classList.add("hidden"),i(o,d),f.value="",console.log(n)}),l.addEventListener("click",()=>{r(u),f.value=""})})});w.addEventListener("click",t=>{m.classList.remove("hidden");const e=document.querySelector(".delete-list-window"),s=document.querySelector(".delete-list-btn"),l=document.querySelector(".cancel-delete-list-btn");m.addEventListener("click",c=>{e.contains(c.target)||r(m),l.addEventListener("click",()=>{r(m)}),s.addEventListener("click",()=>{o=[],i(o,d),localStorage.setItem("tasksArray",JSON.stringify(o)),r(m)})})});x.addEventListener("click",()=>{document.body.classList.toggle("dark-theme"),document.body.classList.contains("dark-theme")?(g.setAttribute("href","./img/symbol-defs.svg#icon-sun"),localStorage.setItem("theme","dark"),S()):(g.setAttribute("href","./img/symbol-defs.svg#icon-moon"),localStorage.setItem("theme","light"),E())});d.addEventListener("click",t=>{const e=t.target.closest(".task-container");if(!e)return;const s=Number(e.dataset.id);if(console.log(s),t.target.closest(".btn-edid")&&D(s),t.target.closest(".btn-delete")&&J(s),t.target.closest(".checkbox-container")){const l=Number(e.dataset.id);B(l)}});b.addEventListener("change",t=>{const e=t.target.value;localStorage.setItem("filter",e),v(e)});A.addEventListener("input",t=>{let e=t.target.value.toLowerCase();const s=o.filter(l=>{if(console.log(e),l.text.toLowerCase().includes(e))return l});e.trim()===""?i(o,d):i(s,d)});function v(t){let e;switch(t){case"all":e=o;break;case"complete":e=o.filter(s=>s.completed);break;case"incomplete":e=o.filter(s=>!s.completed);break}i(e,d)}function i(t,e){e.innerHTML="",t.forEach(s=>{e.insertAdjacentHTML("beforeend",`<li class="task-container " data-id=${s.id}>
            <div class="checkbox-container">
              <input
                type="checkbox"
                name="custom-checkbox"
                id="custom-checkbox"
                class="input-checkbox visually-hidden"
                ${s.completed?"checked":""}
              />
              <label for="custom-checkbox" class="checkbox-label">
                <span>
                  <svg class="svg-chacckbox">
                    <use href="./img/symbol-defs.svg#icon-Rectangle-18"></use>
                  </svg>
                </span>
                <p class="item-tittle">${s.text}</p>
              </label>
            </div>
            <div class="btn-container-add-delete">
          <button class="btn-list btn-edit">
            <svg class="svg-list" viewBox="0 0 32 32">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.778" d="M15.418 10.651 3.555 22.513v5.931h5.931l11.863-11.862m-5.931-5.931 4.256-4.256c.585-.586.879-.879 1.217-.989.298-.097.619-.097.916 0 .338.11.631.403 1.215.987l2.58 2.58c.587.587.881.881.991 1.22.097.298.097.619 0 .916-.11.338-.403.632-.99 1.218l-4.255 4.255m-5.93-5.931 5.931 5.931"/>
            </svg>
          </button>
          <button class="btn-list btn-delete">
            <svg class="svg-list" viewBox="0 0 32 32">
              <path stroke-width="1.778" d="M6.888 13.538a2.666 2.666 0 0 1 2.659-2.871h12.907a2.666 2.666 0 0 1 2.659 2.871l-.923 12A2.667 2.667 0 0 1 21.531 28H10.47a2.667 2.667 0 0 1-2.659-2.462l-.923-12z"/>
              <path stroke-linecap="round" stroke-width="1.778" d="M26 6.667H6"/>
              <path stroke-width="1.778" d="M13.333 4c0-.736.597-1.333 1.333-1.333h2.667c.736 0 1.333.597 1.333 1.333v2.667h-5.333V4z"/>
              <path stroke-linecap="round" stroke-width="1.778" d="M18.667 16v6.667M13.333 16v6.667"/>
            </svg>
          </button>
        </div>
          </li>`)})}function D(t){h.classList.remove("hidden");const e=o.find(s=>s.id===t);console.log(y.value),y.value=e.text,T.addEventListener("click",s=>{const l=o.find(c=>c.id===t);l.text=y.value,localStorage.setItem("tasksArray",JSON.stringify(o)),i(o,d),h.classList.add("hidden")}),M.addEventListener("click",()=>{h.classList.add("hidden")})}function J(t){p.classList.remove("hidden"),O.addEventListener("click",()=>{o=o.filter(s=>s.id!==t),localStorage.setItem("tasksArray",JSON.stringify(o)),i(o,d),p.classList.add("hidden")}),N.addEventListener("click",()=>{p.classList.add("hidden")}),q()}const r=t=>{t.classList.add("hidden")};function B(t){const e=o.find(s=>s.id===t);e.completed=!e.completed,localStorage.setItem("tasksArray",JSON.stringify(o)),v("all")}function S(){k.classList.add("body-night")}function E(){k.classList.remove("body-night")}function q(){o.length>0&&(L.classList.add("hidden"),i(o,d))}
//# sourceMappingURL=index.js.map
