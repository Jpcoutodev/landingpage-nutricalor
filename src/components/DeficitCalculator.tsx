'use client'

import { useState, type FormEvent } from 'react'
import {
  calculateBMR,
  calculateTDEE,
  calculateDeficit,
  SAFETY_FLOOR,
  type Sex,
  type ActivityLevel,
  type DeficitLevel,
  type DeficitResult,
} from '@/lib/nutrition'
import styles from './DeficitCalculator.module.css'

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
    deficitLabel: string
    deficitLight: string
    deficitModerate: string
    deficitAggressive: string
    calculate: string
  }
  result: {
    title: string
    tdeeLabel: string
    tdeeDesc: string
    targetLabel: string
    targetDesc: string
    deficitLabel: string
    deficitDesc: string
    weeklyLabel: string
    weeklyUnit: string
    weeklyDesc: string
    kcalUnit: string
    safetyNote: string
  }
}

export default function DeficitCalculator({ dict }: { dict: Dict }) {
  const [sex, setSex] = useState<Sex>('male')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState<ActivityLevel>('moderate')
  const [deficitLevel, setDeficitLevel] = useState<DeficitLevel>('moderate')
  const [result, setResult] = useState<DeficitResult | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const ageNum = parseInt(age, 10)
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    if (!ageNum || !heightNum || !weightNum) return

    const bmr = calculateBMR(sex, weightNum, heightNum, ageNum)
    const tdee = calculateTDEE(bmr, activity)
    const res = calculateDeficit(tdee, sex, deficitLevel)
    setResult(res)

    setTimeout(() => {
      document.getElementById('deficit-result')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  const safetyFloor = SAFETY_FLOOR[sex]

  return (
    <div className={styles.calculator}>
      <form onSubmit={handleSubmit} className={styles.form} id="deficit-form">
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
            <label htmlFor="deficit-age" className={styles.label}>
              {dict.form.ageLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="deficit-age"
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
            <label htmlFor="deficit-height" className={styles.label}>
              {dict.form.heightLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="deficit-height"
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
            <label htmlFor="deficit-weight" className={styles.label}>
              {dict.form.weightLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="deficit-weight"
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
          <label htmlFor="deficit-activity" className={styles.label}>
            {dict.form.activityLabel}
          </label>
          <select
            id="deficit-activity"
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

        {/* Deficit level */}
        <div className={styles.field}>
          <label htmlFor="deficit-level" className={styles.label}>
            {dict.form.deficitLabel}
          </label>
          <select
            id="deficit-level"
            value={deficitLevel}
            onChange={(e) => setDeficitLevel(e.target.value as DeficitLevel)}
            className={styles.select}
          >
            <option value="light">{dict.form.deficitLight}</option>
            <option value="moderate">{dict.form.deficitModerate}</option>
            <option value="aggressive">{dict.form.deficitAggressive}</option>
          </select>
        </div>

        <button type="submit" className={styles.submitBtn} id="deficit-calculate-btn">
          {dict.form.calculate}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className={styles.result} id="deficit-result">
          <h2 className={styles.resultTitle}>{dict.result.title}</h2>

          {/* Main cards: TDEE + Target */}
          <div className={styles.primaryCards}>
            <div className={`${styles.card} ${styles.cardTdee}`}>
              <span className={styles.cardLabel}>{dict.result.tdeeLabel}</span>
              <span className={styles.cardValue}>{result.tdee.toLocaleString('pt-BR')}</span>
              <span className={styles.cardUnit}>{dict.result.kcalUnit}</span>
              <span className={styles.cardDesc}>{dict.result.tdeeDesc}</span>
            </div>
            <div className={`${styles.card} ${styles.cardTarget}`}>
              <span className={styles.cardLabel}>{dict.result.targetLabel}</span>
              <span className={styles.cardValue}>{result.target.toLocaleString('pt-BR')}</span>
              <span className={styles.cardUnit}>{dict.result.kcalUnit}</span>
              <span className={styles.cardDesc}>{dict.result.targetDesc}</span>
            </div>
          </div>

          {/* Secondary cards: Deficit + Weekly loss */}
          <div className={styles.secondaryCards}>
            <div className={`${styles.secondaryCard} ${styles.cardDeficit}`}>
              <span className={styles.secIcon} aria-hidden="true">🔥</span>
              <div className={styles.secContent}>
                <span className={styles.secLabel}>{dict.result.deficitLabel}</span>
                <span className={styles.secValue}>
                  −{result.dailyDeficit.toLocaleString('pt-BR')}
                  <span className={styles.secUnit}> {dict.result.kcalUnit}</span>
                </span>
                <span className={styles.secDesc}>{dict.result.deficitDesc}</span>
              </div>
            </div>
            <div className={`${styles.secondaryCard} ${styles.cardWeekly}`}>
              <span className={styles.secIcon} aria-hidden="true">📉</span>
              <div className={styles.secContent}>
                <span className={styles.secLabel}>{dict.result.weeklyLabel}</span>
                <span className={styles.secValue}>
                  ~{result.weeklyLossKg.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  <span className={styles.secUnit}> {dict.result.weeklyUnit}</span>
                </span>
                <span className={styles.secDesc}>{dict.result.weeklyDesc}</span>
              </div>
            </div>
          </div>

          {/* Safety note */}
          {result.isFloored && (
            <p className={styles.safetyNote}>
              ⚠️ {dict.result.safetyNote.replace('{floor}', safetyFloor.toLocaleString('pt-BR'))}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
