(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))n(c);new MutationObserver(c=>{for(const l of c)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(c){const l={};return c.integrity&&(l.integrity=c.integrity),c.referrerPolicy&&(l.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?l.credentials="include":c.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(c){if(c.ep)return;c.ep=!0;const l=o(c);fetch(c.href,l)}})();const v=document.body,A=document.querySelector(".search-input"),k=document.querySelector(".btn-all");document.querySelectorAll(".item-tittle");const I=document.querySelector(".add-btn"),x=document.querySelector(".delete-list"),T=document.querySelector(".mode-toggle"),i=document.querySelector(".toggle-icon"),y=document.querySelector(".add-modal"),h=document.querySelector(".input-modal-add"),M=document.querySelector(".apply"),O=document.querySelector(".cancel"),u=document.querySelector(".edit-modal"),m=document.querySelector(".input-modal-edit"),w=document.querySelector(".apply-changes"),N=document.querySelector(".cancel-edit"),g=document.querySelector(".delete-modal"),D=document.querySelector(".delete-yes"),J=document.querySelector(".delete-no"),f=document.querySelector(".delete-list-modal"),b=document.querySelector(".empty-element"),d=document.querySelector(".task-list");document.addEventListener("DOMContentLoaded",()=>{const t=localStorage.getItem("filter")||"all";k.value=t,p(t),localStorage.getItem("theme")==="dark"?(i.setAttribute("href","./img/symbol-defs.svg#icon-sun"),S()):(i.setAttribute("href","./img/symbol-defs.svg#icon-moon"),E())});let s=JSON.parse(localStorage.getItem("tasksArray"))||[];q();I.addEventListener("click",()=>{y.classList.remove("hidden")});x.addEventListener("click",t=>{f.classList.remove("hidden");const e=document.querySelector(".delete-list-btn");document.querySelector(".cancel-delete-list-btn").addEventListener("click",()=>{console.log(5),f.classList.add("hidden")}),e.addEventListener("click",()=>{console.log(4),s=[],a(s,d),localStorage.setItem("tasksArray",JSON.stringify(s)),f.classList.add("hidden")})});T.addEventListener("click",()=>{document.body.classList.toggle("dark-theme"),document.body.classList.contains("dark-theme")?(i.setAttribute("href","./img/symbol-defs.svg#icon-sun"),localStorage.setItem("theme","dark"),S()):(i.setAttribute("href","./img/symbol-defs.svg#icon-moon"),localStorage.setItem("theme","light"),E())});M.addEventListener("click",()=>{const t=h.value,e=Date.now();s.push({text:t,id:e,completed:!1}),localStorage.setItem("tasksArray",JSON.stringify(s)),console.log(s),L(y),s.length>0&&b.classList.add("hidden"),a(s,d),h.value="",console.log(t)});O.addEventListener("click",()=>{L(y),h.value=""});d.addEventListener("click",t=>{const e=t.target.closest(".task-container");if(!e)return;const o=Number(e.dataset.id);if(console.log(o),t.target.closest(".btn-edid")&&B(o),t.target.closest(".btn-delete")&&H(o),t.target.closest(".checkbox-container")){const n=Number(e.dataset.id);P(n)}});k.addEventListener("change",t=>{const e=t.target.value;localStorage.setItem("filter",e),p(e)});A.addEventListener("input",t=>{let e=t.target.value.toLowerCase();const o=s.filter(n=>{if(console.log(e),n.text.toLowerCase().includes(e))return n});e.trim()===""?a(s,d):a(o,d)});function p(t){let e;switch(t){case"all":e=s;break;case"complete":e=s.filter(o=>o.completed);break;case"incomplete":e=s.filter(o=>!o.completed);break}a(e,d)}function a(t,e){e.innerHTML="",t.forEach(o=>{e.insertAdjacentHTML("beforeend",`<li class="task-container " data-id=${o.id}>
            <div class="checkbox-container">
              <input
                type="checkbox"
                name="custom-checkbox"
                id="custom-checkbox"
                class="input-checkbox visually-hidden"
                ${o.completed?"checked":""}
              />
              <label for="custom-checkbox" class="checkbox-label">
                <span>
                  <svg class="svg-chacckbox">
                    <use href="./img/symbol-defs.svg#icon-Rectangle-18"></use>
                  </svg>
                </span>
                <p class="item-tittle">${o.text}</p>
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
          </li>`)})}function B(t){u.classList.remove("hidden");const e=s.find(o=>o.id===t);console.log(m.value),m.value=e.text,w.addEventListener("click",o=>{const n=s.find(c=>c.id===t);n.text=m.value,localStorage.setItem("tasksArray",JSON.stringify(s)),a(s,d),u.classList.add("hidden")}),N.addEventListener("click",()=>{u.classList.add("hidden")})}function H(t){g.classList.remove("hidden"),D.addEventListener("click",()=>{s=s.filter(o=>o.id!==t),localStorage.setItem("tasksArray",JSON.stringify(s)),a(s,d),g.classList.add("hidden")}),J.addEventListener("click",()=>{g.classList.add("hidden")}),q()}const L=t=>{t.classList.add("hidden")};function P(t){const e=s.find(o=>o.id===t);e.completed=!e.completed,localStorage.setItem("tasksArray",JSON.stringify(s)),p("all")}function S(){v.classList.add("body-night")}function E(){v.classList.remove("body-night")}function q(){s.length>0&&(b.classList.add("hidden"),a(s,d))}
//# sourceMappingURL=index.js.map
