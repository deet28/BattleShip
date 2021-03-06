const Player = require('./../Factories/player.js');

test('Player starts by creating gameboard',() => {
  const playerOne = new Player('David');
  expect(playerOne.gameboard.ships.battleShip.name).toBe('Battle Ship')
});

test('Players can attack gameboards',() => {
  const playerOne = new Player('David');
  const playerTwo = new Player('Computer');
  playerOne.gameboard.placeShips(playerOne.gameboard.ships.battleShip,12);
  playerTwo.gameboard.placeShips(playerTwo.gameboard.ships.patrolBoat,30);
  playerOne.turn(playerTwo,31);
  expect(playerTwo.gameboard.ships.patrolBoat.hits).toBe(1);
});

test('When players attack gameboards, gameboards can record player misses',() => {
  const playerOne = new Player('David');
  const playerTwo = new Player('Computer');
  playerOne.turn(playerTwo,40);
  expect(playerTwo.gameboard.missedShots).toEqual([[4,0]]);
});

test('Testing randomly generated attack for computer player',()=>{
  const playerOne = new Player('David');
  const playerTwo = new Player('Computer');
  const regex = new RegExp(/[0-9,0-9]/);
  playerTwo.turn(playerOne);
  expect(regex.test(playerOne.gameboard.missedShots)).toBe(true);
});

test('Computer tracks previous attacks so it does not repeat an attack',() => {
  const playerOne = new Player('David');
  const playerTwo = new Player('Computer');
  playerTwo.turn(playerOne);
  playerTwo.turn(playerOne)
  expect(playerTwo.attacks.length).toEqual(2);
});




