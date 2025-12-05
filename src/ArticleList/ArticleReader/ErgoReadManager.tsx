import React from 'react';
import './ErgoReadManager.css';

export type FontFamily = 'sans-serif' | 'serif' | 'monospace';
export type Theme = 'light' | 'dark' | 'sepia';

export interface ReadingSettings {
  readingMode: boolean;
  fontFamily: FontFamily;
  contentWidth: number; // percentage
  fontSize: number; // percentage
  theme: Theme;
}

interface ErgoReadManagerProps {
  settings: ReadingSettings;
  onSettingsChange: (settings: ReadingSettings) => void;
}

const ErgoReadManager: React.FC<ErgoReadManagerProps> = ({ settings, onSettingsChange }) => {
  const handleReadingModeToggle = () => {
    onSettingsChange({
      ...settings,
      readingMode: !settings.readingMode,
    });
  };

  const handleFontFamilyChange = (fontFamily: FontFamily) => {
    onSettingsChange({
      ...settings,
      fontFamily,
    });
  };

  const handleFontSizeIncrease = () => {
    if (settings.fontSize < 200) {
      onSettingsChange({
        ...settings,
        fontSize: settings.fontSize + 10,
      });
    }
  };

  const handleFontSizeDecrease = () => {
    if (settings.fontSize > 60) {
      onSettingsChange({
        ...settings,
        fontSize: settings.fontSize - 10,
      });
    }
  };

  const handleThemeChange = (theme: Theme) => {
    onSettingsChange({
      ...settings,
      theme,
    });
  };

  return (
    <div className="ergo-read-manager">
      <div className="ergo-controls-header">
        <h3>Reading Settings</h3>
      </div>

      {/* Reading Mode Toggle */}
      <div className="ergo-control-group">
        <label className="ergo-control-label">
          <input
            type="checkbox"
            checked={settings.readingMode}
            onChange={handleReadingModeToggle}
            className="ergo-checkbox"
          />
          <span>Reading Mode</span>
        </label>
      </div>

      {/* Font Family Selector */}
      <div className="ergo-control-group">
        <label className="ergo-label">Font Family</label>
        <div className="ergo-button-group">
          <button
            className={`ergo-btn ${settings.fontFamily === 'sans-serif' ? 'active' : ''}`}
            onClick={() => handleFontFamilyChange('sans-serif')}
            style={{ fontFamily: 'sans-serif' }}
          >
            Sans
          </button>
          <button
            className={`ergo-btn ${settings.fontFamily === 'serif' ? 'active' : ''}`}
            onClick={() => handleFontFamilyChange('serif')}
            style={{ fontFamily: 'serif' }}
          >
            Serif
          </button>
          <button
            className={`ergo-btn ${settings.fontFamily === 'monospace' ? 'active' : ''}`}
            onClick={() => handleFontFamilyChange('monospace')}
            style={{ fontFamily: 'monospace' }}
          >
            Mono
          </button>
        </div>
      </div>

      {/* Font Size Controls */}
      <div className="ergo-control-group">
        <label className="ergo-label">
          Font Size: {settings.fontSize}%
        </label>
        <div className="ergo-button-group">
          <button
            className="ergo-btn ergo-btn-icon"
            onClick={handleFontSizeDecrease}
            disabled={settings.fontSize <= 60}
            title="Decrease font size"
          >
            A−
          </button>
          <button
            className="ergo-btn ergo-btn-icon"
            onClick={handleFontSizeIncrease}
            disabled={settings.fontSize >= 200}
            title="Increase font size"
          >
            A+
          </button>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="ergo-control-group">
        <label className="ergo-label">Theme</label>
        <div className="ergo-theme-grid">
          <button
            className={`ergo-theme-btn theme-light ${settings.theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
            title="Light theme"
          >
            Light
          </button>
          <button
            className={`ergo-theme-btn theme-dark ${settings.theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
            title="Dark theme"
          >
            Dark
          </button>
          <button
            className={`ergo-theme-btn theme-sepia ${settings.theme === 'sepia' ? 'active' : ''}`}
            onClick={() => handleThemeChange('sepia')}
            title="Sepia theme"
          >
            Sepia
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErgoReadManager;
