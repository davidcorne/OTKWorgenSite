//=============================================================================
var Worgen = {
    getTicked: function(id) {
        var element = document.getElementById(id);
        return element.checked ? 1 : 0;
    },
    getHand: function() {
        return {
            "worgen": 1, 
            "charge": 1,
            "inner_rage": Worgen.getTicked("inner_rage_1") + Worgen.getTicked("inner_rage_2"),
            "cruel_taskmaster": Worgen.getTicked("cruel_taskmaster"),
            "rampage": Worgen.getTicked("rampage_1") + Worgen.getTicked("rampage_2"),
            "faceless_manipulator": Worgen.getTicked("faceless_manipulator")
        }
    },
    isDamaged: function(hand) {
        // If there are any damaging cards
        return (hand.inner_rage + hand.cruel_taskmaster) > 0;
    },
    calculateMultiplier: function(hand) {
        var multiplier = 1;
        if (Worgen.isDamaged(hand)) {
            // Gets enraged
            multiplier += 1;
        }
        multiplier += (multiplier * hand.faceless_manipulator);
        return multiplier;

    },
    calculateHealth: function(hand) {
        var health = 3;
        health -= hand.inner_rage;
        health -= hand.cruel_taskmaster;
        health += 3 * hand.rampage;
        return health;
    },
    calculatePower: function(hand) {
        var power = 3;
        if (Worgen.isDamaged(hand)) {
            // Gets enraged
            power += 1;
        }
        // Charge, is always there
        power += 2;
        power += (2 * hand.inner_rage);
        power += (2 * hand.cruel_taskmaster);
        power += (3 * hand.rampage);
        return power;
    },
    calculateDamage: function(hand) {
        return Worgen.calculatePower(hand) * Worgen.calculateMultiplier(hand);
    },
    calculateCost: function(hand) {
        return (3 * hand.worgen) +
            (3 * hand.charge) +
            (2 * hand.cruel_taskmaster) +
            (2 * hand.rampage) +
            (5 * hand.faceless_manipulator);
    },
    calculate: function() {
        var hand = Worgen.getHand();
        if (!Worgen.isDamaged(hand)) {
            // Worgen isn't damaged, turn off rampage
            hand.rampage = 0;
            document.getElementById("rampage_1").checked = false;
            document.getElementById("rampage_2").checked = false;
        }
        var damage = Worgen.calculateDamage(hand);
        var cost = Worgen.calculateCost(hand);
        var health = Worgen.calculateHealth(hand);
        var warning = document.getElementById("warning");
        if (health <= 0) {
            warning.innerHTML = "Worgen Dies!";
            damage = 0;
        } else {
            warning.innerHTML = "";
        }
        document.getElementById("damage").innerHTML = damage;
        document.getElementById("cost").innerHTML = cost;
    },
};