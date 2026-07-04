/**
 * Nutrition calculation module — reusable across calculators.
 *
 * Formulas:
 *   BMR (Mifflin-St Jeor):
 *     Male:   10×weight(kg) + 6.25×height(cm) − 5×age + 5
 *     Female: 10×weight(kg) + 6.25×height(cm) − 5×age − 161
 *
 *   TDEE = BMR × activity factor
 *
 *   Goal calories (over TDEE):
 *     Lose:     TDEE × 0.80  (floor: 1500 kcal male / 1200 kcal female)
 *     Maintain:  TDEE
 *     Gain:     TDEE × 1.10
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Sex = 'male' | 'female'

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'intense'

export interface GoalCalories {
  lose: number
  maintain: number
  gain: number
}

export interface NutritionResult {
  bmr: number
  tdee: number
  goals: GoalCalories
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  intense: 1.725,
}

/** Safety floor — never suggest crash-diet levels */
const SAFETY_FLOOR: Record<Sex, number> = {
  male: 1500,
  female: 1200,
}

// ---------------------------------------------------------------------------
// Calculations
// ---------------------------------------------------------------------------

/**
 * Basal Metabolic Rate (Mifflin-St Jeor).
 *
 * @param sex      'male' | 'female'
 * @param weight   body weight in kg
 * @param height   height in cm
 * @param age      age in years
 * @returns BMR in kcal/day (rounded to nearest integer)
 */
export function calculateBMR(
  sex: Sex,
  weight: number,
  height: number,
  age: number,
): number {
  const base = 10 * weight + 6.25 * height - 5 * age
  return Math.round(sex === 'male' ? base + 5 : base - 161)
}

/**
 * Total Daily Energy Expenditure.
 *
 * @param bmr            basal metabolic rate in kcal/day
 * @param activityLevel  one of the predefined activity levels
 * @returns TDEE in kcal/day (rounded)
 */
export function calculateTDEE(
  bmr: number,
  activityLevel: ActivityLevel,
): number {
  return Math.round(bmr * ACTIVITY_FACTORS[activityLevel])
}

/**
 * Goal-based calorie targets derived from TDEE.
 *
 * Applies a safety floor so the "lose" target never drops below
 * 1 500 kcal (male) or 1 200 kcal (female).
 */
export function calculateGoalCalories(
  tdee: number,
  sex: Sex,
): GoalCalories {
  const rawLose = Math.round(tdee * 0.8)
  const floor = SAFETY_FLOOR[sex]

  return {
    lose: Math.max(rawLose, floor),
    maintain: tdee,
    gain: Math.round(tdee * 1.1),
  }
}

/**
 * All-in-one convenience: BMR → TDEE → goals in a single call.
 */
export function calculateAll(
  sex: Sex,
  weight: number,
  height: number,
  age: number,
  activityLevel: ActivityLevel,
): NutritionResult {
  const bmr = calculateBMR(sex, weight, height, age)
  const tdee = calculateTDEE(bmr, activityLevel)
  const goals = calculateGoalCalories(tdee, sex)
  return { bmr, tdee, goals }
}
