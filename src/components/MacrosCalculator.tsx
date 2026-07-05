'use client'

import { useState, type FormEvent } from 'react'
import {
  calculateAll,
  calculateMacros,
  type Sex,
  type ActivityLevel,
  type MacrosResult,
} from '@/lib/nutrition'
import styles from './MacrosCalculator.module.css'

type GoalLevel = 'lose' | 'maintain' | 'gain'

type Dict = {
  form: {
    sexLabel: string
    male: string
    female: string
    ageLabel: string
    agePlaceholder: string
    heightLabel: string
    heightPlaceholder: string
    weightLabel: string
    weightPlaceholder: string
    activityLabel: string
    sedentary: string
    light: string
    moderate: string
    intense: string
    goalLabel: string
    goalLose: string
    goalMaintain: string
    goalGain: string
    calculate: string
  }
  result: {
    title: string
    targetLabel: string
    targetDesc: string
    proteinLabel: string
    proteinDesc: string
    fatLabel: string
    fatDesc: string
    carbsLabel: string
    carbsDesc: string
    gramUnit: string
    kcalUnit: string
    safetyNote: string
  }
}

export default function MacrosCalculator({ dict }: { dict: Dict }) {
  const [sex, setSex] = useState<Sex>('male')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState<ActivityLevel>('moderate')
  const [goal, setGoal] = useState<GoalLevel>('lose')
  const [result, setResult] = useState<MacrosResult | null>(null)
  const [showSafetyFloor, setShowSafetyFloor] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const ageNum = parseInt(age, 10)
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    if (!ageNum || !heightNum || !weightNum) return

    // Calculate TDEE and Goal calories
    const nutritionRes = calculateAll(sex, weightNum, heightNum, ageNum, activity)
    const targetCalories = nutritionRes.goals[goal]
    
    // Check if the floor was hit on 'lose' goal
    const safetyFloor = sex === 'female' ? 1200 : 1500
    const rawLose = Math.round(nutritionRes.tdee * 0.8)
    const isFloored = goal === 'lose' && rawLose < safetyFloor
    setShowSafetyFloor(isFloored)

    const macrosRes = calculateMacros(targetCalories, weightNum)
    setResult(macrosRes)

    // Scroll to result
    setTimeout(() => {
      document.getElementById('macros-result')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  const safetyFloor = sex === 'female' ? 1200 : 1500

  return (
    <div className={styles.calculator}>
      <form onSubmit={handleSubmit} className={styles.form} id="macros-form">
        {/* Sex */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>{dict.form.sexLabel}</legend>
          <div className={styles.toggleGroup}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${sex === 'male' ? styles.toggleActive : ''}`}
              onClick={() => setSex('male')}
              aria-pressed={sex === 'male'}
            >
              {dict.form.male}
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${sex === 'female' ? styles.toggleActive : ''}`}
              onClick={() => setSex('female')}
              aria-pressed={sex === 'female'}
            >
              {dict.form.female}
            </button>
          </div>
        </fieldset>

        {/* Numeric inputs */}
        <div className={styles.inputGrid}>
          <div className={styles.field}>
            <label htmlFor="macros-age" className={styles.label}>
              {dict.form.ageLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="macros-age"
                type="number"
                inputMode="numeric"
                min={10}
                max={120}
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={styles.input}
                placeholder={dict.form.agePlaceholder}
              />
              <span className={styles.inputUnit}>{dict.form.agePlaceholder}</span>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="macros-height" className={styles.label}>
              {dict.form.heightLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="macros-height"
                type="number"
                inputMode="decimal"
                min={100}
                max={250}
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={styles.input}
                placeholder={dict.form.heightPlaceholder}
              />
              <span className={styles.inputUnit}>{dict.form.heightPlaceholder}</span>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="macros-weight" className={styles.label}>
              {dict.form.weightLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="macros-weight"
                type="number"
                inputMode="decimal"
                min={30}
                max={300}
                step={0.1}
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={styles.input}
                placeholder={dict.form.weightPlaceholder}
              />
              <span className={styles.inputUnit}>{dict.form.weightPlaceholder}</span>
            </div>
          </div>
        </div>

        {/* Activity level */}
        <div className={styles.field}>
          <label htmlFor="macros-activity" className={styles.label}>
            {dict.form.activityLabel}
          </label>
          <select
            id="macros-activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value as ActivityLevel)}
            className={styles.select}
          >
            <option value="sedentary">{dict.form.sedentary}</option>
            <option value="light">{dict.form.light}</option>
            <option value="moderate">{dict.form.moderate}</option>
            <option value="intense">{dict.form.intense}</option>
          </select>
        </div>
        
        {/* Goal level */}
        <div className={styles.field}>
          <label htmlFor="macros-goal" className={styles.label}>
            {dict.form.goalLabel}
          </label>
          <select
            id="macros-goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value as GoalLevel)}
            className={styles.select}
          >
            <option value="lose">{dict.form.goalLose}</option>
            <option value="maintain">{dict.form.goalMaintain}</option>
            <option value="gain">{dict.form.goalGain}</option>
          </select>
        </div>

        <button type="submit" className={styles.submitBtn} id="macros-calculate-btn">
          {dict.form.calculate}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className={styles.result} id="macros-result">
          <h2 className={styles.resultTitle}>{dict.result.title}</h2>

          {/* Main target calories */}
          <div className={`${styles.card} ${styles.cardTarget}`}>
            <span className={styles.cardLabel}>{dict.result.targetLabel}</span>
            <span className={styles.cardValue}>{result.targetCalories.toLocaleString('pt-BR')}</span>
            <span className={styles.cardUnit}>{dict.result.kcalUnit}</span>
            <span className={styles.cardDesc}>{dict.result.targetDesc}</span>
          </div>

          {/* Macros cards */}
          <div className={styles.macrosCards}>
            <div className={`${styles.macroCard} ${styles.macroProtein}`}>
              <span className={styles.macroLabel}>{dict.result.proteinLabel}</span>
              <div className={styles.macroValueGroup}>
                <span className={styles.macroGram}>{result.proteinGram.toLocaleString('pt-BR')}</span>
                <span className={styles.macroGramUnit}>{dict.result.gramUnit}</span>
              </div>
              <span className={styles.macroKcal}>{result.proteinKcal.toLocaleString('pt-BR')} {dict.result.kcalUnit}</span>
              <span className={styles.macroDesc}>{dict.result.proteinDesc}</span>
            </div>
            
            <div className={`${styles.macroCard} ${styles.macroCarbs}`}>
              <span className={styles.macroLabel}>{dict.result.carbsLabel}</span>
              <div className={styles.macroValueGroup}>
                <span className={styles.macroGram}>{result.carbsGram.toLocaleString('pt-BR')}</span>
                <span className={styles.macroGramUnit}>{dict.result.gramUnit}</span>
              </div>
              <span className={styles.macroKcal}>{result.carbsKcal.toLocaleString('pt-BR')} {dict.result.kcalUnit}</span>
              <span className={styles.macroDesc}>{dict.result.carbsDesc}</span>
            </div>

            <div className={`${styles.macroCard} ${styles.macroFat}`}>
              <span className={styles.macroLabel}>{dict.result.fatLabel}</span>
              <div className={styles.macroValueGroup}>
                <span className={styles.macroGram}>{result.fatGram.toLocaleString('pt-BR')}</span>
                <span className={styles.macroGramUnit}>{dict.result.gramUnit}</span>
              </div>
              <span className={styles.macroKcal}>{result.fatKcal.toLocaleString('pt-BR')} {dict.result.kcalUnit}</span>
              <span className={styles.macroDesc}>{dict.result.fatDesc}</span>
            </div>
          </div>

          {/* Safety note */}
          {showSafetyFloor && (
            <p className={styles.safetyNote}>
              ⚠️ {dict.result.safetyNote.replace('{floor}', safetyFloor.toLocaleString('pt-BR'))}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
