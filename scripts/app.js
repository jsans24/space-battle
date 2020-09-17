function findRandomIntFromInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function getRandomNum() {
    return Math.random()
}

class Spaceship {
    constructor(name, hull, firePower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firePower = firePower;
        this.accuracy = accuracy;
    };

    attack(target){
        if (getRandomNum() <= this.accuracy) {
            target.hull -= this.firePower;
            console.log(`${this.name}'s attack hit ${target.name}`)
        } else console.log(`${this.name}'s attack missed ${target.name}`)
    };
};

const yourShip = new Spaceship('USS Assembly', 20, 5, .7)

class Alien_Ship extends Spaceship {
    constructor (name) {
        super(name, (findRandomIntFromInt(3, 6)), (findRandomIntFromInt(2, 4)), (findRandomIntFromInt(6, 8)/10));
    };
};

const attackingAliens = []

for (k = 0; k < findRandomIntFromInt(6, 12); k++) attackingAliens[k] = new Alien_Ship(`Alien Ship ${k + 1}`)

console.log(attackingAliens);

for (j = 0; j < attackingAliens.length; j++) {
    for (i = 1; i < attackingAliens.length * 10000; i++) {
        if (attackingAliens[j] === attackingAliens[attackingAliens.length - 1] && attackingAliens[attackingAliens.length - 1].hull <=0) {
            console.log('You have defeated the Alien Menace... For now...');
            break;
        } else if (attackingAliens[j].hull <= 0) {
            break;
        } else if (yourShip.hull <= 0) {
            console.log('The USS Assembly has fallen. All hope is lost');
            break;
        } else if (i % 2 !== 0 && attackingAliens[j].hull > 0) {
            yourShip.attack(attackingAliens[j])
            console.log(`${attackingAliens[j].name}: ${attackingAliens[j].hull} ------ USS Assembly: ${yourShip.hull}`);
        } else if (yourShip.hull > 0 && attackingAliens[j].hull > 0) {
            attackingAliens[j].attack(yourShip)
            console.log(`${attackingAliens[j].name}: ${attackingAliens[j].hull} ------ USS Assembly: ${yourShip.hull}`);
        }
    }
    if (yourShip.hull <= 0 || attackingAliens[attackingAliens.length - 1].hull <= 0){
        break;
    } else if (attackingAliens[j].hull <= 0) {
        if (confirm('Retreat?')) {
            console.log('What a coward!!!');
            break;
        }
    }
}


