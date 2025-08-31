'use client';

import { useState } from 'react';
import Timeline2Column from '@/components/sections/Timeline2Column';
import Timeline2ColumnMinimal from '@/components/sections/Timeline2ColumnMinimal';
import TimelineImmersive from '@/components/sections/TimelineImmersive';
import TimelineRMK from '@/components/sections/TimelineRMK';
import TimelineYearPills from '@/components/sections/TimelineYearPills';
import './timeline-demo.css';

export default function TimelineDemoPage() {
  const [activeDesign, setActiveDesign] = useState<'2column' | 'minimal' | 'immersive' | 'rmk' | 'pills'>('rmk');

  return (
    <main className="demo-main">
      {/* Header */}
      <div className="demo-header">
        <div className="demo-header-content">
          <h1 className="demo-title">
            Timeline Design Valg
          </h1>
          <div className="demo-toggle">
            <button
              onClick={() => setActiveDesign('2column')}
              className={`demo-toggle-btn ${activeDesign === '2column' ? 'active' : ''}`}
            >
              2-Kolonne Standard
            </button>
            <button
              onClick={() => setActiveDesign('minimal')}
              className={`demo-toggle-btn ${activeDesign === 'minimal' ? 'active' : ''}`}
            >
              2-Kolonne Minimal
            </button>
            <button
              onClick={() => setActiveDesign('immersive')}
              className={`demo-toggle-btn ${activeDesign === 'immersive' ? 'active' : ''}`}
            >
              Immersive Premium
            </button>
            <button
              onClick={() => setActiveDesign('rmk')}
              className={`demo-toggle-btn ${activeDesign === 'rmk' ? 'active' : ''}`}
            >
              RMK Brand
            </button>
            <button
              onClick={() => setActiveDesign('pills')}
              className={`demo-toggle-btn ${activeDesign === 'pills' ? 'active' : ''}`}
            >
              Års-Pills
            </button>
          </div>
        </div>
      </div>

      {/* Design Preview */}
      <div className="demo-preview">
        {activeDesign === '2column' && (
          <div>
            <div className="demo-info">
              <div className="demo-info-box">
                <h2 className="demo-info-title">
                  Design #1: 2-Kolonne Standard (opdateret styling)
                </h2>
                <ul className="demo-info-list">
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Mere clean design på højre side med subtile borders</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>KPI'er med hover effects og bedre spacing</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Elegant quote design med stort citat-tegn</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Minimalistisk impact sektion med gradient linje</span>
                  </li>
                </ul>
              </div>
            </div>
            <Timeline2Column />
          </div>
        )}
        
        {activeDesign === 'minimal' && (
          <div>
            <div className="demo-info">
              <div className="demo-info-box">
                <h2 className="demo-info-title">
                  Design #2: Ultra Minimal Timeline
                </h2>
                <ul className="demo-info-list">
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Ekstremt minimalistisk med kun de vigtigste metrics</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Vertikal tidslinje med små dots</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Store tal med tynd font-weight</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Apple-inspireret æstetik</span>
                  </li>
                </ul>
              </div>
            </div>
            <Timeline2ColumnMinimal />
          </div>
        )}
        
        {activeDesign === 'immersive' && (
          <div>
            <div className="demo-info">
              <div className="demo-info-box">
                <h2 className="demo-info-title">
                  Design #3: Immersive Premium Experience ✨
                </h2>
                <ul className="demo-info-list">
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Full viewport sections med masse luft og plads</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Parallax effekt på store års-tal i baggrunden</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>OPDATERET: Højre side nu ultra minimalistisk</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Kun ét tal på højre side - det vigtigste KPI</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Ingen quotes eller bokse - ren typografi</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Subtile links integreret i teksten</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Maximum whitespace og fokus på indhold</span>
                  </li>
                </ul>
              </div>
            </div>
            <TimelineImmersive />
          </div>
        )}
        
        {activeDesign === 'rmk' && (
          <div>
            <div className="demo-info">
              <div className="demo-info-box">
                <h2 className="demo-info-title">
                  Design #4: RMK Brand Guidelines Timeline 🎨
                </h2>
                <ul className="demo-info-list">
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Følger REDMINKROP design guide 100%</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Orange (#ed6a2f) som primær accent farve</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Lato & Montserrat fonts</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>VERSALER i overskrifter (som brand guide)</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Hvid baggrund med RMK farvepalette</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Orange progress dots og store tal</span>
                  </li>
                </ul>
              </div>
            </div>
            <TimelineRMK />
          </div>
        )}
        
        {activeDesign === 'pills' && (
          <div>
            <div className="demo-info">
              <div className="demo-info-box">
                <h2 className="demo-info-title">
                  Design #5: Års-Pills Navigation  
                </h2>
                <ul className="demo-info-list">
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Sticky navigation med årstal øverst</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Hurtig navigation mellem forskellige år</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Fremhæver aktivt år baseret på scroll position</span>
                  </li>
                  <li className="demo-info-item">
                    <span className="demo-info-check">✓</span>
                    <span>Moderne og interaktivt uden at være "gimmicky"</span>
                  </li>
                </ul>
              </div>
            </div>
            <TimelineYearPills />
          </div>
        )}
      </div>

      {/* Decision Helper */}
      <div className="demo-decision">
        <div className="demo-decision-box">
          <h3 className="demo-decision-title">
            Hvilken skal vi vælge?
          </h3>
          <div className="demo-decision-grid">
            <div className="demo-decision-column">
              <h4>
                Vælg 2-Kolonne hvis:
              </h4>
              <ul className="demo-decision-list">
                <li>• I vil fremhæve konkrete resultater og KPI'er</li>
                <li>• Kundeudtalelser er vigtige for jer</li>
                <li>• I foretrækker et mere klassisk layout</li>
                <li>• Mobile brugere er højt prioriteret</li>
              </ul>
            </div>
            <div className="demo-decision-column">
              <h4>
                Vælg Års-Pills hvis:
              </h4>
              <ul className="demo-decision-list">
                <li>• I har mange milepæle at vise</li>
                <li>• Hurtig navigation er vigtig</li>
                <li>• I vil have et moderne, interaktivt design</li>
                <li>• Desktop oplevelsen er prioriteret</li>
              </ul>
            </div>
          </div>
          <div className="demo-recommendation">
            <p>
              <strong>Min anbefaling:</strong> Baseret på jeres B2B fokus og behov for at vise målbare resultater, 
              vil jeg anbefale <strong>2-Kolonne designet</strong>. Det giver den bedste balance mellem 
              professionel præsentation og datadrevet storytelling.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}