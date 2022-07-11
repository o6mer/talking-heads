//will be taken from a db later

class People {
  constructor(roomId, arr) {
    this.roomId = roomId; // the room id, must be unique
    this.arr = arr; // people in the room arr
  }
}

const people1 = new People(1, [
  {
    id: 1,
    name: "Yanay 1",
    age: 3,
  },
  {
    id: 1,
    name: "Omer 1",
    age: 4,
  },
]);
const people2 = new People(2, [
  {
    id: 1,
    name: "Yanay 2",
    age: 3,
  },
  {
    id: 1,
    name: "Omer 2",
    age: 4,
  },
]);
const people3 = new People(3, [
  {
    id: 1,
    name: "Yanay 3",
    age: 3,
  },
  {
    id: 1,
    name: "Omer 3",
    age: 4,
  },
]);
const people4 = new People(4, [
  {
    id: 1,
    name: "Yanay 4",
    age: 3,
  },
  {
    id: 1,
    name: "Omer 4",
    age: 4,
  },
]);
const people5 = new People(5, [
  {
    id: 1,
    name: "Yanay 5",
    age: 3,
  },
  {
    id: 1,
    name: "Omer 5",
    age: 4,
  },
]);

const peopleArr = [people1, people2, people3, people4, people5];

export default peopleArr;
