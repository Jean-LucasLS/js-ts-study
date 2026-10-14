const names = ["Jean", "Paul", "Pierre"];
const url = "https://site.com/pasta/arquivo.txt";

const lastSlash = url.lastIndexOf("/");
const fileName = url.substring(lastSlash + 1);

console.log("Names:", names);
console.log("File name:", fileName);