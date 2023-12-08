
class Key {
  private signature: number = Math.floor(Math.random() * 1000);
  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}
  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  door: boolean = false;
  tenants: Array<object> = [];

  constructor(protected key: Key) {};

  comeIn(person: object): void {    
    
    if (this.door === true) {
      this.tenants.push(person);
      console.log("You are welcome!");
      this.door = false;
    }    
    console.log("Sorry, the door is closed!");
  }
  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);   
  }

  openDoor(key: Key): void {    
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("Door is open");      
    }
    console.log("Sorry, try another key");
  }
}

const key = new Key();
console.log(key);


const house = new MyHouse(key);
console.log(house);

const person = new Person(key);
console.log(person);


house.openDoor(person.getKey());

house.comeIn(person);

export {};
