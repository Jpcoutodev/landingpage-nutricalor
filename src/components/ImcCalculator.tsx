'use client'

import { useState, type FormEvent } from 'react'
import { calculateIMC, type ImcResult } from '@/lib/nutrition'
import styles from './ImcCalculator.module.css'

type Dict = {
  form: {
    heightLabel: string
    heightPlaceholder: string
    weightLabel: string
    weightPlaceholder: string
    calculate: string
  }
  result: {
    title: string
    imcLabel: string
    classificationLabel: string
    underweight: string
    normal: string
    overweight: string
    obesity: string
    safetyNote: string
  }
}

export default function ImcCalculator({ dict }: { dict: Dict }) {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState<ImcResult | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    if (!heightNum || !weightNum) return

    const res = calculateIMC(weightNum, heightNum)
    setResult(res)

    // Scroll to result
    setTimeout(() => {
      document.getElementById('imc-result')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  function getClassificationText(classification: string) {
    switch (classification) {
      case 'underweight':
        return dict.result.underweight
      case 'normal':
        return dict.result.normal
      case 'overweight':
        return dict.result.overweight
      case 'obesity':
        return dict.result.obesity
      default:
        return ''
    }
  }

  function getClassificationClass(classification: string) {
    switch (classification) {
      case 'underweight':
        return styles.classUnderweight
      case 'normal':
        return styles.classNormal
      case 'overweight':
        return styles.classOverweight
      case 'obesity':
        return styles.classObesity
      default:
        return ''
    }
  }

  return (
    <div className={styles.calculator}>
      <form onSubmit={handleSubmit} className={styles.form} id="imc-form">
        <div className={styles.inputGrid}>
          <div className={styles.field}>
            <label htmlFor="imc-height" className={styles.label}>
              {dict.form.heightLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="imc-height"
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
            <label htmlFor="imc-weight" className={styles.label}>
              {dict.form.weightLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="imc-weight"
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

        <button type="submit" className={styles.submitBtn} id="imc-calculate-btn">
          {dict.form.calculate}
        </button>
      </form>

      {result && (
        <div className={styles.result} id="imc-result">
          <h2 className={styles.resultTitle}>{dict.result.title}</h2>

          <div className={styles.primaryCards}>
            <div className={`${styles.card} ${styles.cardImc}`}>
              <span className={styles.cardLabel}>{dict.result.imcLabel}</span>
              <span className={styles.cardValue}>{result.imc.toLocaleString('pt-BR')}</span>
            </div>
            
            <div className={`${styles.card} ${styles.cardClassification} ${getClassificationClass(result.classification)}`}>
              <span className={styles.cardLabel}>{dict.result.classificationLabel}</span>
              <span className={styles.cardClassificationValue}>
                {getClassificationText(result.classification)}
              </span>
            </div>
          </div>

          <p className={styles.safetyNote}>
            {dict.result.safetyNote}
          </p>
        </div>
      )}
    </div>
  )
}
