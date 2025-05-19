'use client'

import React, { useState } from 'react'
import type { ExportFormat, ExportOptions as ExportOptionType } from '@/lib/types'

interface ExportOptionsProps {
  onExport: (format: ExportFormat, options: Partial<ExportOptionType>) => void
  disabled?: boolean
}

export default function ExportOptions({ onExport, disabled = false }: ExportOptionsProps) {
  const [showOptions, setShowOptions] = useState(false)
  const [exportOptions, setExportOptions] = useState<ExportOptionType>({
    includeDescription: true,
    includeMetrics: true,
    dateFormat: 'yyyy-MM-dd'
  })

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setExportOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleExport = (format: ExportFormat) => {
    onExport(format, exportOptions)
  }

  return (
    <div className="export-options">
      <div className="export-header">
        <button 
          className="button" 
          onClick={() => setShowOptions(!showOptions)}
          disabled={disabled}
        >
          {showOptions ? 'Hide Export Options' : 'Export Data'}
        </button>
      </div>

      {showOptions && (
        <div className="export-panel card">
          <h3>Export Options</h3>
          
          <div className="option-group">
            <label>
              <input
                type="checkbox"
                name="includeDescription"
                checked={exportOptions.includeDescription}
                onChange={handleOptionChange}
              />
              Include video descriptions
            </label>
          </div>
          
          <div className="option-group">
            <label>
              <input
                type="checkbox"
                name="includeMetrics"
                checked={exportOptions.includeMetrics}
                onChange={handleOptionChange}
              />
              Include metrics (when available)
            </label>
          </div>
          
          <div className="option-group">
            <label>
              Date format:
              <select 
                name="dateFormat" 
                value={exportOptions.dateFormat}
                onChange={handleOptionChange}
              >
                <option value="yyyy-MM-dd">YYYY-MM-DD</option>
                <option value="MM/dd/yyyy">MM/DD/YYYY</option>
                <option value="dd.MM.yyyy">DD.MM.YYYY</option>
                <option value="MMMM d, yyyy">Month DD, YYYY</option>
              </select>
            </label>
          </div>
          
          <div className="export-buttons">
            <button 
              className="button" 
              onClick={() => handleExport('csv')}
              disabled={disabled}
            >
              Export as CSV
            </button>
            <button 
              className="button" 
              onClick={() => handleExport('json')}
              disabled={disabled}
            >
              Export as JSON
            </button>
            <button 
              className="button" 
              onClick={() => handleExport('excel')}
              disabled={disabled}
            >
              Export for Excel
            </button>
            <button 
              className="button" 
              onClick={() => handleExport('sheets')}
              disabled={disabled}
            >
              Export for Google Sheets
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 