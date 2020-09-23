function findRandomIntFromInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function getRandomNum() {
    return Math.random()
}

class Spaceship {
    constructor(name, maxHull, firePower, accuracy) {
        this.name = name;
        this.maxHull = maxHull;
        this.hull = maxHull;
        this.firePower = firePower;
        this.accuracy = accuracy;
        this.shield = 0;
    };

    attack(target){
        if (getRandomNum() <= this.accuracy) {
            let damage = this.firePower - target.shield;
            if (damage > 0) target.hull = target.hull - damage;
            target.shield -= this.firePower;
            console.log(`${this.name}'s attack hit ${target.name}`)
        } else console.log(`${this.name}'s attack missed ${target.name}`)
    };

    activateShield (){
        if (getRandomNum() < .5) {
            this.shield = findRandomIntFromInt(1, 5);
            console.log(`Shields Activated: ${this.shield}`);
        }
    }
};

const yourShip = new Spaceship('USS Assembly', 20, 6, 1)

class Alien_Ship extends Spaceship {
    constructor (name) {
        super(name, (findRandomIntFromInt(3, 6)), (findRandomIntFromInt(2, 4)), (findRandomIntFromInt(6, 8)/10));
    };
};

console.log(yourShip);

let attackingAliens = [];
let invasionsPrevented = 0;
let deaths = 0;
let j = -1;


console.log(attackingAliens);

const battle = {
    round() {
        if (invasionsPrevented >= 2) {
            yourShip.activateShield();
            let answer = 0
            function ask() {answer = prompt(`Targetting Alien Ship # 1 - ${attackingAliens.length}`)};
            ask()
            for (k = 0; k < 10000; k ++) {
                console.log(answer);
                if (answer.isNaN || (answer < 1 || answer > attackingAliens.length)) {
                    ask();
                } else {
                    yourShip.attack(attackingAliens[answer - 1]);
                    console.log(`${attackingAliens[answer - 1].name}: ${attackingAliens[answer - 1].hull} ------ USS Assembly: ${yourShip.hull}`);
                    break;
                }
            }
        } else {
            j += 1;
            if (j >= attackingAliens.length) j = 0;
            yourShip.activateShield();
            if (attackingAliens[j].hull > 0) {
                yourShip.attack(attackingAliens[j])
                console.log(`${attackingAliens[j].name}: ${attackingAliens[j].hull} ------ USS Assembly: ${yourShip.hull}`);
            }
            if (attackingAliens[j].hull <= 0 && j < attackingAliens.length - 1) {
                if (confirm(`One down but there are still more, would you like to retreat?`)) location.reload(1);
            }
        }
        this.alienTurn();
        yourShip.shield = 0;
        deaths = 0;
        game.checkWin();
    },

    alienTurn() {
        for (i = 0; i < attackingAliens.length; i++) {
            if (attackingAliens[i].hull > 0) {
                attackingAliens[i].attack(yourShip);
                console.log(`${attackingAliens[i].name}: ${attackingAliens[i].hull} ------ USS Assembly: ${yourShip.hull}`);
                if (invasionsPrevented > 1) {
                    for (i += 1; i < attackingAliens.length; i++) {
                        if (attackingAliens[i].hull > 0) {
                            attackingAliens[i].attack(yourShip);
                            console.log(`${attackingAliens[i].name}: ${attackingAliens[i].hull} ------ USS Assembly: ${yourShip.hull}`)
                            break;
                        };
                    };
                };
                break;
            }
        }
    }
}

const game = {
    checkWin() {
        for (l = 0; l < attackingAliens.length; l++) {
            if (attackingAliens[l].hull <= 0) deaths += 1;
        }
        if (deaths === attackingAliens.length) {
            console.log('You have defeated the Alien Menace... For now...');
            invasionsPrevented += 1;
            game.startGame();
        } else if (yourShip.hull <= 0) {
            if (confirm('The USS Assembly has fallen. All hope is lost... Try again?')) location.reload(1);
            else location.reload(1)
        } else battle.round();
    },
    spawnInvasion() {
        if (invasionsPrevented < 1) {
            if (confirm('We are under attack!!! Will you stop the alien invasion?')) {
                attackingAliens = [];
                for (k = 0; k < findRandomIntFromInt(6, 12); k++) attackingAliens[k] = new Alien_Ship(`Alien Ship ${k + 1}`);
            } else {
                location.reload(1);
            }
        } else {
            if (confirm(`They're back?! We need you again!!!`)) {
                j = -1;
                attackingAliens = [];
                for (k = 0; k < findRandomIntFromInt(6, 12); k++) attackingAliens[k] = new Alien_Ship(`Alien Ship ${k + 1}`);
            } else {
                location.reload(1);
            }
        }
    },
    startGame() {
        if (invasionsPrevented < 1) yourShip.hull = yourShip.maxHull;
        this.spawnInvasion();
        battle.round();
    },
}

game.startGame()



// for (j = 0; j < attackingAliens.length; j++) {
//     if (yourShip.hull <= 0) break;
//     yourShip.activateShield();
//     for (i = 1; i < attackingAliens.length * 10000; i++) {
//         if (attackingAliens[j] === attackingAliens[attackingAliens.length - 1] && attackingAliens[attackingAliens.length - 1].hull <=0) {
            
//             break;
//         } else if (attackingAliens[j].hull <= 0) {
//             break;
//         } else if (yourShip.hull <= 0) {
//             console.log('The USS Assembly has fallen. All hope is lost');
//             break;
//         } else if (i % 2 !== 0 && attackingAliens[j].hull > 0) {
//             yourShip.attack(attackingAliens[j])
//             console.log(`${attackingAliens[j].name}: ${attackingAliens[j].hull} ------ USS Assembly: ${yourShip.hull}`);
//         } else if (yourShip.hull > 0 && attackingAliens[j].hull > 0) {
//             attackingAliens[j].attack(yourShip)
//             console.log(`${attackingAliens[j].name}: ${attackingAliens[j].hull} ------ USS Assembly: ${yourShip.hull}`);
//         }
//     }
//     if (attackingAliens[attackingAliens.length - 1].hull <= 0){
//         invasionsPrevented += 1;
//         break;
//     } //else if (attackingAliens[j].hull <= 0) {
    // if (confirm('Retreat?')) {
    //     console.log('What a coward!!!');
    //     break;
    //     }
    // }
// }




