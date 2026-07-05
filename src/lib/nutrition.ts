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

export type ImcClassification = 'underweight' | 'normal' | 'overweight' | 'obesity'

export interface ImcResult {
  imc: number
  classification: ImcClassification
}

export interface MacrosResult {
  targetCalories: number
  proteinGram: number
  proteinKcal: number
  fatGram: number
  fatKcal: number
  carbsGram: number
  carbsKcal: number
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

export type DeficitLevel = 'light' | 'moderate' | 'aggressive'

export interface DeficitResult {
  tdee: number
  target: number
  dailyDeficit: number
  weeklyLossKg: number
  isFloored: boolean
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Safety floor — never suggest crash-diet levels */
export const SAFETY_FLOOR: Record<Sex, number> = {
  male: 1500,
  female: 1200,
}

/** Deficit multipliers applied to TDEE */
export const DEFICIT_FACTORS: Record<DeficitLevel, number> = {
  light: 0.9,
  moderate: 0.8,
  aggressive: 0.75,
}

/** Approximate kcal equivalent of 1 kg of body fat */
export const KCAL_PER_KG = 7700

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

/**
 * Deficit-focused calculation: TDEE → target with chosen deficit → weekly loss.
 *
 * Applies safety floor: target never below 1 500 kcal (male) / 1 200 (female).
 * Returns `isFloored = true` when the safety floor overrides the chosen deficit.
 *
 * Weekly loss estimate uses 7 700 kcal ≈ 1 kg of body fat.
 */
export function calculateDeficit(
  tdee: number,
  sex: Sex,
  deficitLevel: DeficitLevel,
): DeficitResult {
  const rawTarget = Math.round(tdee * DEFICIT_FACTORS[deficitLevel])
  const floor = SAFETY_FLOOR[sex]
  const isFloored = rawTarget < floor
  const target = isFloored ? floor : rawTarget
  const dailyDeficit = tdee - target
  const weeklyLossKg = parseFloat(((dailyDeficit * 7) / KCAL_PER_KG).toFixed(2))

  return { tdee, target, dailyDeficit, weeklyLossKg, isFloored }
}

/**
 * Body Mass Index (IMC).
 *
 * @param weight   body weight in kg
 * @param height   height in cm
 * @returns IMC result with value and WHO classification
 */
export function calculateIMC(weight: number, height: number): ImcResult {
  const heightInMeters = height / 100
  const imc = weight / (heightInMeters * heightInMeters)
  const roundedImc = parseFloat(imc.toFixed(1))

  let classification: ImcClassification = 'normal'
  if (roundedImc < 18.5) classification = 'underweight'
  else if (roundedImc < 25) classification = 'normal'
  else if (roundedImc < 30) classification = 'overweight'
  else classification = 'obesity'

  return { imc: roundedImc, classification }
}

/**
 * Macros calculation based on target calories and body weight.
 *
 * Protein: ~1.8 g per kg of weight.
 * Fat: ~25% of total calories (9 kcal/g).
 * Carbs: remaining calories (4 kcal/g).
 *
 * @param targetCalories  Target daily calories
 * @param weight          Body weight in kg
 */
export function calculateMacros(targetCalories: number, weight: number): MacrosResult {
  // Protein: 1.8g per kg, 4 kcal per gram
  const proteinGram = Math.round(weight * 1.8)
  const proteinKcal = proteinGram * 4

  // Fat: 25% of target calories, 9 kcal per gram
  const fatKcal = Math.round(targetCalories * 0.25)
  const fatGram = Math.round(fatKcal / 9)

  // Carbs: The remaining calories, 4 kcal per gram
  const carbsKcal = Math.max(0, targetCalories - proteinKcal - fatKcal)
  const carbsGram = Math.round(carbsKcal / 4)

  return {
    targetCalories,
    proteinGram,
    proteinKcal,
    fatGram,
    fatKcal,
    carbsGram,
    carbsKcal,
  }
}
