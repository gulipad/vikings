// Let's make it easy first: no inheritance, only Vikings

function Viking (name, strength) {
	this.name = name
	this.strength = strength
	this.health = 100
}

// Here we add the common methods for all Vikings

Viking.prototype.attack = function () {
	return Math.floor(this.strength*(Math.random()*(1.3 - 0.7) + 0.7));
}

Viking.prototype.receiveDamage = function (damage) {
	this.health-damage
}

guli = new Viking ('Guli', 30)
ragnarok = new Viking ('Ragnarok', 20)

//The Pit -> TODO: Make class of fighting ground to put The Pit and The Battlefield

function thePit (vikingA, vikingB, maxTurns) {
	this.turn = maxTurns
	this.vikingA = vikingA
	this.vikingB = vikingB
	while (turn > 0) {
		attackStrenghtA = vikingA.attack()
		attackStrenghtB = vikingB.attack()
		vikingA.health = vikingA.health - attackStrenghtB
		vikingB.health = vikingB.health - attackStrenghtB
		console.log(vikingA.name +' attacks with ' + attackStrenghtA + ' points of damage.')
		console.log(vikingB.name +' attacks with ' + attackStrenghtB + ' points of damage.')
	turn--
	}

}



