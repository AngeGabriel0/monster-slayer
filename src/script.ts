const attackButton: HTMLButtonElement = document.querySelector('#attackBtn')!;
const specialAttackButton: HTMLButtonElement = document.querySelector('#specialBtn')!;
const healBtn: HTMLButtonElement = document.querySelector('#healBtn')!;
const resignBtn: HTMLButtonElement = document.querySelector('#resignBtn')!;
const lifePointsDisplay = document.querySelector('.life')!;
const monsterLifePointsDisplay = document.querySelector('.monster-life')!;


class Game { // Propriétés, constructeurs et méthodes uniquement

    // Properties
    lifePoints: number;
    monsterLifePoints: number;
    attackPoints: number;
    specialAttackPoints: number;
    healPoints: number;
    level: string;

    // Constructor method
    constructor(lifePoints: number, monsterLifePoints: number, attackPoints: number, specialAttackPoints: number, healPoints: number, level: string) {
        this.lifePoints = lifePoints;
        this.monsterLifePoints = monsterLifePoints;
        this.attackPoints = attackPoints;
        this.specialAttackPoints = specialAttackPoints;
        this.healPoints = healPoints;

        this.level = level;

        switch (this.level) {
            case 'easy':
                this.attackPoints *= 2;
                this.specialAttackPoints *= 4;
                this.healPoints *= 2;
                break;


            case 'medium':
                this.attackPoints *= 1.25;
                this.specialAttackPoints *= 2;
                this.healPoints *= 1.5;
                this.monsterLifePoints = 150;
                monsterLifePointsDisplay.innerHTML = '150';
                break;

            case 'hard':
                this.attackPoints *= 1;
                this.specialAttackPoints *= 1.5;
                this.healPoints *= 1.5;
                this.monsterLifePoints = 200;
                monsterLifePointsDisplay.innerHTML = '200';
                break;

            case 'impossible':
                this.attackPoints *= 0.8;
                this.specialAttackPoints *= 1;
                this.healPoints *= 2;
                this.monsterLifePoints = 350;
                monsterLifePointsDisplay.innerHTML = '350';
                break;
        }

    }

    attack() {
        let damage = Math.floor(Math.random() * this.attackPoints) + 1;
        this.lifePoints = Math.floor(this.lifePoints - damage * 0.5);
        this.monsterLifePoints = Math.floor(this.monsterLifePoints - damage);

        // Limit the life points to 0 and 100
        this.lifePoints = Math.max(0, this.lifePoints);
        this.monsterLifePoints = Math.max(0, this.monsterLifePoints);

        lifePointsDisplay.textContent = this.lifePoints.toString();
        monsterLifePointsDisplay.textContent = this.monsterLifePoints.toString();

        (lifePointsDisplay as HTMLElement).style.width = this.lifePoints + '%';
        (monsterLifePointsDisplay as HTMLElement).style.width = this.monsterLifePoints + '%';

        this.result(); //Verify if the game is over (LP at 0)
    }

    specialAttack() {
        let damage = Math.floor(Math.random() * this.specialAttackPoints) + 2;
        this.lifePoints = Math.floor(this.lifePoints - damage * 0.3);
        this.monsterLifePoints = Math.floor(this.monsterLifePoints - damage);

        this.lifePoints = Math.max(0, this.lifePoints);
        this.monsterLifePoints = Math.max(0, this.monsterLifePoints);

        lifePointsDisplay.textContent = this.lifePoints.toString();
        monsterLifePointsDisplay.textContent = this.monsterLifePoints.toString();

        (lifePointsDisplay as HTMLElement).style.width = this.lifePoints + '%';
        (monsterLifePointsDisplay as HTMLElement).style.width = this.monsterLifePoints + '%';

        this.result(); //Verify if the game is over (LP at 0)
    }

    heal() {
        if (this.lifePoints < 100 && this.monsterLifePoints > 0) {
            let heal = Math.floor(Math.random() * this.healPoints) + 1;
            this.lifePoints = Math.min(100, this.lifePoints + heal);

            // Monster attacks you even when you heal
            let damage = Math.floor(Math.random() * 5) + 2;
            this.lifePoints = Math.max(0, this.lifePoints - damage);

            lifePointsDisplay.textContent = this.lifePoints.toString();
        } else if (this.lifePoints <= 0) { // If life points are at 0
            attackButton.disabled = true;
            specialAttackButton.disabled = true;
            healBtn.disabled = true;
            resignBtn.disabled = true;
            confirm('You lost ! New game ?');
            location.reload();
        } else {
            alert("You already have full life points !")
        }

        (lifePointsDisplay as HTMLElement).style.width = this.lifePoints + '%';
    }

