async function getRamschema() {
    const response = await fetch('https://webbutveckling.miun.se/files/ramschema.json');
    const data = await response.json();

    return data;

}

async function read() {
    try {
        const data = await getRamschema();
        console.log(data);
    } catch (error) {
        console.error("kan inte: ", error);
    }


}

getRamschema()
read()