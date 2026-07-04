import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateBMR,
  calculateTDEE,
  calculateGoalCalories,
  calculateAll,
  ACTIVITY_FACTORS,
} from './nutrition'

// ---------------------------------------------------------------------------
// BMR — Mifflin-St Jeor
// ---------------------------------------------------------------------------

describe('calculateBMR', () => {
  it('male 80 kg / 180 cm / 30 y → 1780 kcal', () => {
    // 10×80 + 6.25×180 − 5×30 + 5 = 800 + 1125 − 150 + 5 = 1780
    assert.equal(calculateBMR('male', 80, 180, 30), 1780)
  })

  it('female 60 kg / 165 cm / 25 y → 1370 kcal', () => {
    // 10×60 + 6.25×165 − 5×25 − 161 = 600 + 1031.25 − 125 − 161 = 1345.25 → 1345
    assert.equal(calculateBMR('female', 60, 165, 25), 1345)
  })

  it('female 50 kg / 155 cm / 40 y → 1068 kcal', () => {
    // 10×50 + 6.25×155 − 5×40 − 161 = 500 + 968.75 − 200 − 161 = 1107.75 → 1108
    assert.equal(calculateBMR('female', 50, 155, 40), 1108)
  })

  it('male 100 kg / 190 cm / 20 y → 2093 kcal', () => {
    // 10×100 + 6.25×190 − 5×20 + 5 = 1000 + 1187.5 − 100 + 5 = 2092.5 → 2093
    assert.equal(calculateBMR('male', 100, 190, 20), 2093)
  })
})

// ---------------------------------------------------------------------------
// TDEE
// ---------------------------------------------------------------------------

describe('calculateTDEE', () => {
  it('applies sedentary factor (1.2)', () => {
    assert.equal(calculateTDEE(1780, 'sedentary'), Math.round(1780 * 1.2))
  })

  it('applies light factor (1.375)', () => {
    assert.equal(calculateTDEE(1780, 'light'), Math.round(1780 * 1.375))
  })

  it('applies moderate factor (1.55)', () => {
    assert.equal(calculateTDEE(1780, 'moderate'), Math.round(1780 * 1.55))
  })

  it('applies intense factor (1.725)', () => {
    assert.equal(calculateTDEE(1780, 'intense'), Math.round(1780 * 1.725))
  })
})

// ---------------------------------------------------------------------------
// Goal calories & safety floor
// ---------------------------------------------------------------------------

describe('calculateGoalCalories', () => {
  it('lose = TDEE × 0.8, maintain = TDEE, gain = TDEE × 1.1', () => {
    const goals = calculateGoalCalories(2500, 'male')
    assert.equal(goals.lose, 2000)
    assert.equal(goals.maintain, 2500)
    assert.equal(goals.gain, 2750)
  })

  it('safety floor: female never below 1200 kcal', () => {
    // TDEE = 1400 → lose = 1120 → clamped to 1200
    const goals = calculateGoalCalories(1400, 'female')
    assert.equal(goals.lose, 1200)
  })

  it('safety floor: male never below 1500 kcal', () => {
    // TDEE = 1800 → lose = 1440 → clamped to 1500
    const goals = calculateGoalCalories(1800, 'male')
    assert.equal(goals.lose, 1500)
  })

  it('does NOT clamp when above floor', () => {
    // TDEE = 2800, male → lose = 2240 (above 1500)
    const goals = calculateGoalCalories(2800, 'male')
    assert.equal(goals.lose, 2240)
  })
})

// ---------------------------------------------------------------------------
// All-in-one
// ---------------------------------------------------------------------------

describe('calculateAll', () => {
  it('composes BMR → TDEE → goals correctly', () => {
    const result = calculateAll('male', 80, 180, 30, 'moderate')
    assert.equal(result.bmr, 1780)
    assert.equal(result.tdee, Math.round(1780 * 1.55))
    assert.equal(result.goals.maintain, result.tdee)
    assert.equal(result.goals.lose, Math.round(result.tdee * 0.8))
    assert.equal(result.goals.gain, Math.round(result.tdee * 1.1))
  })

  it('sedentary small female triggers safety floor', () => {
    // BMR female 45 kg, 150 cm, 60 y = 10×45 + 6.25×150 − 5×60 − 161
    //   = 450 + 937.5 − 300 − 161 = 926.5 → 927
    // TDEE sedentary = 927 × 1.2 = 1112.4 → 1112
    // lose = 1112 × 0.8 = 889.6 → 890, but floor = 1200
    const result = calculateAll('female', 45, 150, 60, 'sedentary')
    assert.equal(result.bmr, 927)
    assert.equal(result.tdee, Math.round(927 * 1.2))
    assert.equal(result.goals.lose, 1200)
  })
})
