
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

    outputEl.innerHTML = `
    <h1>Webbutveckling - ramschema</h1>
    <table>
    <thead>
    </thead>
    <tbody>`

    data.forEach(course => {
        outputEl.innerHTML += `
        <tr>
        <td>${course.code}</td>
        <td>${course.coursename}</td>
        <td>${course.progression}</td>
        <td><a href="${course.syllabus}" target="_blank">Kursplan</a></td>
        </tr>
    `
    });

    outputEl.innerHTML += `
    </tbody>
    </table>`

}