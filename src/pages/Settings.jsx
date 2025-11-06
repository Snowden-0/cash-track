import { useState } from 'react';
import { Moon, Bell, Download, Info, Shield, ChevronRight } from 'lucide-react';

// Theme Constants - Mirrored from Search.jsx for consistency
const THEME = {
  // Page
  pageBg: 'bg-gray-50', // Added a light bg for the page
  pageTitle: 'text-gray-900',
  pageSubtitle: 'text-gray-500',
  
  // Cards
  cardBg: 'bg-white',
  cardBorder: 'border-gray-100',
  cardShadow: 'shadow-sm',
  
  // Section Headers
  sectionTitle: 'text-gray-900',
  sectionIcon: 'text-gray-600',
  
  // Item Labels
  itemLabel: 'text-gray-600',
  itemValue: 'text-gray-500',
  
  // Toggle
  toggleActiveBg: 'bg-gray-900',
  toggleInactiveBg: 'bg-gray-200',
  toggleKnob: 'bg-white',
  
  // Info Box
  infoBoxBg: 'bg-gray-50',
  infoBoxBorder: 'border-gray-100',
  infoBoxIcon: 'text-gray-400',
  infoBoxText: 'text-gray-600',
  infoBoxSubtext: 'text-gray-500',
};

/**
 * A reusable, theme-consistent toggle switch component.
 */
function ThemeToggle({ label, enabled, setEnabled }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm font-medium ${THEME.itemLabel}`}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900/50 focus:ring-offset-2
          ${enabled ? THEME.toggleActiveBg : THEME.toggleInactiveBg}
        `}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full ${THEME.toggleKnob} shadow ring-0 transition duration-200 ease-in-out
            ${enabled ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}

/**
 * A reusable, theme-consistent settings item for navigation or actions.
 */
function SettingsItem({ label, value, icon: Icon, action }) {
  const content = (
    <>
      <div className="flex items-center gap-3">
        {Icon && <Icon className={`w-5 h-5 ${THEME.sectionIcon}`} />}
        <span className={`text-sm font-medium ${THEME.itemLabel}`}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className={`text-sm ${THEME.itemValue}`}>{value}</span>}
        {action && <ChevronRight className={`w-4 h-4 ${THEME.itemValue}`} />}
      </div>
    </>
  );

  if (action) {
    return (
      <button
        type="button"
        onClick={action}
        className="flex w-full items-center justify-between rounded-lg py-2 px-1 hover:bg-gray-100/50 transition-colors"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="flex w-full items-center justify-between py-2 px-1">
      {content}
    </div>
  );
}

export default function Settings() {
  // State for toggles
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [transactionAlerts, setTransactionAlerts] = useState(true);

  // Simplified settings sections
  const settingsSections = [
    {
      title: 'Appearance',
      icon: Moon,
      items: [
        { 
          type: 'toggle', 
          label: 'Dark Mode', 
          state: isDarkMode, 
          setState: setIsDarkMode 
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { 
          type: 'toggle', 
          label: 'Transaction Alerts', 
          state: transactionAlerts, 
          setState: setTransactionAlerts 
        },
      ],
    },
    {
      title: 'Data',
      icon: Download,
      items: [
        { 
          type: 'item', 
          label: 'Export Data', 
          action: () => console.log('Exporting data...'), 
        },
      ],
    },
    {
      title: 'About',
      icon: Info,
      items: [
        { type: 'item', label: 'Version', value: '1.0.0' },
        { 
          type: 'item', 
          label: 'Developer', 
          value: 'Custom PWA',
          action: () => console.log('Navigating to developer...'),
        },
      ],
    },
  ];

  return (
    // Matching layout and padding from Search.jsx
    <div className="space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div>
        <h2 className={`text-2xl font-bold ${THEME.pageTitle} mb-1`}>Settings</h2>
        <p className={`text-sm ${THEME.pageSubtitle}`}>Manage your app preferences</p>
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section) => (
        <div
          key={section.title}
          className={`${THEME.cardBg} rounded-2xl p-5 border ${THEME.cardBorder} ${THEME.cardShadow}`}
        >
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-4 px-1">
            <section.icon className={`w-5 h-5 ${THEME.sectionIcon}`} />
            <h3 className={`text-base font-semibold ${THEME.sectionTitle}`}>
              {section.title}
            </h3>
          </div>
          
          {/* Section Items */}
          <div className="space-y-2">
            {section.items.map((item) => (
              item.type === 'toggle' ? (
                <ThemeToggle
                  key={item.label}
                  label={item.label}
                  enabled={item.state}
                  setEnabled={item.setState}
                />
              ) : (
                <SettingsItem
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  action={item.action}
                />
              )
            ))}
          </div>
        </div>
      ))}

      {/* Privacy Notice - Styled like the 'Empty State' from Search.jsx */}
      <div className={`${THEME.infoBoxBg} rounded-2xl p-5 border ${THEME.infoBoxBorder} flex items-start gap-4`}>
        <Shield className={`w-8 h-8 ${THEME.infoBoxIcon} flex-shrink-0 mt-1`} />
        <div>
          <h4 className={`${THEME.infoBoxText} font-medium mb-1`}>Privacy & Security</h4>
          <p className={`${THEME.infoBoxSubtext} text-sm`}>
            All data is stored locally on your device. No information is sent to external servers.
          </p>
        </div>
      </div>
    </div>
  );
}
