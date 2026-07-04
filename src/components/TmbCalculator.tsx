'use client'

import { useState, type FormEvent } from 'react'
import {
  calculateAll,
  type Sex,
  type ActivityLevel,
  type NutritionResult,
} from '@/lib/nutrition'
import styles from './TmbCalculator.module.css'

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
    calculate: string
  }
  result: {
    title: string
    bmrLabel: string
    bmrDesc: string
    tdeeLabel: string
    tdeeDesc: string
    loseLabel: string
    loseDesc: string
    maintainLabel: string
    maintainDesc: string
    gainLabel: string
    gainDesc: string
    kcalUnit: string
    goalTitle: string
    safetyNote: string
  }
}

export default function TmbCalculator({ dict }: { dict: Dict }) {
  const [sex, setSex] = useState<Sex>('male')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState<ActivityLevel>('moderate')
  const [result, setResult] = useState<NutritionResult | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const ageNum = parseInt(age, 10)
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    if (!ageNum || !heightNum || !weightNum) return

    const res = calculateAll(sex, weightNum, heightNum, ageNum, activity)
    setResult(res)

    // Scroll to result
    setTimeout(() => {
      document.getElementById('tmb-result')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  const safetyFloor = sex === 'female' ? 1200 : 1500

  return (
    <div className={styles.calculator}>
      <form onSubmit={handleSubmit} className={styles.form} id="tmb-form">
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
            <label htmlFor="tmb-age" className={styles.label}>
              {dict.form.ageLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="tmb-age"
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
            <label htmlFor="tmb-height" className={styles.label}>
              {dict.form.heightLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="tmb-height"
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
            <label htmlFor="tmb-weight" className={styles.label}>
              {dict.form.weightLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="tmb-weight"
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
          <label htmlFor="tmb-activity" className={styles.label}>
            {dict.form.activityLabel}
          </label>
          <select
            id="tmb-activity"
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

        <button type="submit" className={styles.submitBtn} id="tmb-calculate-btn">
          {dict.form.calculate}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className={styles.result} id="tmb-result">
          <h2 className={styles.resultTitle}>{dict.result.title}</h2>

          {/* BMR + TDEE cards */}
          <div className={styles.primaryCards}>
            <div className={`${styles.card} ${styles.cardBmr}`}>
              <span className={styles.cardLabel}>{dict.result.bmrLabel}</span>
              <span className={styles.cardValue}>{result.bmr.toLocaleString('pt-BR')}</span>
              <span className={styles.cardUnit}>{dict.result.kcalUnit}</span>
              <span className={styles.cardDesc}>{dict.result.bmrDesc}</span>
            </div>
            <div className={`${styles.card} ${styles.cardTdee}`}>
              <span className={styles.cardLabel}>{dict.result.tdeeLabel}</span>
              <span className={styles.cardValue}>{result.tdee.toLocaleString('pt-BR')}</span>
              <span className={styles.cardUnit}>{dict.result.kcalUnit}</span>
              <span className={styles.cardDesc}>{dict.result.tdeeDesc}</span>
            </div>
          </div>

          {/* Goal cards */}
          <h3 className={styles.goalTitle}>{dict.result.goalTitle}</h3>
          <div className={styles.goalCards}>
            <div className={`${styles.goalCard} ${styles.goalLose}`}>
              <span className={styles.goalIcon} aria-hidden="true">🔥</span>
              <span className={styles.goalLabel}>{dict.result.loseLabel}</span>
              <span className={styles.goalValue}>{result.goals.lose.toLocaleString('pt-BR')}</span>
              <span className={styles.goalUnit}>{dict.result.kcalUnit}</span>
              <span className={styles.goalDesc}>{dict.result.loseDesc}</span>
            </div>
            <div className={`${styles.goalCard} ${styles.goalMaintain}`}>
              <span className={styles.goalIcon} aria-hidden="true">⚖️</span>
              <span className={styles.goalLabel}>{dict.result.maintainLabel}</span>
              <span className={styles.goalValue}>{result.goals.maintain.toLocaleString('pt-BR')}</span>
              <span className={styles.goalUnit}>{dict.result.kcalUnit}</span>
              <span className={styles.goalDesc}>{dict.result.maintainDesc}</span>
            </div>
            <div className={`${styles.goalCard} ${styles.goalGain}`}>
              <span className={styles.goalIcon} aria-hidden="true">💪</span>
              <span className={styles.goalLabel}>{dict.result.gainLabel}</span>
              <span className={styles.goalValue}>{result.goals.gain.toLocaleString('pt-BR')}</span>
              <span className={styles.goalUnit}>{dict.result.kcalUnit}</span>
              <span className={styles.goalDesc}>{dict.result.gainDesc}</span>
            </div>
          </div>

          {/* Safety note */}
          {result.goals.lose === safetyFloor && (
            <p className={styles.safetyNote}>
              ⚠️ {dict.result.safetyNote.replace('{floor}', safetyFloor.toLocaleString('pt-BR'))}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
