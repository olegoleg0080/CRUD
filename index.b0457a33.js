const t={postsContainer:document.querySelector(".posts-container"),form:document.querySelector("form"),del:document.querySelector(".delete")};function e(){fetch("http://localhost:3000/posts").then((t=>t.json())).then((e=>{t.postsContainer.innerHTML="";let n="";e.forEach((t=>{const e=o(t);n+=e})),t.postsContainer.insertAdjacentHTML("beforeend",n)})).catch((t=>{console.error("Ошибка при получении постов:",t)}))}function o(t){return`<div class="container-card" data-id="${t.id}">\n    <p>Title = ${t.post.title}</p>\n    <p>Body = ${t.post.body}</p>\n    <button class="delete">Удалить</button>\n    <button class="edit">Редактировать</button>\n    </div>`}function n(t){const o=document.querySelector(".modal"),n=document.querySelector('.modal input[name="title"]'),c=document.querySelector('.modal textarea[name="body"]'),r=document.querySelector(".modal button.save");n.value=t.post.title,c.value=t.post.body,r.onclick=()=>{t.post.title=n.value,t.post.body=c.value,function(t){const e={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({post:t.post})};return fetch(`http://localhost:3000/posts/${t.id}`,e)}(t).then((()=>{e(s)}))},o.style.display="block"}function s(){document.querySelector(".modal").style.display="none"}function e(e){fetch("http://localhost:3000/posts").then((t=>t.json())).then((n=>{t.postsContainer.innerHTML="";let s="";n.forEach((t=>{const e=o(t);s+=e})),t.postsContainer.insertAdjacentHTML("beforeend",s),e&&e()})).catch((t=>{console.error("Ошибка при получении постов:",t)}))}fetch("http://localhost:3000/posts").then((t=>t.json())).then((e=>{let n="";e.forEach((t=>{const e=o(t);n+=e})),t.postsContainer.insertAdjacentHTML("beforeend",n)})).catch((t=>{console.error("Ошибка при получении постов:",t)})),t.postsContainer.addEventListener("click",(function(t){if(t.target.classList.contains("delete")){const e=t.target.closest(".container-card");(function(t){return fetch(`http://localhost:3000/posts/${t}`,{method:"DELETE"})})(e.dataset.id).then((()=>{e.remove()}))}})),e(),t.form.addEventListener("submit",(o=>{o.preventDefault();const n=new FormData(t.form),s=n.get("name"),c=n.get("text");s&&c?function(t){const e={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({post:t})};return fetch("http://localhost:3000/posts",e).then((t=>t.json()))}({userId:1,title:s,body:c}).then((()=>{e()})):alert("Пожалуйста, заполните все поля")})),t.postsContainer.addEventListener("click",(t=>{if(t.target.classList.contains("edit")){(function(t){return fetch(`http://localhost:3000/posts/${t}`).then((t=>t.json()))})(t.target.closest(".container-card").dataset.id).then((t=>{n(t)}))}}));
//# sourceMappingURL=index.b0457a33.js.map
