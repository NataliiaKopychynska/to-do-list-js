(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const y of n.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&l(y)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const w=document.querySelector(".add-btn"),I=document.querySelector(".mode-toggle"),h=document.querySelector(".toggle-icon"),L=document.querySelector(".add-modal"),i=document.querySelector(".input-modal-add"),O=document.querySelector(".apply"),N=document.querySelector(".cancel"),v=document.querySelector(".edit-modal"),d=document.querySelector(".input-modal-edit"),D=document.querySelector(".apply-changes"),J=document.querySelector(".cancel-edit"),b=document.querySelector(".delete-modal"),P=document.querySelector(".delete-yes"),B=document.querySelector(".delete-no"),p=document.querySelector(".empty-element"),a=document.querySelector(".task-list"),r=document.querySelector(".search-input"),S=document.querySelector(".btn-all"),m=document.body,g=document.querySelector(".checkbox-label"),f=document.querySelector(".svg-chacckbox"),q=document.querySelectorAll(".window-modal"),E=document.querySelectorAll(".title");document.addEventListener("DOMContentLoaded",()=>{const e=localStorage.getItem("filter")||"all";S.value=e,k(e),localStorage.getItem("theme")==="dark"?(h.setAttribute("href","./img/symbol-defs.svg#icon-sun"),A()):(h.setAttribute("href","./img/symbol-defs.svg#icon-moon"),T())});let c=JSON.parse(localStorage.getItem("tasksArray"))||[];c.length>0&&(p.classList.add("hidden"),u(c,a));w.addEventListener("click",()=>{L.classList.remove("hidden")});I.addEventListener("click",()=>{document.body.classList.toggle("dark-theme"),document.body.classList.contains("dark-theme")?(h.setAttribute("href","./img/symbol-defs.svg#icon-sun"),localStorage.setItem("theme","dark"),A()):(h.setAttribute("href","./img/symbol-defs.svg#icon-moon"),localStorage.setItem("theme","light"),T())});O.addEventListener("click",()=>{const e=i.value,t=Date.now();c.push({text:e,id:t,completed:!1}),localStorage.setItem("tasksArray",JSON.stringify(c)),console.log(c),x(L),c.length>0&&p.classList.add("hidden"),u(c,a),i.value="",console.log(e)});N.addEventListener("click",()=>{x(L),i.value=""});a.addEventListener("click",e=>{const t=e.target.closest(".task-container");if(!t)return;const s=Number(t.dataset.id);if(console.log(s),e.target.closest(".btn-edid")&&F(s),e.target.closest(".btn-delete")&&V(s),e.target.closest(".checkbox-container")){const l=Number(t.dataset.id);$(l)}});S.addEventListener("change",e=>{const t=e.target.value;localStorage.setItem("filter",t),k(t)});r.addEventListener("input",e=>{let t=e.target.value.toLowerCase();const s=c.filter(l=>{if(console.log(t),l.text.toLowerCase().includes(t))return l});t.trim()===""?u(c,a):u(s,a)});function k(e){let t;switch(e){case"all":t=c;break;case"complete":t=c.filter(s=>s.completed);break;case"incomplete":t=c.filter(s=>!s.completed);break}u(t,a)}const x=e=>{e.classList.add("hidden")};function u(e,t){t.innerHTML="",e.forEach(s=>{t.insertAdjacentHTML("beforeend",`<li class="task-container " data-id=${s.id}>
            <div class="checkbox-container">
              <input
                type="checkbox"
                name="custom-checkbox"
                id="custom-checkbox"
                class="input-checkbox visually-hidden"
                ${s.completed?"checked":""}
              />
              <label for="custom-checkbox" class="checkbox-label checkbox-label-night">
                <span>
                  <svg class="svg-chacckbox svg-night">
                    <use href="./img/symbol-defs.svg#icon-Rectangle-18"></use>
                  </svg>
                </span>
                <p class="item-tittle">${s.text}</p>
              </label>
            </div>
            <div class="btn-container-add-delete">
              <button class="btn-list btn-edid">
                <svg class="svg-list">
                  <use href="./img/symbol-defs.svg#icon-edit"></use>
                </svg></button
              ><button class="btn-list btn-delete">
                <svg class="svg-list">
                  <use href="./img/symbol-defs.svg#icon-delete"></use>
                </svg>
              </button>
            </div>
          </li>`)})}function F(e){document.querySelector(".item-tittle"),v.classList.remove("hidden");const t=c.find(s=>s.id===e);console.log(d.value),d.value=t.text,D.addEventListener("click",s=>{const l=c.find(o=>o.id===e);l.text=d.value,localStorage.setItem("tasksArray",JSON.stringify(c)),u(c,a),v.classList.add("hidden")}),J.addEventListener("click",()=>{v.classList.add("hidden")})}function V(e){b.classList.remove("hidden"),P.addEventListener("click",()=>{c=c.filter(s=>s.id!==e),localStorage.setItem("tasksArray",JSON.stringify(c)),u(c,a),b.classList.add("hidden")}),B.addEventListener("click",()=>{b.classList.add("hidden")})}function $(e){const t=c.find(s=>s.id===e);t.completed=!t.completed,localStorage.setItem("tasksArray",JSON.stringify(c)),k("all")}function A(){g==null||g.classList.add("checkbox-label-night"),f==null||f.classList.add("svg-night"),r==null||r.classList.add("input-night"),i==null||i.classList.add("input-night"),d==null||d.classList.add("input-night"),q.forEach(e=>e.classList.add("window-modal-night")),E.forEach(e=>e.classList.add("title-night")),m==null||m.classList.add("body-night")}function T(){g==null||g.classList.remove("checkbox-label-night"),f==null||f.classList.remove("svg-night"),r==null||r.classList.remove("input-night"),i==null||i.classList.remove("input-night"),d==null||d.classList.remove("input-night"),q.forEach(e=>e.classList.remove("window-modal-night")),E.forEach(e=>e.classList.remove("title-night")),m==null||m.classList.remove("body-night")}
//# sourceMappingURL=index.js.map
