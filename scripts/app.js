function findRandomIntFromInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

class Spaceship {
    constructor(name, hull, firePower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firePower = firePower;
        this.accuracy = accuracy;
    };

    attack(target){
        if (Math.random() <= this.accuracy) {
            target.hull -= this.firePower;
            console.log(`${this.name}'s attack hit ${target.name}`)
        } else console.log(`${this.name}'s attack missed ${target.name}`)
    };
};

const USS_Assembly = new Spaceship('USS Assembly', 20, 5, .7)

class Alien_Ship extends Spaceship {
    constructor (name) {
        super(name, (findRandomIntFromInt(3, 6)), (findRandomIntFromInt(2, 4)), (findRandomIntFromInt(6, 8)/10));
    };
};

const aShip1 = new Alien_Ship('Alien Ship 1');

for (i = 0; i < 10000; i++) {
    if (i % 2 !== 0 && aShip1.hull > 0) {
        USS_Assembly.attack(aShip1)
        console.log(`Alien Ship: ${aShip1.hull} ------ USS Assembly: ${USS_Assembly.hull}`);
    } else if (USS_Assembly.hull > 0 && aShip1.hull > 0) {
        aShip1.attack(USS_Assembly)
        console.log(`Alien Ship: ${aShip1.hull} ------ USS Assembly: ${USS_Assembly.hull}`);
    } else if (USS_Assembly.hull <= 0) {
        console.log('The USS Assembly has fallen. All hope is lost');
        break;
    }
}