class Monster {
    constructor(name, sprite, hp, moves) {
        this.name = name;
        this.sprite = sprite;
        this.hp = hp;
        this.fullhp = hp;
        this.moves = moves;
    }
}

let monsterList = [
    ['King Cratos', "Assets/crate.png", 250, [
        ['Gravity Slam', 15, 0.95],
        ['Splinters', 100, 0.75],
        ['Wooden Axe Swing', 25, 0.85],
        ['Box Opening', 20]
    ]],
    ['Chrome Dino', "Assets/trex.png", 182, [
        ['Cant Be Detected By Satellites', 50, 0.95],
        ['Plot Armor Bash',  40, 0.95],
        ['WIFI DENIED', 100, 0.75],
        ['Prehistoric Roar', 30, 0.95]
    ]],
    ['Chrome Cactus', "Assets/cactus.png", 110, [
        ['In the Shadows', 115, 0.95],
        ['Explosive Cacti', 120, 0.95],
        ['Flying Pterodactyl Drones', 45, 0.85],
        ['Standing Still Menancingly', 50]
    ]]
];

function spawn(bool) {
let p = monsterList[Math.floor(Math.random() * monsterList.length)];
let mon = new Monster(p[0], p[1], p[2], p[3]);

if (bool) {
    for (i = 0; i < 4; i++) {
        document.getElementById('m' + i).value = mon.moves[i][0];
    }
}
return mon;
}

let mon1 = spawn(true);
s1 = document.createElement('img');
s1.src = mon1.sprite;
document.getElementById('mon1').appendChild(s1);
document.getElementById('hp1').innerHTML = '<p>Player HP: ' + mon1.hp + '/' + mon1.fullhp + '</p>';

let mon2 = spawn(false);
s2 = document.createElement('img');
s2.src = mon2.sprite;
document.getElementById('mon2').appendChild(s2);
document.getElementById('hp2').innerHTML = '<p>Enemy HP: ' + mon2.hp + '/' + mon2.fullhp + '</p>';



for (i = 0; i < 4; i++) {
let btn = document.getElementById('m' + i);
let move = mon1.moves[i];

function addHandler(btn, move, mon1, mon2) {
    btn.addEventListener('click', function(e) {
        attack(move, mon1, mon2, 'hp2', '');
        setTimeout(attack, 2000, mon2.moves[Math.floor(Math.random() * 2)], mon2, mon1, 'hp1', 'Foe ');
    });
  }
  addHandler(btn, move, mon1, mon2);
}



function attack(move, attacker, receiver, hp, owner) {
document.getElementById('comment').innerHTML = '<p>' + owner + attacker.name + ' used ' + move[0] + '!</p>';
if (Math.random() < move[2]) {
    let power = move[1] += Math.floor(Math.random() * 10);
    receiver.hp -= Math.floor(power);
    document.getElementById(hp).innerHTML = '<p>Enemy HP: ' + receiver.hp + '/' + receiver.fullhp + '</p>';
} else {
    setTimeout(function() {
        document.getElementById('comment').innerHTML = '<p>Attack missed!</p>';
    })
}
checkWinner(hp);


}


function checkWinner(hp) {
let f = (mon1.hp <= 0) ? mon1 : (mon2.hp <= 0) ? mon2 : false;
if (f != false) {
    alert('GAME OVER: ' + f.name + ' fainted!');
    document.getElementById(hp).innerHTML = '<p>HP: 0/' + f.fullhp + '</p>';
    setTimeout(function() {
        location.reload();
    }, 1500)
}
}














