
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
        write(data);
    } catch (error) {
        console.error("kan inte: ", error);
    }

}

function write(data) {
    const outputEl = document.querySelector("#output");

    let tempTable = `
    <h1>Webbutveckling - ramschema</h1>
    <input type="search" id="search" placeholder="Sök kurs"/>
    <table border="1" style="border-collapse: collapse; width: 100%;">
    <thead>
    <tr style="">
    <th><a href="">Kurskod</a></th>
    <th><a href="">Namn</a></th>
    <th><a href="">Progression</a></th>
    <th><a href="">Kursplan</a></th>
    </tr>
    </thead>
    <tbody>
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