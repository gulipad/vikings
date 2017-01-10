var minVariability = 0.9
var maxVariability = 1.1

var Warrior = function(maxStrength, maxHealth) {
	this.strength = this._calculateRandom(maxStrength, maxVariability, minVariability)
	this.health = maxHealth
}

Warrior.prototype._calculateRandom = function (points, maxVariability, minVariability) {
	return Math.round(points * (Math.random() * (maxVariability - minVariability) + minVariability))
}

Warrior.prototype.attack = function	() {
	return this._calculateRandom(this.strength, maxVariability, minVariability)
}

Warrior.prototype.receiveDamage = function (damage) {
	this.health = this.health - damage
}

Warrior.prototype.rest = function (maxHealth) {
	this.health = maxHealth
}


var Viking = function (maxStrength, maxHealth, name) {
	Warrior.call(this, maxStrength, maxHealth)
	this.name = name
}

Viking.prototype = Object.create(Warrior.prototype)
Viking.prototype.constructor = Viking

var Saxon = function (maxStrength, maxHealth) {
	Warrior.call(this, maxStrength, maxHealth)
	this.name = "Plain Ol' Saxon"
}

Saxon.prototype = Object.create(Warrior.prototype)
Saxon.prototype.constructor = Saxon

var Pit = function (fighter1, fighter2, maxTurns) {
	this.localFighter = fighter1;
	this.visitingFighter = fighter2;
	this.maxTurns = maxTurns
}

Pit.prototype.fight = function() {
	var maxHealthLocal = this.localFighter.health
	var maxHealthVisiting = this.visitingFighter.health
	var maxTurns = this.maxTurns
	while (this._fightContinues(damageVisitor, damageLocal) && this.maxTurns > 0 ) {
		let localFighter = this.localFighter
		let visitingFighter = this.visitingFighter
		
		var damageVisitor = localFighter.attack() 
		var damageLocal = visitingFighter.attack()

		localFighter.receiveDamage(damageLocal)
		visitingFighter.receiveDamage(damageVisitor)

		console.log(visitingFighter.name + ' attacks with ' + damageLocal + ' damage. ' + localFighter.name + ' has ' + localFighter.health + ' health left.')
		console.log(localFighter.name + ' attacks with ' + damageVisitor + ' damage. ' + visitingFighter.name + ' has ' + visitingFighter.health + ' health left.')
		this.maxTurns--
	}
	return this._decideWinner(maxHealthLocal, maxHealthVisiting, maxTurns)
}

Pit.prototype._fightContinues = function (damageVisitor, damageLocal) {
	console.log('###########################')
	if (this.localFighter.health - this.visitingFighter.strength*maxVariability < 0 || this.visitingFighter.health - this.localFighter.strength*maxVariability < 0) {
		return false
	}
	return true
}

Pit.prototype._decideWinner	= function (maxHealthLocal, maxHealthVisiting, maxTurns) {
	if (this.localFighter.health === this.visitingFighter.health) {
		'The warriors have tied. It is time for them to rest.'
	} else if (this.localFighter.health > this.visitingFighter.health) {
		console.log(this.localFighter.name + ' is victorious! It is time for both to rest...')
	} else {
		console.log(this.visitingFighter.name + ' is victorious! It is time for both to rest...')
	}
	this.localFighter.rest(maxHealthLocal)
	this.visitingFighter.rest(maxHealthVisiting)
	this.maxTurns = maxTurns
}

var Deathmatch = function(fighter1, fighter2, maxTurns) {
	Pit.call(this, fighter1, fighter2, maxTurns)
}

Deathmatch.prototype = Object.create(Pit.prototype)
Deathmatch.prototype.constructor = Deathmatch

Deathmatch.prototype._fightContinues = function (damageVisitor, damageLocal) {
	console.log('###########################')
	if (this.localFighter.health  < 0 || this.visitingFighter.health < 0) {
		return false
	}
	return true
}

Deathmatch.prototype._decideWinner = function () {
	var result = {}
	if (this.localFighter.health < 0 && this.visitingFighter.health < 0) {
		console.log('They have killed each other - at the same time!')
		return result = {}
	} else if (this.localFighter.health > this.visitingFighter.health) {
		console.log(this.localFighter.name + ' is victorious! ' + this.visitingFighter.name + ' has perished in honorable battle')
		return result = {
			winner: this.localFighter,
			loser: this.visitingFighter
		}
	} else {
		console.log(this.visitingFighter.name + ' is victorious! ' + this.localFighter.name + ' has perished in honorable battle')
		return result = {
			winner: this.visitingFighter,
			loser: this.localFighter
		}	
	}
}

var War = function(localArmy, visitingArmy) {
	this.localArmy = localArmy
	this.visitingArmy = visitingArmy

	if (this.localArmy[1].constructor.name === 'Saxon') {
		this.saxonArmy = this.localArmy
		this.vikingArmy = this.visitingArmy
	} else {
		this.saxonArmy = this.visitingArmy
		this.vikingArmy = this.localArmy
	}

}

War.prototype.startWar = function() {
	var saxon = this.randomWarrior(this.saxonArmy)
	var viking = this.randomWarrior(this.vikingArmy)
	while (this.warEnds()) {
		var result = new Deathmatch(saxon, viking, 999).fight()
		if (Object.keys(result).length === 0) {
			this.saxonArmy = this.saxonArmy.filter(function (remove) {return !(remove === saxon)})
			this.vikingArmy = this.vikingArmy.filter( function (remove) { return !(remove === viking)})
			saxon = this.randomWarrior(this.saxonArmy)
			viking = this.randomWarrior(this.vikingArmy)
		} else if (result.loser.constructor.name === 'Viking') {
			this.vikingArmy = this.vikingArmy.filter( function (remove) { return !(remove === viking)})
			viking = this.randomWarrior(this.vikingArmy)
		} else if (result.loser.constructor.name === 'Saxon') {
			this.saxonArmy = this.saxonArmy.filter(function (remove) {return !(remove === saxon)})
			saxon = this.randomWarrior(this.saxonArmy)
		}
	}
	this._decideWinner()
}

War.prototype.warEnds = function () {
	if (this.saxonArmy.length === 0 || this.visitingArmy.length === 0) {
		return false 	
	}
	return true 
}

War.prototype._decideWinner = function () {
	console.log('*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*·*')
	if (this.saxonArmy.length === 0 && this.vikingArmy.length === 0) {
		console.log('Both armies have been destroyed. What are the odds!')
	} else if (this.vikingArmy.length === 0 && this.saxonArmy.length !== 0) {
		console.log('The Saxons have destroyed their invaders!')
	} else if (this.vikingArmy.length !== 0 && this.saxonArmy.length === 0) {
		console.log('The  vikings have crushed the poor Saxons like little bugs...')
	} 
}

War.prototype.randomWarrior = function (army) {
  var index = Math.floor((Math.random() * army.length) + 1) -1;
  return army[index];
}

War.prototype.deadCollector = function () {

}

var guli = new Viking (25,80,'Guli')
var belus = new Viking (20,100,'Belus')
var saxon1 = new Saxon (10, 50)
var saxon2 = new Saxon (5, 50)
var saxon3 = new Saxon (15, 50)
var saxon4 = new Saxon (10, 50)
var saxon5 = new Saxon (5, 50)
var localArmy = [saxon1, saxon2, saxon3, saxon5, saxon4]
var visitingArmy = [belus, guli]

var thePit = new Pit (guli, belus, 5)
var theDeathmatch = new Deathmatch (guli, belus, 5) 
var theWar = new War (localArmy, visitingArmy) 
theWar.startWar()





