import React from 'react'
import '../styles/Home-Card.css'

/**
 * HomeCard
 * Props:
 * - icon: URL for the small corner icon (optional)
 * - title: main title (e.g. SERVICE NAME)
 * - subtitle: short subtitle line
 * - description: longer descriptive text (can include line breaks)
 */
export default function HomeCard({
  icon = null,
  title = 'SERVICE NAME',
  subtitle = 'PROVIDE A SHORT SUBTITLE HERE',
  description = 'ADD YOUR DESCRIPTION HERE.'
}) {
  return (
    <article className="HC-card">
      <div className="HC-grid" aria-hidden="true" />

      {icon && (
        <div className="HC-icon">
          <img src={icon} alt="" />
        </div>
      )}

      <div className="HC-content">
        <h3 className="HC-title">{title}</h3>
        <h4 className="HC-sub">{subtitle}</h4>
        <p className="HC-desc">{description}</p>
      </div>
    </article>
  )
}
