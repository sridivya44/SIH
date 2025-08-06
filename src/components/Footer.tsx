import React from 'react';

// Translation placeholder function
const t = (key: string): string => {
  const translations: Record<string, string> = {
    'app.name': 'LearnBot – AI Tutor',
    'footer.poweredBy': 'Powered by open-source and free APIs',
    'footer.ministry': 'Ministry of Education',
    'footer.hackathon': 'Smart India Hackathon',
    'footer.language': 'Language',
    'footer.feedback': 'Send Feedback',
    'footer.contact': 'Contact Us',
    'footer.currentLanguage': 'English'
  };
  return translations[key] || key;
};

interface FooterProps {
  currentLanguage?: string;
  onLanguageClick?: () => void;
  onFeedbackClick?: () => void;
  onContactClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({
  currentLanguage = 'English',
  onLanguageClick,
  onFeedbackClick,
  onContactClick
}) => {
  return (
    <footer 
      style={{
        marginTop: 'auto',
        padding: '16px 12px',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e9ecef',
        fontSize: 'calc(12px * var(--font-scale, 1))',
        lineHeight: '1.4'
      }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main footer content */}
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* Top row - App name and language */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <h2 
            style={{
              margin: '0',
              fontSize: 'calc(14px * var(--font-scale, 1))',
              fontWeight: '600',
              color: '#212529'
            }}
          >
            {t('app.name')}
          </h2>
          
          {/* Language indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#6c757d' }}>{t('footer.language')}:</span>
            <button
              onClick={onLanguageClick}
              style={{
                background: 'none',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: 'calc(11px * var(--font-scale, 1))',
                color: '#495057',
                cursor: onLanguageClick ? 'pointer' : 'default',
                textDecoration: onLanguageClick ? 'underline' : 'none'
              }}
              disabled={!onLanguageClick}
              aria-label={`Current language: ${currentLanguage}. Click to change language.`}
              onFocus={(e) => {
                if (onLanguageClick) {
                  e.currentTarget.style.outline = '2px solid #007bff';
                  e.currentTarget.style.outlineOffset = '1px';
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {currentLanguage}
            </button>
          </div>
        </div>

        {/* Middle row - Powered by statement */}
        <div 
          style={{
            textAlign: 'center',
            color: '#6c757d',
            fontSize: 'calc(11px * var(--font-scale, 1))',
            fontStyle: 'italic'
          }}
        >
          {t('footer.poweredBy')}
        </div>

        {/* Bottom row - Branding and actions */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            paddingTop: '8px',
            borderTop: '1px solid #e9ecef'
          }}
        >
          {/* Government branding */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              fontSize: 'calc(10px * var(--font-scale, 1))',
              color: '#495057'
            }}
          >
            <span 
              style={{
                padding: '2px 6px',
                backgroundColor: '#e7f3e7',
                borderRadius: '3px',
                fontWeight: '500'
              }}
            >
              {t('footer.ministry')}
            </span>
            <span style={{ color: '#adb5bd' }}>•</span>
            <span 
              style={{
                padding: '2px 6px',
                backgroundColor: '#e3f2fd',
                borderRadius: '3px',
                fontWeight: '500'
              }}
            >
              {t('footer.hackathon')}
            </span>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={onFeedbackClick}
              disabled={!onFeedbackClick}
              style={{
                background: 'none',
                border: 'none',
                color: onFeedbackClick ? '#007bff' : '#adb5bd',
                fontSize: 'calc(10px * var(--font-scale, 1))',
                cursor: onFeedbackClick ? 'pointer' : 'default',
                textDecoration: onFeedbackClick ? 'underline' : 'none',
                padding: '2px 4px'
              }}
              aria-label="Send feedback about the application"
              onFocus={(e) => {
                if (onFeedbackClick) {
                  e.currentTarget.style.outline = '2px solid #007bff';
                  e.currentTarget.style.outlineOffset = '1px';
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {t('footer.feedback')}
            </button>
            
            <span style={{ color: '#dee2e6' }}>|</span>
            
            <button
              onClick={onContactClick}
              disabled={!onContactClick}
              style={{
                background: 'none',
                border: 'none',
                color: onContactClick ? '#007bff' : '#adb5bd',
                fontSize: 'calc(10px * var(--font-scale, 1))',
                cursor: onContactClick ? 'pointer' : 'default',
                textDecoration: onContactClick ? 'underline' : 'none',
                padding: '2px 4px'
              }}
              aria-label="Contact support or get help"
              onFocus={(e) => {
                if (onContactClick) {
                  e.currentTarget.style.outline = '2px solid #007bff';
                  e.currentTarget.style.outline = '2px solid #007bff';
                  e.currentTarget.style.outlineOffset = '1px';
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {t('footer.contact')}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden screen reader information */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
        aria-live="polite"
        id="footer-sr-info"
      >
        End of page content. This is an educational platform supported by the Ministry of Education and Smart India Hackathon initiative.
      </div>
    </footer>
  );
};

export default Footer;