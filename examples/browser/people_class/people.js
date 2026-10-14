class Person {
  constructor(name, surname, age, height) {
    this.name    = name;
    this.surname = surname;
    this.age     = age;
    this.height  = height;
  }
}

const allPeople = [];

function getPeople() {
  const form = document.querySelector("#peopleForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name    = form.querySelector(".name").value;
    const surname = form.querySelector(".surname").value;
    const age     = form.querySelector(".age").value;
    const height  = form.querySelector(".height").value;

    const person  = new Person(name, surname, age, height);

    allPeople.push(person);

    console.clear(); // Optional
    console.table(allPeople); // Show the full list
  });
}

getPeople();