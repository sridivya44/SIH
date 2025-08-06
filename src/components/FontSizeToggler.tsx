import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Translation placeholder function
const t = (key: string): string => {
  const translations: Record<string, string> = {
    'fontSize.small': 'Small Text',
    'fontSize.medium': 'Medium Text',
    'fontSize.large': 'Large Text',
    'fontSize.current': 'Current font size',
    'fontSize.change': 'Change font size'
  };
  return translations[key] || key;
};

// Font size context
interface FontSizeContextType {
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

// Font size provider component
export const FontSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<'small' | 'medium' | 'large'>('medium');

  const setFontSize = (size: 'small' | 'medium' | 'large') => {
    setFontSizeState(size);
    // Update CSS custom property for global font scaling
    const root = document.documentElement;
    const fontScales = {
      small: '0.9',
      medium: '1',
      large: '1.2'
    };
    root.style.setProperty('--font-scale', fontScales[size]);
    
    // Store preference for persistence
    try {
      // Using a simple cookie fallback since localStorage isn't available
      document.cookie = `fontSize=${size}; path=/; max-age=31536000`; // 1 year
    } catch (e) {
      // Silently fail if cookies are disabled
    }
  };

  useEffect(() => {
    // Load saved preference on mount
    try {
      const savedSize = document.cookie
        .split('; ')
        .find(row => row.startsWith('fontSize='))
        ?.split('=')[1] as 'small' | 'medium' | 'large' | undefined;
      
      if (savedSize && ['small', 'medium', 'large'].includes(savedSize)) {
        setFontSize(savedSize);
      } else {
        // Set default font scale
        document.documentElement.style.setProperty('--font-scale', '1');
      }
    } catch (e) {
      // Set default if cookie reading fails
      document.documentElement.style.setProperty('--font-scale', '1');
    }
  }, []);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

// Hook to use font size context
export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};

// Font size toggler component
const FontSizeToggler: React.FC = () => {
  const { fontSize, setFontSize } = useFontSize();

  const fontSizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px',
        borderRadius: '6px',
        backgroundColor: '#f5f5f5',
        border: '1px solid #ddd'
      }}
      role="group"
      aria-label={t('fontSize.change')}
    >
      <span 
        style={{
          fontSize: '12px',
          color: '#666',
          marginRight: '4px',
          fontWeight: '500'
        }}
        id="font-size-label"
      >
        Aa
      </span>
      {fontSizes.map((size) => (
        <button
          key={size}
          onClick={() => setFontSize(size)}
          style={{
            padding: '6px 10px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: fontSize === size ? '#007bff' : 'transparent',
            color: fontSize === size ? 'white' : '#333',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minWidth: '36px'
          }}
          aria-pressed={fontSize === size}
          aria-describedby="font-size-label"
          title={`${t('fontSize.current')}: ${t(`fontSize.${size}`)}`}
          onMouseOver={(e) => {
            if (fontSize !== size) {
              e.currentTarget.style.backgroundColor = '#e9ecef';
            }
          }}
          onMouseOut={(e) => {
            if (fontSize !== size) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = '2px solid #007bff';
            e.currentTarget.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
        >
          {size === 'small' && 'S'}
          {size === 'medium' && 'M'}
          {size === 'large' && 'L'}
        </button>
      ))}
    </div>
  );
};

// Demo component that includes the provider
const FontSizeTogglerDemo: React.FC = () => {
  return (
    <FontSizeProvider>
      <div style={{ 
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <h2 style={{ 
          fontSize: 'calc(24px * var(--font-scale, 1))',
          marginBottom: '16px',
          color: '#333'
        }}>
          Font Size Demo
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <FontSizeToggler />
        </div>
        
        <div style={{ 
          fontSize: 'calc(16px * var(--font-scale, 1))',
          lineHeight: '1.5',
          color: '#555',
          maxWidth: '600px'
        }}>
          <p>
            This is a sample text to demonstrate the font size scaling feature. 
            Click the S, M, or L buttons above to see how the text size changes 
            throughout the application.
          </p>
          <p>
            The font scaling uses CSS custom properties to ensure consistent 
            sizing across all text elements in your application.
          </p>
        </div>
      </div>
    </FontSizeProvider>
  );
};

export default FontSizeTogglerDemo;
