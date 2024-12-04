document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".circle").forEach(e=>{var t=parseInt(e.getAttribute("data-percent"),10),s=e.querySelector(".fg").r.baseVal.value;let n=2*Math.PI*s,a=-t/100*n,d=e.querySelector(".fg");d.style.strokeDasharray=n+" "+n,d.style.strokeDashoffset=n,setTimeout(()=>{d.style.transition="stroke-dashoffset 2s ease",d.style.strokeDashoffset=n-a},0)})}),document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".drop-box").forEach(function(t){t.addEventListener("click",function(){let e=t.nextElementSibling;e.classList.contains("hidden")?(e.classList.remove("hidden"),e.classList.add("slide-in"),e.addEventListener("animationend",()=>{e.classList.remove("slide-in"),e.classList.remove("hidden")})):(e.classList.add("slide-out"),e.addEventListener("animationend",()=>{e.classList.add("hidden"),e.classList.remove("slide-out")}))})})});
// --- Функція для отримання даних через XMLHttpRequest ---
function loadDataWithXHR() {
    const xmlhttp = new XMLHttpRequest();
    const url = "/data/data.json";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                const data = JSON.parse(this.responseText);
                renderData(data);
            } else {
                console.error("Помилка під час завантаження даних через XMLHttpRequest");
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// --- Функція для отримання даних через Fetch API ---
async function loadDataWithFetch() {
    try {
        const response = await fetch("/data/data.json");
        if (!response.ok) throw new Error("Помилка при завантаженні даних через Fetch API");
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error("Помилка під час отримання даних:", error);
    }
}

// --- Функція для рендерингу даних ---
function renderData(data) {
    renderEducation(data.education);
    renderWorkExperience(data.work_experience);
    renderReferences(data.references);
}

function renderEducation(education) {
    const section = document.getElementById("education-section");
    section.innerHTML = "";
    education.forEach((item) => {
        section.innerHTML += `
            <div class="education-item">
                <p> <strong>${item.major}</strong></p>
                <p> ${item.university}</p>
                <p> ${item.years}</p>
            </div>`;
    });
}

function renderWorkExperience(workExperience) {
    const section = document.getElementById("work-section");
    section.innerHTML = "";
    workExperience.forEach((item) => {
        section.innerHTML += `
            <div class="job-position">
                <h3>${item.position}</h3>
                <span class="date">${item.years}</span>
                <span class="company">${item.company}</span>
                <p>${item.description}</p>
            </div>`;
    });
}

function renderReferences(references) {
    const section = document.getElementById("reference-section");
    section.innerHTML = ""; //очищення попередньоого вмсіту
    references.forEach((item) => {
        section.innerHTML += `
            <div class="reference-item">
                <h4>${item.name}</h4>
                <p> ${item.position}</p>
                <p>Phone: ${item.phone}</p>
            </div>`;
    });
}

// --- Запуск завантаження даних ---

loadDataWithXHR(); // Завантаження через XMLHttpRequest
loadDataWithFetch(); // Завантаження через Fetch API
