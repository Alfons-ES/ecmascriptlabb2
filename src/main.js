import Chart from 'chart.js/auto';
read()

async function getRamschema() {
    const response = await fetch('https://webbutveckling.miun.se/files/ramschema.json');
    try {
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("fetching fail: ", error);
    }

}

async function read() {
    try {
        const data = await getRamschema();
        console.log(data);
        write(data); //skriv ut allt
        search(data); //sökfunktion
    } catch (error) {
        console.error("kan inte: ", error);
    }

}

let toggleDirection = 0;
let direction = "asc";

function write(data) {
    const outputEl = document.querySelector("#output");

    let tempTable = `
    <table border="1" style="border-collapse: collapse; width: 100%;">
    <thead>
    <tr style="">
    <th><a href="#" data-col="code">Kurskod</a></th>
    <th><a href="#" data-col="coursename">Namn</a></th>
    <th><a href="#" data-col="progression">Progression</a></th>
    <th><a href="#" data-col="syllabus">Kursplan</a></th>
    </tr>
    </thead>
    <tbody id="table">
    `;

    data.forEach(course => {
        tempTable += `
        <tr>
        <td id="center">${course.code}</td>
        <td>${course.coursename}</td>
        <td id="center">${course.progression}</td>
        <td id="center"><a href="${course.syllabus}" target="_blank"><button>𓂃🖊</button></a></td>
        </tr>
    `;
    });

    tempTable += `
    </tbody>
    </table>
    `;

    outputEl.innerHTML = tempTable;


    //sortering

    document.querySelectorAll("[data-col]").forEach(a => {

        a.addEventListener("click", function (event) {
            event.preventDefault();

            const column = a.getAttribute("data-col");

            if (toggleDirection == 0) {
                direction = "asc";
                toggleDirection = 1;
            } else {
                direction = "desc";
                toggleDirection = 0;
            }

            const sorted = [...data].sort((a, b) => {
                let valueA = a[column];
                let valueB = b[column];

                if (valueA < valueB) {
                    if (direction === "asc") {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                if (valueA > valueB) {
                    if (direction === "asc") {
                        return 1;
                    } else {
                        return -1;
                    }
                }
                return 0;
            });

            write(sorted);
        });
    });

}

function search(courses) {
    const search = document.querySelector("#search");

    search.addEventListener("input", () => {
        const searchText = search.value.toLowerCase().trim();

        const result = searchText
            ? courses.filter(
                c =>
                    c.coursename.toLowerCase().includes(searchText) ||
                    c.code.toLowerCase().includes(searchText)
            )
            : courses;

        //om fältet är tomt visas alla kurser, om någonting är i inputfältet visas alla kurser som har den bokstaven i namnet ELLER i kurskoden.

        write(result);
    })
}
let dark = true;
const mode = document.getElementById("mode");

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("light-mode"); document.getElementById("mode").addEventListener("click", () => {
        if (!dark) {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
            dark = true;

            mode.innerHTML = '<img src="/images/day.png" class="modetoggle" alt="Day">';
        }
        else {
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
            dark = false;
            mode.innerHTML = '<img src="/images/night.png" class="modetoggle" alt="Night">';

        }
    });
});



//KATTVISARE :D

const btn = document.getElementById('btn2');
const catImg = document.getElementById('cat');

btn.addEventListener('click', () => {
    catImg.style.opacity = '1';
});




readStats()

async function getStats() {
    const response = await fetch('https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json');
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("fetching fail: ", error);
    }

}


async function readStats() {
    try {
        const data = await getStats();
        console.log(data);
        calculate(data); //räkna på vad som ska visas
    } catch (error) {
        console.error("kan inte: ", error);
    }

}

function calculate(data) {
    const top6 = data
        .filter(item => item.type === "Kurs")
        .map(item => ({
            name: item.name,
            sökande: Number(item.applicantsTotal.trim())
        }))
        .filter(item => !isNaN(item.sökande))
        .sort((a, b) => b.sökande - a.sökande)
        .slice(0, 6);

    console.log("Topp 6 kurser HT25 (totala sökande):");
    top6.forEach((c, i) => {
        console.log(`${i + 1}. ${c.sökande} st – ${c.name}`);
    });
}
//https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
//https://stackoverflow.com/questions/68093967/i-want-to-show-top-5-from-an-array-of-object
//https://stackoverflow.com/questions/75839437/getting-top-5-objects-in-array-with-highest-value
//Hade inte kunnat freebase detta själv så jag länkar koden jag "inspirerades" utav här.