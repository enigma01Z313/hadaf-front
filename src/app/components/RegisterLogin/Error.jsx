import React from 'react'

import styles from './style.module.css'

export default function Error({children}) {
  return (
    <div className={styles.error}>{children}</div>
  )
}
