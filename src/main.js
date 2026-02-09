
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

document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("stylesheet");
    const mode = document.getElementById("mode");

    //när man klickar på knappen så togglar det
    mode.addEventListener("click", () => {
        const doDark = !link.href.includes("dark");

        if (!doDark) {
            link.href = "/src/style.scss";
            mode.innerHTML = '<img src="/images/day.png" class="modetoggle">'

        } else {
            link.href = "/src/styledark.scss";
            mode.innerHTML = '<img src="/images/night.png" class="modetoggle">'
        }

        //och sparas till localstorage  
        localStorage.setItem("darkMode", doDark);
    });

    //frågar local storage om vi har darkmode kvar eller inte
    if (localStorage.getItem("darkMode") === "true") {
        link.href = "/src/styledark.scss";
        mode.innerHTML = '<img src="/images/night.png" class="modetoggle" alt="Night">';
    } else {
        link.href = "/src/style.scss";
        mode.innerHTML = '<img src="/images/day.png" class="modetoggle" alt="Day">';
    }

});