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
                this.attackPoints *= 5;
                this.specialAttackPoints *= 10;
                this.healPoints *= 3;
                break;

            case 'medium':
                break;

            case 'hard':
                this.attackPoints *= 0.8;
                this.specialAttackPoints *= 2;
                this.healPoints = 0;
                this.monsterLifePoints = 150;
                monsterLifePointsDisplay.innerHTML = '150';
                break;

            case 'impossible':
                this.attackPoints *= 0.6;
                this.specialAttackPoints *= 4;
                this.healPoints /= 1.5;
                this.monsterLifePoints = 250;
                monsterLifePointsDisplay.innerHTML = '250';
                break;
        }

    }

    attack() {
        let damage = Math.floor(Math.random() * 5) + 2;
        this.lifePoints = Math.floor(this.lifePoints - (damage * 0.3));
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
        let damage = Math.floor(Math.random() * this.specialAttackPoints) + 4;
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
            alert('You lost!');
            attackButton.disabled = true;
            specialAttackButton.disabled = true;
            healBtn.disabled = true;
            resignBtn.disabled = true;
            location.reload();
        } else {
            alert("You already have full life points!")
        }

        (lifePointsDisplay as HTMLElement).style.width = this.lifePoints + '%';
    }

    result() {
        if (this.lifePoints <= 0) {
            alert('You lost! New game ?');
            attackButton.disabled = true;
            specialAttackButton.disabled = true;
            healBtn.disabled = true;
            resignBtn.disabled = true;
            location.reload(); //Reload the page
        } else if (this.monsterLifePoints <= 0) {
            alert('You won! New game ?');
            attackButton.disabled = true;
            specialAttackButton.disabled = true;
            healBtn.disabled = true;
            resignBtn.disabled = true;
            location.reload();
        }

    }

    resign() {
        alert('You resigned! New game ?');
        attackButton.disabled = true;
        specialAttackButton.disabled = true;
        healBtn.disabled = true;
        lifePointsDisplay.textContent = '0';
        monsterLifePointsDisplay.textContent = '0';
        (lifePointsDisplay as HTMLElement).style.width = '0';
        (monsterLifePointsDisplay as HTMLElement).style.width = '0';
    }

}

let level = prompt('Choose your level: easy, medium, hard, impossible');
while (level !== 'easy' && level !== 'medium' && level !== 'hard' && level !== 'impossible') {
    level = prompt('Choose your level: easy, medium, hard, impossible');
}

let newGame: Game;
if (level === 'easy' || level === 'medium') {
    newGame = new Game(100, 100, 10, 15, 10, level)
}
else if (level === 'hard') {
    newGame = new Game(100, 150, 15, 15, 10, level)
    //Desactivate the special attack button after 5 clicks
    let clickCount = 0;
    specialAttackButton.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            specialAttackButton.disabled = true;
            specialAttackButton.style.backgroundColor = 'red';
        }
    });
}
else if (level === 'impossible') {
    newGame = new Game(100, 300, 20, 15, 10, level);
    //Desactivate the special attack and the heal button after 3 clicks
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
