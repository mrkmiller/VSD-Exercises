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
  //Ex.  return rollYacht(dice, category)
  //Ex2. return rollDigit(dice, category)
  return roller(dice, category)
};

function rollYacht(dice) {
  const diceSet = new Set(dice);

  if (diceSet.size == 1) {
    return 50 
  }

  return 0
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
  const key = Object.keys(groups).find(roll => groups[roll] >= 4)

  if (key) {
    return key * 4
  }

  return 0
}

function rollStraight(dice, category) {
  const straight = (category === 'little straight') ? '12345' : '23456'
  const sorted = dice.sort().join('');

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
  return scores.reduce((previous, current) => previous + current, 0)
}

function rollGroupings(dice) {
  const groups = {}

  dice.forEach(roll => {
    let previous = groups[roll] || 0
    groups[roll] = ++previous
  })

  return groups
}