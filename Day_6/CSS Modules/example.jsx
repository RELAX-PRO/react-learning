// ❌ في Standard CSS التقليدي كنا نكتب:
import './OpticalCard.css';
<div className="card">...</div>

// ✅ أما في CSS Modules نستورده ككائن ونستدعي الكلاس كخاصية منه:
import styles from './OpticalCard.module.css';
<div className={styles.card}>...</div>