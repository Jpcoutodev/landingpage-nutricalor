'use client'

import { useState } from 'react'
import {
  Sex,
  ActivityLevel,
  calculateAll,
  SAFETY_FLOOR,
} from '@/lib/nutrition'
import styles from './CaloriesCalculator.module.css'

type GoalType = 'lose' | 'maintain' | 'gain'

type CaloriesCalculatorProps = {
  dict: {
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
      tdeeLabel: string
      tdeeDesc: string
      loseLabel: string
      maintainLabel: string
      gainLabel: string
      kcalUnit: string
      safetyNote: string
    }
  }
}

export default function CaloriesCalculator({ dict }: CaloriesCalculatorProps) {
  const [sex, setSex] = useState<Sex>('female')
  const [age, setAge] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary')
  const [goal, setGoal] = useState<GoalType>('lose')
  const [result, setResult] = useState<{
    tdee: number
    target: number
    allGoals: { lose: number; maintain: number; gain: number }
    isFloored: boolean
    floor: number
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const parsedAge = parseInt(age, 10)
    const parsedHeight = parseInt(height, 10)
    const parsedWeight = parseFloat(weight.replace(',', '.'))
    
    if (!parsedAge || !parsedHeight || !parsedWeight) return

    const { tdee, goals } = calculateAll(sex, parsedWeight, parsedHeight, parsedAge, activityLevel)
    const target = goals[goal]
    const floor = SAFETY_FLOOR[sex]
    
    // Check if floored (only applicable to 'lose')
    const isFloored = goal === 'lose' && target === floor

    setResult({
      tdee,
      target,
      allGoals: goals,
      isFloored,
      floor,
    })
  }

  const formatNumber = (num: number) => num.toLocaleString('pt-BR')

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <span className={styles.label}>{dict.form.sexLabel}</span>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={sex === 'female'}
                  onChange={() => setSex('female')}
                />
                <span className={styles.radioText}>{dict.form.female}</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={sex === 'male'}
                  onChange={() => setSex('male')}
                />
                <span className={styles.radioText}>{dict.form.male}</span>
              </label>
            </div>
          </div>
        </div>

        <div className={styles.row3}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="age">{dict.form.ageLabel}</label>
            <input
              id="age"
              type="number"
              min="15"
              max="120"
              required
              placeholder={dict.form.agePlaceholder}
              className={styles.input}
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="height">{dict.form.heightLabel}</label>
            <input
              id="height"
              type="number"
              min="100"
              max="250"
              required
              placeholder={dict.form.heightPlaceholder}
              className={styles.input}
              value={height}
              onChange={e => setHeight(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="weight">{dict.form.weightLabel}</label>
            <input
              id="weight"
              type="number"
              min="30"
              max="300"
              step="0.1"
              required
              placeholder={dict.form.weightPlaceholder}
              className={styles.input}
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="activity">{dict.form.activityLabel}</label>
          <div className={styles.selectWrapper}>
            <select
              id="activity"
              className={styles.select}
              value={activityLevel}
              onChange={e => setActivityLevel(e.target.value as ActivityLevel)}
            >
              <option value="sedentary">{dict.form.sedentary}</option>
              <option value="light">{dict.form.light}</option>
              <option value="moderate">{dict.form.moderate}</option>
              <option value="intense">{dict.form.intense}</option>
            </select>
            <span className={styles.selectArrow} aria-hidden="true">▾</span>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="goal">{dict.form.goalLabel}</label>
          <div className={styles.selectWrapper}>
            <select
              id="goal"
              className={styles.select}
              value={goal}
              onChange={e => setGoal(e.target.value as GoalType)}
            >
              <option value="lose">{dict.form.goalLose}</option>
              <option value="maintain">{dict.form.goalMaintain}</option>
              <option value="gain">{dict.form.goalGain}</option>
            </select>
            <span className={styles.selectArrow} aria-hidden="true">▾</span>
          </div>
        </div>

        <button type="submit" className={styles.button}>
          {dict.form.calculate}
        </button>
      </form>

      {result && (
        <div className={styles.result} role="region" aria-live="polite">
          <h3 className={styles.resultTitle}>{dict.result.title}</h3>
          
          <div className={styles.heroResult}>
            <div className={styles.heroCard}>
              <span className={styles.heroLabel}>{dict.result.targetLabel}</span>
              <div className={styles.heroValueGroup}>
                <span className={styles.heroValue}>{formatNumber(result.target)}</span>
                <span className={styles.heroUnit}>{dict.result.kcalUnit}</span>
              </div>
              <span className={styles.heroDesc}>{dict.result.targetDesc}</span>
            </div>
          </div>

          <div className={styles.secondaryResult}>
            <div className={styles.secondaryCard}>
              <span className={styles.cardLabel}>{dict.result.tdeeLabel}</span>
              <span className={styles.cardValue}>{formatNumber(result.tdee)} <small>{dict.result.kcalUnit}</small></span>
              <span className={styles.cardDesc}>{dict.result.tdeeDesc}</span>
            </div>
          </div>

          {result.isFloored && (
            <div className={styles.safetyNote}>
              <span className={styles.safetyIcon} aria-hidden="true">⚠️</span>
              <p>{dict.result.safetyNote.replace('{floor}', result.floor.toString())}</p>
            </div>
          )}

          <div className={styles.allGoalsBox}>
            <div className={styles.allGoalsItem}>
              <span className={styles.allGoalsLabel}>{dict.result.loseLabel}</span>
              <span className={styles.allGoalsValue}>{formatNumber(result.allGoals.lose)}</span>
            </div>
            <div className={styles.allGoalsItem}>
              <span className={styles.allGoalsLabel}>{dict.result.maintainLabel}</span>
              <span className={styles.allGoalsValue}>{formatNumber(result.allGoals.maintain)}</span>
            </div>
            <div className={styles.allGoalsItem}>
              <span className={styles.allGoalsLabel}>{dict.result.gainLabel}</span>
              <span className={styles.allGoalsValue}>{formatNumber(result.allGoals.gain)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
