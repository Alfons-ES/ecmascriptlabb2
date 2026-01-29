
read()

async function getRamschema() {
    const response = await fetch('https://webbutveckling.miun.se/files/ramschema.json');
    const data = await response.json();

    return data;

}

async function read() {
    try {
        const data = await getRamschema();
        console.log(data);
        write(data); //skriv ut allt
        search(data); //sökfunktion
        sort(data); //sortering
    } catch (error) {
        console.error("kan inte: ", error);
    }

}

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
        <td><a href="${course.syllabus}" target="_blank"><button>𓂃🖊</button></a></td>
        </tr>
    `;
    });

    tempTable += `
    </tbody>
    </table>
    `;

    outputEl.innerHTML = tempTable;

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

function sort(all) {
    const click = document.querySelectorAll("thead a[data-col]");

    click.forEach(a => {
        a.addEventListener("click", function (event) {
            const column = a.getAttribute("data-col");

            const sorted = [...all].sort(function (a, b) {

                let valueA = a[column];
                let valueB = b[column];


                if (typeof valueA === "string") valueA = valueA.toLowerCase();
                if (typeof valueB === "string") valueB = valueB.toLowerCase();

                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
                return 0;
            });

            write(sorted);
        });

    });
}