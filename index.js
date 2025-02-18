(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(n){if(n.ep)return;n.ep=!0;const l=s(n);fetch(n.href,l)}})();const v=document.querySelector(".add-btn"),g=document.querySelector(".add-modal"),f=document.querySelector(".input-modal-add"),b=document.querySelector(".apply"),L=document.querySelector(".cancel"),r=document.querySelector(".edit-modal"),u=document.querySelector(".input-modal-edit"),S=document.querySelector(".apply-changes"),E=document.querySelector(".cancel-edit"),m=document.querySelector(".delete-modal"),q=document.querySelector(".delete-yes"),I=document.querySelector(".delete-no"),y=document.querySelector(".empty-element"),d=document.querySelector(".task-list"),p=document.querySelector(".btn-all");document.addEventListener("DOMContentLoaded",()=>{const e=localStorage.getItem("filter")||"all";p.value=e,h(e)});let c=JSON.parse(localStorage.getItem("tasksArray"))||[];c.length>0&&(y.classList.add("hidden"),a(c,d));v.addEventListener("click",()=>{g.classList.remove("hidden")});b.addEventListener("click",()=>{const e=f.value,t=Date.now();c.push({text:e,id:t,completed:!1}),localStorage.setItem("tasksArray",JSON.stringify(c)),console.log(c),k(g),c.length>0&&y.classList.add("hidden"),a(c,d),f.value="",console.log(e)});L.addEventListener("click",()=>{k(g),f.value=""});d.addEventListener("click",e=>{const t=e.target.closest(".task-container");if(!t)return;const s=Number(t.dataset.id);if(console.log(s),e.target.closest(".btn-edid")&&x(s),e.target.closest(".btn-delete")&&O(s),e.target.classList.contains("input-checkbox")){const o=e.target.closest(".task-container"),n=Number(o.dataset.id);T(n,e.target)}});p.addEventListener("change",e=>{const t=e.target.value;localStorage.setItem("filter",t),h(t)});function h(e){let t;switch(e){case"all":t=c;break;case"complete":t=c.filter(s=>s.completed);break;case"incomplete":t=c.filter(s=>!s.completed);break}a(t,d)}const k=e=>{e.classList.add("hidden")};function a(e,t){t.innerHTML="",e.forEach(s=>{t.insertAdjacentHTML("beforeend",`<li class="task-container" data-id=${s.id}>
            <div class="checkbox-container">
              <input
                type="checkbox"
                name="custom-checkbox"
                id=${s.id}
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
                  <use href="./img/symbol-defs.svg#icon-edit"></use>
                </svg></button
              ><button class="btn-list btn-delete">
                <svg class="svg-list">
                  <use href="./img/symbol-defs.svg#icon-delete"></use>
                </svg>
              </button>
            </div>
          </li>`)})}function x(e){document.querySelector(".item-tittle"),r.classList.remove("hidden");const t=c.find(s=>s.id===e);console.log(u.value),u.value=t.text,S.addEventListener("click",s=>{const o=c.find(n=>n.id===e);o.text=u.value,localStorage.setItem("tasksArray",JSON.stringify(c)),a(c,d),r.classList.add("hidden")}),E.addEventListener("click",()=>{r.classList.add("hidden")})}function O(e){m.classList.remove("hidden"),q.addEventListener("click",()=>{c=c.filter(s=>s.id!==e),localStorage.setItem("tasksArray",JSON.stringify(c)),a(c,d),m.classList.add("hidden")}),I.addEventListener("click",()=>{m.classList.add("hidden")})}function T(e,t){const s=c.find(o=>o.id===e);s.completed=t.checked,localStorage.setItem("tasksArray",JSON.stringify(c))}
//# sourceMappingURL=index.js.map
