(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const n of c)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function s(c){const n={};return c.integrity&&(n.integrity=c.integrity),c.referrerPolicy&&(n.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?n.credentials="include":c.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(c){if(c.ep)return;c.ep=!0;const n=s(c);fetch(c.href,n)}})();const p=document.body,E=document.querySelector(".search-input"),b=document.querySelector(".btn-all");document.querySelectorAll(".item-tittle");const q=document.querySelector(".add-btn"),I=document.querySelector(".mode-toggle"),i=document.querySelector(".toggle-icon"),y=document.querySelector(".add-modal"),f=document.querySelector(".input-modal-add"),T=document.querySelector(".apply"),A=document.querySelector(".cancel"),u=document.querySelector(".edit-modal"),m=document.querySelector(".input-modal-edit"),x=document.querySelector(".apply-changes"),O=document.querySelector(".cancel-edit"),g=document.querySelector(".delete-modal"),N=document.querySelector(".delete-yes"),D=document.querySelector(".delete-no"),v=document.querySelector(".empty-element"),d=document.querySelector(".task-list");document.addEventListener("DOMContentLoaded",()=>{const t=localStorage.getItem("filter")||"all";b.value=t,h(t),localStorage.getItem("theme")==="dark"?(i.setAttribute("href","./img/symbol-defs.svg#icon-sun"),L()):(i.setAttribute("href","./img/symbol-defs.svg#icon-moon"),S())});let o=JSON.parse(localStorage.getItem("tasksArray"))||[];o.length>0&&(v.classList.add("hidden"),a(o,d));q.addEventListener("click",()=>{y.classList.remove("hidden")});I.addEventListener("click",()=>{document.body.classList.toggle("dark-theme"),document.body.classList.contains("dark-theme")?(i.setAttribute("href","./img/symbol-defs.svg#icon-sun"),localStorage.setItem("theme","dark"),L()):(i.setAttribute("href","./img/symbol-defs.svg#icon-moon"),localStorage.setItem("theme","light"),S())});T.addEventListener("click",()=>{const t=f.value,e=Date.now();o.push({text:t,id:e,completed:!1}),localStorage.setItem("tasksArray",JSON.stringify(o)),console.log(o),k(y),o.length>0&&v.classList.add("hidden"),a(o,d),f.value="",console.log(t)});A.addEventListener("click",()=>{k(y),f.value=""});d.addEventListener("click",t=>{const e=t.target.closest(".task-container");if(!e)return;const s=Number(e.dataset.id);if(console.log(s),t.target.closest(".btn-edid")&&M(s),t.target.closest(".btn-delete")&&w(s),t.target.closest(".checkbox-container")){const l=Number(e.dataset.id);J(l)}});b.addEventListener("change",t=>{const e=t.target.value;localStorage.setItem("filter",e),h(e)});E.addEventListener("input",t=>{let e=t.target.value.toLowerCase();const s=o.filter(l=>{if(console.log(e),l.text.toLowerCase().includes(e))return l});e.trim()===""?a(o,d):a(s,d)});function h(t){let e;switch(t){case"all":e=o;break;case"complete":e=o.filter(s=>s.completed);break;case"incomplete":e=o.filter(s=>!s.completed);break}a(e,d)}function a(t,e){e.innerHTML="",t.forEach(s=>{e.insertAdjacentHTML("beforeend",`<li class="task-container " data-id=${s.id}>
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
              <button class="btn-list btn-edid">
                <svg class="svg-list">
                  <use href="../assets/edit.svg"></use>
                </svg></button
              ><button class="btn-list btn-delete">
                <svg class="svg-list">
                  <use href="./img/symbol-defs.svg#icon-delete"></use>
                </svg>
              </button>
            </div>
          </li>`)})}function M(t){u.classList.remove("hidden");const e=o.find(s=>s.id===t);console.log(m.value),m.value=e.text,x.addEventListener("click",s=>{const l=o.find(c=>c.id===t);l.text=m.value,localStorage.setItem("tasksArray",JSON.stringify(o)),a(o,d),u.classList.add("hidden")}),O.addEventListener("click",()=>{u.classList.add("hidden")})}function w(t){g.classList.remove("hidden"),N.addEventListener("click",()=>{o=o.filter(s=>s.id!==t),localStorage.setItem("tasksArray",JSON.stringify(o)),a(o,d),g.classList.add("hidden")}),D.addEventListener("click",()=>{g.classList.add("hidden")})}const k=t=>{t.classList.add("hidden")};function J(t){const e=o.find(s=>s.id===t);e.completed=!e.completed,localStorage.setItem("tasksArray",JSON.stringify(o)),h("all")}function L(){p.classList.add("body-night")}function S(){p.classList.remove("body-night")}
//# sourceMappingURL=index.js.map
