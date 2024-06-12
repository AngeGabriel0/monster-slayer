"use strict";
/* Idées d'amélioration

Niveaux de difficultés qui changent les variables (facile, moyen, difficile) */
var attackButton = document.querySelector('#attackBtn');
var specialAttackButton = document.querySelector('#specialBtn');
var healBtn = document.querySelector('#healBtn');
var resignBtn = document.querySelector('#resignBtn');
var lifePointsDisplay = document.querySelector('.life');
var monsterLifePointsDisplay = document.querySelector('.monster-life');
var Game = /** @class */ (function () {
    // Constructor method
    function Game(lifePoints, monsterLifePoints, attackPoints, specialAttackPoints, healPoints, level) {
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
    Game.prototype.attack = function () {
        var damage = Math.floor(Math.random() * 5) + 2;
        this.lifePoints = Math.floor(this.lifePoints - (damage * 0.3));
        this.monsterLifePoints = Math.floor(this.monsterLifePoints - damage);
        // Limit the life points to 0 and 100
        this.lifePoints = Math.max(0, this.lifePoints);
        this.monsterLifePoints = Math.max(0, this.monsterLifePoints);
        lifePointsDisplay.textContent = this.lifePoints.toString();
        monsterLifePointsDisplay.textContent = this.monsterLifePoints.toString();
        lifePointsDisplay.style.width = this.lifePoints + '%';
        monsterLifePointsDisplay.style.width = this.monsterLifePoints + '%';
        this.result(); //Verify if the game is over (LP at 0)
    };
    Game.prototype.specialAttack = function () {
        var damage = Math.floor(Math.random() * this.specialAttackPoints) + 4;
        this.lifePoints = Math.floor(this.lifePoints - damage * 0.3);
        this.monsterLifePoints = Math.floor(this.monsterLifePoints - damage);
        this.lifePoints = Math.max(0, this.lifePoints);
        this.monsterLifePoints = Math.max(0, this.monsterLifePoints);
        lifePointsDisplay.textContent = this.lifePoints.toString();
        monsterLifePointsDisplay.textContent = this.monsterLifePoints.toString();
        lifePointsDisplay.style.width = this.lifePoints + '%';
        monsterLifePointsDisplay.style.width = this.monsterLifePoints + '%';
        this.result(); //Verify if the game is over (LP at 0)
    };
    Game.prototype.heal = function () {
        if (this.lifePoints < 100 && this.monsterLifePoints > 0) {
            var heal = Math.floor(Math.random() * this.healPoints) + 1;
            this.lifePoints = Math.min(100, this.lifePoints + heal);
            // Monster attacks you even when you heal
            var damage = Math.floor(Math.random() * 5) + 2;
            this.lifePoints = Math.max(0, this.lifePoints - damage);
            lifePointsDisplay.textContent = this.lifePoints.toString();
        }
        else if (this.lifePoints <= 0) { // If life points are at 0
            alert('You lost!');
            attackButton.disabled = true;
            specialAttackButton.disabled = true;
            healBtn.disabled = true;
            resignBtn.disabled = true;
            location.reload();
        }
        else {
            alert("You already have full life points!");
        }
        lifePointsDisplay.style.width = this.lifePoints + '%';
    };
    Game.prototype.result = function () {
        if (this.lifePoints <= 0) {
            alert('You lost! New game ?');
            attackButton.disabled = true;
            specialAttackButton.disabled = true;
            healBtn.disabled = true;
            resignBtn.disabled = true;
            location.reload(); //Reload the page
        }
        else if (this.monsterLifePoints <= 0) {
            alert('You won! New game ?');
            attackButton.disabled = true;
            specialAttackButton.disabled = true;
            healBtn.disabled = true;
            resignBtn.disabled = true;
            location.reload();
        }
    };
    Game.prototype.resign = function () {
        alert('You resigned! New game ?');
        attackButton.disabled = true;
        specialAttackButton.disabled = true;
        healBtn.disabled = true;
        lifePointsDisplay.textContent = '0';
        monsterLifePointsDisplay.textContent = '0';
        lifePointsDisplay.style.width = '0';
        monsterLifePointsDisplay.style.width = '0';
    };
    return Game;
}());
var level = prompt('Choose your level: easy, medium, hard, impossible');
while (level !== 'easy' && level !== 'medium' && level !== 'hard' && level !== 'impossible') {
    level = prompt('Choose your level: easy, medium, hard, impossible');
}
var newGame;
if (level === 'easy' || level === 'medium') {
    newGame = new Game(100, 100, 10, 15, 10, level);
}
else if (level === 'hard') {
    newGame = new Game(100, 150, 15, 15, 10, level);
    //Desactivate the special attack button after 5 clicks
    var clickCount_1 = 0;
    specialAttackButton.addEventListener('click', function () {
        clickCount_1++;
        if (clickCount_1 === 5) {
            specialAttackButton.disabled = true;
            specialAttackButton.style.backgroundColor = 'red';
        }
    });
}
else if (level === 'impossible') {
    newGame = new Game(100, 300, 20, 15, 10, level);
    //Desactivate the special attack and the heal button after 3 clicks
    var clickCountOnSpecialAttackBtn_1 = 0;
    var clickCountOnHealBtn_1 = 0;
    specialAttackButton.addEventListener('click', function () {
        clickCountOnSpecialAttackBtn_1++;
        if (clickCountOnSpecialAttackBtn_1 === 3) {
            specialAttackButton.disabled = true;
            specialAttackButton.style.backgroundColor = 'red';
        }
    });
    healBtn.addEventListener('click', function () {
        clickCountOnHealBtn_1++;
        if (clickCountOnHealBtn_1 === 3) {
            healBtn.disabled = true;
            healBtn.style.backgroundColor = 'red';
        }
    });
}
function eventBtn() {
    attackButton.addEventListener('click', function () {
        newGame.attack();
    });
    specialAttackButton.addEventListener('click', function () {
        newGame.specialAttack();
    });
    healBtn.addEventListener('click', function () {
        newGame.heal();
    });
    resignBtn.addEventListener('click', function () {
        newGame.resign();
    });
}
eventBtn();
