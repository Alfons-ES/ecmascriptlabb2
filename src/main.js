
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
    <th><a href="">Kurskod</a></th>
    <th><a href="">Namn</a></th>
    <th><a href="">Progression</a></th>
    <th><a href="">Kursplan</a></th>
    </tr>
    </thead>
    <tbody id="table">
    `;

    data.forEach(course => {
        tempTable += `
        <tr>
        <td>${course.code}</td>
        <td>${course.coursename}</td>
        <td>${course.progression}</td>
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