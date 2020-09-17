function findRandomIntFrom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class Spaceship {
    constructor(hull, firePower, accuracy) {
        this.hull = hull;
        this.firePower = firePower;
        this.accuracy = accuracy;
    }
}

class Alien_Ship extends Spaceship {
    constructor () {
        super((findRandomIntFrom(3, 6)), (findRandomIntFrom(2, 4)), (findRandomIntFrom(6, 8)/10))
    }
}

const aShip1 = new Alien_Ship()
console.log(aShip1)