(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))n(c);new MutationObserver(c=>{for(const l of c)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(c){const l={};return c.integrity&&(l.integrity=c.integrity),c.referrerPolicy&&(l.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?l.credentials="include":c.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(c){if(c.ep)return;c.ep=!0;const l=s(c);fetch(c.href,l)}})();const p=document.body,E=document.querySelector(".search-input"),k=document.querySelector(".btn-all");document.querySelectorAll(".item-tittle");const q=document.querySelector(".add-btn"),x=document.querySelector(".mode-toggle"),i=document.querySelector(".toggle-icon"),h=document.querySelector(".add-modal"),f=document.querySelector(".input-modal-add"),A=document.querySelector(".apply"),I=document.querySelector(".cancel"),u=document.querySelector(".edit-modal"),m=document.querySelector(".input-modal-edit"),T=document.querySelector(".apply-changes"),M=document.querySelector(".cancel-edit"),g=document.querySelector(".delete-modal"),w=document.querySelector(".delete-yes"),O=document.querySelector(".delete-no"),v=document.querySelector(".empty-element"),d=document.querySelector(".task-list");document.addEventListener("DOMContentLoaded",()=>{const t=localStorage.getItem("filter")||"all";k.value=t,y(t),localStorage.getItem("theme")==="dark"?(i.setAttribute("href","./img/symbol-defs.svg#icon-sun"),L()):(i.setAttribute("href","./img/symbol-defs.svg#icon-moon"),S())});let o=JSON.parse(localStorage.getItem("tasksArray"))||[];o.length>0&&(v.classList.add("hidden"),a(o,d));q.addEventListener("click",()=>{h.classList.remove("hidden")});x.addEventListener("click",()=>{document.body.classList.toggle("dark-theme"),document.body.classList.contains("dark-theme")?(i.setAttribute("href","./img/symbol-defs.svg#icon-sun"),localStorage.setItem("theme","dark"),L()):(i.setAttribute("href","./img/symbol-defs.svg#icon-moon"),localStorage.setItem("theme","light"),S())});A.addEventListener("click",()=>{const t=f.value,e=Date.now();o.push({text:t,id:e,completed:!1}),localStorage.setItem("tasksArray",JSON.stringify(o)),console.log(o),b(h),o.length>0&&v.classList.add("hidden"),a(o,d),f.value="",console.log(t)});I.addEventListener("click",()=>{b(h),f.value=""});d.addEventListener("click",t=>{const e=t.target.closest(".task-container");if(!e)return;const s=Number(e.dataset.id);if(console.log(s),t.target.closest(".btn-edid")&&N(s),t.target.closest(".btn-delete")&&D(s),t.target.closest(".checkbox-container")){const n=Number(e.dataset.id);B(n)}});k.addEventListener("change",t=>{const e=t.target.value;localStorage.setItem("filter",e),y(e)});E.addEventListener("input",t=>{let e=t.target.value.toLowerCase();const s=o.filter(n=>{if(console.log(e),n.text.toLowerCase().includes(e))return n});e.trim()===""?a(o,d):a(s,d)});function y(t){let e;switch(t){case"all":e=o;break;case"complete":e=o.filter(s=>s.completed);break;case"incomplete":e=o.filter(s=>!s.completed);break}a(e,d)}function a(t,e){e.innerHTML="",t.forEach(s=>{e.insertAdjacentHTML("beforeend",`<li class="task-container " data-id=${s.id}>
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
              <button class="btn-list btn-edid"> edit
                <svg class="svg-list">
                  <symbol id="icon-edit" viewBox="0 0 32 32">
      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.778" d="M15.418 10.651 3.555 22.513v5.931h5.931l11.863-11.862m-5.931-5.931 4.256-4.256c.585-.586.879-.879 1.217-.989.298-.097.619-.097.916 0 .338.11.631.403 1.215.987l2.58 2.58c.587.587.881.881.991 1.22.097.298.097.619 0 .916-.11.338-.403.632-.99 1.218l-4.255 4.255m-5.93-5.931 5.931 5.931"/>
    </symbol>
                </svg></button
              ><button class="btn-list btn-delete">delete
                <svg class="svg-list">
                  <symbol id="icon-delete" viewBox="0 0 32 32">
      <path stroke-width="1.778" d="M6.888 13.538a2.666 2.666 0 0 1 2.659-2.871h12.907a2.666 2.666 0 0 1 2.659 2.871l-.923 12A2.667 2.667 0 0 1 21.531 28H10.47a2.667 2.667 0 0 1-2.659-2.462l-.923-12z"/>
      <path stroke-linecap="round" stroke-width="1.778" d="M26 6.667H6"/>
      <path stroke-width="1.778" d="M13.333 4c0-.736.597-1.333 1.333-1.333h2.667c.736 0 1.333.597 1.333 1.333v2.667h-5.333V4z"/>
      <path stroke-linecap="round" stroke-width="1.778" d="M18.667 16v6.667M13.333 16v6.667"/>
    </symbol>
                </svg>
              </button>
            </div>
          </li>`)})}function N(t){u.classList.remove("hidden");const e=o.find(s=>s.id===t);console.log(m.value),m.value=e.text,T.addEventListener("click",s=>{const n=o.find(c=>c.id===t);n.text=m.value,localStorage.setItem("tasksArray",JSON.stringify(o)),a(o,d),u.classList.add("hidden")}),M.addEventListener("click",()=>{u.classList.add("hidden")})}function D(t){g.classList.remove("hidden"),w.addEventListener("click",()=>{o=o.filter(s=>s.id!==t),localStorage.setItem("tasksArray",JSON.stringify(o)),a(o,d),g.classList.add("hidden")}),O.addEventListener("click",()=>{g.classList.add("hidden")})}const b=t=>{t.classList.add("hidden")};function B(t){const e=o.find(s=>s.id===t);e.completed=!e.completed,localStorage.setItem("tasksArray",JSON.stringify(o)),y("all")}function L(){p.classList.add("body-night")}function S(){p.classList.remove("body-night")}
//# sourceMappingURL=index.js.map
