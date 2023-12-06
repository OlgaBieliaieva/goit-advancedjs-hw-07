interface IKey {
  getSignature(): number;
}

interface IPerson {
  name: string;
  getKey(): number;
}

interface IHouse {
  door: boolean;
  tenants: Array<object>;
  comeIn(person: object): void;

}



class Key implements IKey {
  private signature: number = Math.floor(Math.random() * 1000);
  getSignature(): number {
    return this.signature;
  }
}

class Person implements IPerson {
  constructor(public name: string, private key: number) {}
  getKey(): number {
    return this.key;
  }
}

abstract class House implements IHouse {
  door: boolean = false;
  tenants: Array<object> = [];

  constructor(protected key: number) {};

  comeIn(person: object): void {    
    
    if (this.door === true) {
      this.tenants.push(person);
      console.log("You are welcome!");
      this.door = false;
    }    
    console.log("Sorry, the door is closed!");
  }
  abstract OpenDoor(key: number): void;
}

class MyHouse extends House {
  constructor(key: number) {
    super(key);   
  }

  OpenDoor(key: number): void {    
    if (key === this.key) {
      this.door = true;
      console.log("Door is open");      
    }
    console.log("Sorry, try another key");
  }
}

const myHouseKey = new Key().getSignature();

const tenantKey = new Key().getSignature();

const house = new MyHouse(myHouseKey);

const me = new Person("Olha", myHouseKey);

const tenant = new Person("Alex", tenantKey);

house.OpenDoor(me.getKey());
house.comeIn(me);
house.OpenDoor(tenant.getKey());
house.comeIn(tenant);
console.log(house.tenants);

export {};