    result() {
        if (this.lifePoints <= 0) {
            attackButton.disabled = true;
            specialAttackButton.disabled = true;
            healBtn.disabled = true;
            resignBtn.disabled = true;
            alert('You lost ! New game ?');
            location.reload(); //Reload the page
        } else if (this.monsterLifePoints <= 0) {
            attackButton.disabled = true;
            specialAttackButton.disabled = true;
            healBtn.disabled = true;
            resignBtn.disabled = true;
            alert('You won ! New game ?');
            location.reload();
        }

    }

    resign() {
        attackButton.disabled = true;
        specialAttackButton.disabled = true;
        healBtn.disabled = true;
        lifePointsDisplay.textContent = '0';
        monsterLifePointsDisplay.textContent = '0';
        (lifePointsDisplay as HTMLElement).style.width = '0';
        (monsterLifePointsDisplay as HTMLElement).style.width = '0';
        alert('You resigned... New game ?');
        location.reload();
    }

}

let level = prompt('Choose your level : easy, medium, hard, impossible');
while (level !== 'easy' && level !== 'medium' && level !== 'hard' && level !== 'impossible') {
    level = prompt('Choose your level : easy, medium, hard, impossible');
}

let newGame: Game;
if (level === 'easy') {
    document.querySelector('.monster h2')!.textContent = "Placidusax's health";
    newGame = new Game(100, 100, 10, 10, 10, level)
}
else if (level === 'medium') {
    document.querySelector('.monster h2')!.textContent = "Loretta's health";
    newGame = new Game(100, 150, 10, 10, 10, level)
    let clickCountOnSpecialAttackBtn = 0;
    let clickCountOnHealBtn = 0;
    specialAttackButton.addEventListener('click', () => {
        clickCountOnSpecialAttackBtn++;
        if (clickCountOnSpecialAttackBtn === 7) {
            specialAttackButton.disabled = true;
            specialAttackButton.style.backgroundColor = 'red';
        }
    });

    healBtn.addEventListener('click', () => {
        clickCountOnHealBtn++;
        if (clickCountOnHealBtn === 7) {
            healBtn.disabled = true;
            healBtn.style.backgroundColor = 'red';
        }
    });
}
else if (level === 'hard') {
    document.querySelector('.monster h2')!.textContent = "Maliketh's health";
    newGame = new Game(100, 200, 10, 10, 10, level)
    let clickCountOnSpecialAttackBtn = 0;
    let clickCountOnHealBtn = 0;
    specialAttackButton.addEventListener('click', () => {
        clickCountOnSpecialAttackBtn++;
        if (clickCountOnSpecialAttackBtn === 4) {
            specialAttackButton.disabled = true;
            specialAttackButton.style.backgroundColor = 'red';
        }
    });

    healBtn.addEventListener('click', () => {
        clickCountOnHealBtn++;
        if (clickCountOnHealBtn === 4) {
            healBtn.disabled = true;
            healBtn.style.backgroundColor = 'red';
        }
    });
}
else if (level === 'impossible') {
    document.querySelector('.monster h2')!.textContent = "Malenia's health";
    newGame = new Game(100, 350, 10, 10, 10, level);
    let clickCountOnSpecialAttackBtn = 0;
    let clickCountOnHealBtn = 0;

    specialAttackButton.addEventListener('click', () => {
        clickCountOnSpecialAttackBtn++;
        if (clickCountOnSpecialAttackBtn === 3) {
            specialAttackButton.disabled = true;
            specialAttackButton.style.backgroundColor = 'red';
        }
    });

    healBtn.addEventListener('click', () => {
        clickCountOnHealBtn++;
        if (clickCountOnHealBtn === 3) {
            healBtn.disabled = true;
            healBtn.style.backgroundColor = 'red';
        }
    });

}


function eventBtn() {
    attackButton.addEventListener('click', () => {
        newGame.attack();
    });

    specialAttackButton.addEventListener('click', () => {
        newGame.specialAttack();
    });

    healBtn.addEventListener('click', () => {
        newGame.heal();
    });

    resignBtn.addEventListener('click', () => {
        newGame.resign();
    });
}

eventBtn();
