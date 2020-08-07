// Match a category name to a function name.
const categoryMap = {
  'yacht': rollYacht,
  'ones': rollDigit,
  'twos': rollDigit,
  'threes': rollDigit,
  'fours': rollDigit,
  'fives': rollDigit,
  'sixes': rollDigit,
  'full house': rollFullHouse,
  'four of a kind': rollFourKind,
  'little straight': rollStraight,
  'big straight': rollStraight,
  'choice': rollChoice
}

export const score = (dice, category) => {
  const roller = categoryMap[category]
  return roller(dice, category)
  //Ex.  return rollYacht(dice)
  //Ex2. return rollDigit(dice)
};

function rollYacht(dice) {
  const diceSet = new Set(dice);

  if (diceSet.size == 1) {
    return 50 
  } else {
    return 0
  }
}

function rollDigit(dice, category) {
  const numerals = {
    'ones':   1,
    'twos':   2,
    'threes': 3,
    'fours':  4,
    'fives':  5,
    'sixes':  6
  }

  const winners = dice.filter(roll => roll === numerals[category])
  return sum(winners)
}

function rollFourKind(dice) {
  const groups = rollGroupings(dice)
  const key = Object.keys(groups).find(key => groups[key] >= 4)

  if (key) {
    return key * 4
  }

  return 0
}

function rollStraight(dice, category) {
  const straight = (category === 'little straight') ? '1,2,3,4,5' : '2,3,4,5,6'
  const sorted = dice.sort().join();

  if (sorted === straight) {
    return 30
  }

  return 0
}

function rollFullHouse(dice) {
  const groups = rollGroupings(dice)
  const counts = Object.values(groups)

  if (counts.includes(2) && counts.includes(3)) {
    return sum(dice)
  }

  return 0;
}

function rollChoice(dice) {
  return sum(dice)
}

function sum(scores) {
  return scores.reduce((previous, current) => {
    return previous + current
  }, 0)
}

function rollGroupings(dice) {
  const groups = {}

  dice.forEach(current => {
    let previous = groups[current] ? groups[current] : 0
    groups[current] = ++previous
  })

  return groups
}