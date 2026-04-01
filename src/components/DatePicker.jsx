import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

function toLocalDate(value) {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function isSameDay(left, right) {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate()
}

function isBeforeDay(left, right) {
  const leftDate = new Date(left.getFullYear(), left.getMonth(), left.getDate())
  const rightDate = new Date(right.getFullYear(), right.getMonth(), right.getDate())
  return leftDate.getTime() < rightDate.getTime()
}

export default function DatePicker({
  id,
  value,
  onChange,
  minDate,
  placeholder = 'Select date',
  error = false,
  className = '',
}) {
  const containerRef = useRef(null)
  const buttonRef = useRef(null)
  const popupRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [popupStyle, setPopupStyle] = useState(null)
  const [viewDate, setViewDate] = useState(() => {
    return toLocalDate(value) || toLocalDate(minDate) || new Date()
  })

  const selectedDate = useMemo(() => toLocalDate(value), [value])
  const minimumDate = useMemo(() => toLocalDate(minDate) || new Date(), [minDate])

  useEffect(() => {
    function handleOutsideClick(event) {
      const clickedInsideButton = containerRef.current?.contains(event.target)
      const clickedInsidePopup = popupRef.current?.contains(event.target)

      if (!clickedInsideButton && !clickedInsidePopup) {
        setIsOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    if (value) {
      setViewDate(toLocalDate(value))
    }
  }, [value])

  useEffect(() => {
    if (isOpen && isBeforeDay(viewDate, minimumDate)) {
      setViewDate(startOfMonth(minimumDate))
    }
  }, [isOpen, minimumDate, viewDate])

  useEffect(() => {
    if (!isOpen) return

    const updatePlacement = () => {
      const button = buttonRef.current
      if (!button) return

      const rect = button.getBoundingClientRect()
      const estimatedHeight = 430
      const margin = 12
      const spaceBelow = window.innerHeight - rect.bottom - margin
      const spaceAbove = rect.top - margin
      const openUp = spaceBelow < estimatedHeight && spaceAbove > spaceBelow

      const top = openUp
        ? Math.max(margin, rect.top - estimatedHeight - margin)
        : rect.bottom + margin

      const maxHeight = Math.max(240, openUp ? rect.top - margin * 2 : window.innerHeight - rect.bottom - margin * 2)

      setPopupStyle({
        position: 'fixed',
        top: `${top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        maxHeight: `${maxHeight}px`,
      })
    }

    const frame = window.requestAnimationFrame(updatePlacement)
    window.addEventListener('resize', updatePlacement)
    window.addEventListener('scroll', updatePlacement, true)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', updatePlacement)
      window.removeEventListener('scroll', updatePlacement, true)
    }
  }, [isOpen, viewDate, minimumDate])

  const monthLabel = new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric',
  }).format(viewDate)

  const dayNames = useMemo(() => {
    const firstMonday = new Date(2024, 0, 1)
    return Array.from({ length: 7 }, (_, index) => {
      return new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(new Date(firstMonday.getTime() + index * 86400000))
    })
  }, [])

  const displayValue = selectedDate
    ? new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(selectedDate)
    : ''

  const monthStart = startOfMonth(viewDate)
  const firstDayOffset = (monthStart.getDay() + 6) % 7
  const totalDays = getDaysInMonth(viewDate)
  const calendarCells = []

  for (let index = 0; index < firstDayOffset; index += 1) {
    calendarCells.push(null)
  }

  for (let day = 1; day <= totalDays; day += 1) {
    calendarCells.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))
  }

  const canGoPrev = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1) >= startOfMonth(minimumDate)

  const handleDateSelect = (date) => {
    onChange(toDateInputValue(date))
    setIsOpen(false)
  }

  const popup = isOpen && popupStyle ? createPortal(
    <div
      ref={popupRef}
      className="z-[9999] rounded-[24px] border border-border-subtle bg-white p-4 shadow-[0_20px_80px_rgba(0,0,0,0.12)] overflow-y-auto overscroll-contain"
      style={popupStyle}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
          disabled={!canGoPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-all hover:bg-surface-light disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous month"
        >
          <FiChevronLeft />
        </button>

        <div className="text-sm font-bold tracking-[0.08em] uppercase text-text-primary">
          {monthLabel}
        </div>

        <button
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-all hover:bg-surface-light"
          aria-label="Next month"
        >
          <FiChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted mb-2">
        {dayNames.map((dayName) => (
          <div key={dayName} className="h-8 flex items-center justify-center">
            {dayName}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarCells.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-10" />
          }

          const disabled = isBeforeDay(day, minimumDate)
          const active = selectedDate ? isSameDay(day, selectedDate) : false
          const label = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }).format(day)

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => handleDateSelect(day)}
              aria-label={label}
              className={`h-10 rounded-2xl text-sm font-semibold transition-all ${active ? 'bg-accent text-white shadow-lg' : 'text-text-primary hover:bg-surface-light'} ${disabled ? 'cursor-not-allowed text-text-muted/40 hover:bg-transparent' : ''}`}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border-subtle pt-4">
        <button
          type="button"
          onClick={() => {
            onChange('')
            setIsOpen(false)
          }}
          className="text-sm font-bold text-accent hover:opacity-70 transition-opacity"
        >
          Clear
        </button>
      </div>
    </div>,
    document.body,
  ) : null

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-label="Pickup date"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((current) => !current)}
        className={`w-full h-12 pl-12 pr-4 premium-input rounded-[10px] text-left text-text-primary text-sm font-medium focus:border-accent transition-all outline-none ${error ? 'border-red-500 bg-red-50/20' : ''}`}
      >
        <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg pointer-events-none" />
        <span className={displayValue ? 'text-text-primary' : 'text-text-muted'}>
          {displayValue || placeholder}
        </span>
      </button>

      {popup}
    </div>
  )
}