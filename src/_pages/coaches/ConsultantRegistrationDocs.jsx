import React from 'react';

const ConsultantRegistrationDocs = () => {
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: '1.6',
      color: '#333',
    },
    h1: {
      color: '#1a365d',
      marginBottom: '10px',
      fontSize: '2.5em',
      borderBottom: '4px solid #3182ce',
      paddingBottom: '15px',
    },
    h2: {
      color: '#2c5282',
      marginTop: '40px',
      marginBottom: '20px',
      fontSize: '1.8em',
      paddingLeft: '10px',
      borderLeft: '5px solid #3182ce',
    },
    h3: {
      color: '#2d3748',
      marginTop: '25px',
      marginBottom: '15px',
      fontSize: '1.3em',
    },
    intro: {
      backgroundColor: '#edf2f7',
      padding: '20px',
      borderRadius: '6px',
      marginBottom: '30px',
      borderLeft: '4px solid #3182ce',
    },
    apiSection: {
      marginBottom: '50px',
      padding: '25px',
      backgroundColor: '#f7fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
    },
    methodBadge: {
      display: 'inline-block',
      padding: '5px 12px',
      borderRadius: '4px',
      fontWeight: 'bold',
      fontSize: '0.85em',
      marginRight: '10px',
    },
    methodGet: {
      backgroundColor: '#48bb78',
      color: 'white',
    },
    methodPost: {
      backgroundColor: '#4299e1',
      color: 'white',
    },
    endpoint: {
      backgroundColor: '#2d3748',
      color: '#68d391',
      padding: '12px',
      borderRadius: '4px',
      fontFamily: "'Courier New', monospace",
      fontSize: '0.9em',
      overflowX: 'auto',
      margin: '15px 0',
    },
    codeBlock: {
      backgroundColor: '#1a202c',
      color: '#e2e8f0',
      padding: '20px',
      borderRadius: '6px',
      overflowX: 'auto',
      fontFamily: "'Courier New', monospace",
      fontSize: '0.9em',
      lineHeight: '1.5',
      margin: '15px 0',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '20px 0',
      backgroundColor: 'white',
    },
    th: {
      padding: '12px',
      textAlign: 'left',
      border: '1px solid #e2e8f0',
      backgroundColor: '#4299e1',
      color: 'white',
      fontWeight: 600,
    },
    td: {
      padding: '12px',
      textAlign: 'left',
      border: '1px solid #e2e8f0',
    },
    mandatory: {
      color: '#e53e3e',
      fontWeight: 'bold',
    },
    optional: {
      color: '#38a169',
      fontWeight: 'bold',
    },
    conditional: {
      color: '#d69e2e',
      fontWeight: 'bold',
    },
    warning: {
      backgroundColor: '#fef5e7',
      borderLeft: '4px solid #f39c12',
      padding: '15px',
      margin: '20px 0',
      borderRadius: '4px',
    },
    info: {
      backgroundColor: '#e8f4f8',
      borderLeft: '4px solid #3182ce',
      padding: '15px',
      margin: '20px 0',
      borderRadius: '4px',
    },
    success: {
      backgroundColor: '#f0fff4',
      borderLeft: '4px solid #48bb78',
      padding: '15px',
      margin: '20px 0',
      borderRadius: '4px',
    },
    flowDiagram: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      border: '2px solid #e2e8f0',
      margin: '20px 0',
    },
    flowStep: {
      backgroundColor: '#edf2f7',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '6px',
      borderLeft: '4px solid #3182ce',
    },
    flowArrow: {
      textAlign: 'center',
      color: '#3182ce',
      fontSize: '1.5em',
      margin: '5px 0',
    },
    code: {
      backgroundColor: '#edf2f7',
      padding: '2px 6px',
      borderRadius: '3px',
      fontFamily: "'Courier New', monospace",
      fontSize: '0.9em',
    },
    validationBox: {
      backgroundColor: '#fff5f5',
      border: '1px solid #fc8181',
      padding: '15px',
      borderRadius: '6px',
      margin: '15px 0',
    },
    fieldCard: {
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '20px',
      margin: '15px 0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    fieldName: {
      fontSize: '1.2em',
      fontWeight: 600,
      color: '#2d3748',
      marginBottom: '10px',
    },
    staticValues: {
      backgroundColor: '#faf5ff',
      border: '1px solid #d6bcfa',
      padding: '12px',
      borderRadius: '4px',
      margin: '10px 0',
    },
    ul: {
      marginLeft: '20px',
      lineHeight: 2,
    },
    footer: {
      marginTop: '50px',
      paddingTop: '20px',
      borderTop: '2px solid #e2e8f0',
      textAlign: 'center',
      color: '#718096',
    },
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', minHeight: '100vh' }}>
      <div style={styles.container}>
        <h1 style={styles.h1}>📝 Consultant Registration API Documentation</h1>
        
        <div style={styles.intro}>
          <p><strong>Overview:</strong> This document provides comprehensive documentation for the Consultant Registration feature. The registration process involves multiple conditional fields based on the consultant's role selection, various validation rules, and a sequence of API calls including photo uploads, registration, and progress level fetching. After successful registration, two APIs are called to fetch and display the consultant's onboarding progress.</p>
        </div>

        <h2 style={styles.h2}>📋 Registration Form Fields Overview</h2>

        <div style={styles.info}>
          <strong>Field Categories:</strong>
          <ul style={{ ...styles.ul, marginTop: '10px' }}>
            <li><span style={styles.mandatory}>Mandatory Fields</span> - Required for all consultants (except last name which is optional)</li>
            <li><span style={styles.conditional}>Conditional Fields</span> - Shown based on role selection (categories always sent in request even when hidden)</li>
            <li><span style={styles.optional}>Optional Fields</span> - Not required but can be filled</li>
          </ul>
        </div>

        <h2 style={styles.h2}>🔍 Field Details & Validations</h2>

        {/* Field 1: First Name */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>1. First Name <span style={styles.mandatory}>*</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>String</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.mandatory }}>Yes</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Max Length</strong></td><td style={styles.td}>30 characters</td></tr>
              <tr><td style={styles.td}><strong>Validation</strong></td><td style={styles.td}>Only alphabetic characters allowed</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>first_name</code></td></tr>
            </tbody>
          </table>
        </div>

        {/* Field 2: Last Name */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>2. Last Name <span style={styles.optional}>(Optional)</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>String</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.optional }}>No</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Max Length</strong></td><td style={styles.td}>30 characters</td></tr>
              <tr><td style={styles.td}><strong>Validation</strong></td><td style={styles.td}>Only alphabetic characters allowed (if provided)</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>last_name</code></td></tr>
            </tbody>
          </table>
        </div>

        {/* Field 3: Date of Birth */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>3. Date of Birth <span style={styles.mandatory}>*</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>String (Date)</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.mandatory }}>Yes</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Format</strong></td><td style={styles.td}>DD/MM/YYYY</td></tr>
              <tr><td style={styles.td}><strong>Validation</strong></td><td style={styles.td}>Must be 18+ years old</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>date_of_birth</code></td></tr>
            </tbody>
          </table>
        </div>

        {/* Field 4: Gender */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>4. Gender <span style={styles.mandatory}>*</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>Integer</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.mandatory }}>Yes</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Input Type</strong></td><td style={styles.td}>Radio Button / Dropdown</td></tr>
              <tr><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>gender</code></td></tr>
            </tbody>
          </table>
          <div style={styles.staticValues}>
            <strong>Static Values:</strong>
            <ul style={{ ...styles.ul, marginTop: '8px' }}>
              <li><code style={styles.code}>1</code> - Man</li>
              <li><code style={styles.code}>2</code> - Woman</li>
              <li><code style={styles.code}>3</code> - Others</li>
            </ul>
          </div>
        </div>

        {/* Field 5: Marital Status */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>5. Marital Status <span style={styles.mandatory}>*</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>Integer</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.mandatory }}>Yes</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Input Type</strong></td><td style={styles.td}>Dropdown</td></tr>
              <tr><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>marital_status</code></td></tr>
            </tbody>
          </table>
          <div style={styles.staticValues}>
            <strong>Static Values:</strong>
            <ul style={{ ...styles.ul, marginTop: '8px' }}>
              <li><code style={styles.code}>1</code> - Single</li>
              <li><code style={styles.code}>2</code> - Married</li>
              <li><code style={styles.code}>3</code> - Divorced</li>
              <li><code style={styles.code}>4</code> - Separated</li>
              <li><code style={styles.code}>5</code> - Widow</li>
            </ul>
          </div>
        </div>

        {/* Field 6: Languages */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>6. Languages <span style={styles.mandatory}>*</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>Array of Strings</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.mandatory }}>Yes</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Input Type</strong></td><td style={styles.td}>Multi-select Dropdown</td></tr>
              <tr><td style={styles.td}><strong>Min Selection</strong></td><td style={styles.td}>1 language</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Max Selection</strong></td><td style={styles.td}>3 languages</td></tr>
              <tr><td style={styles.td}><strong>Data Source</strong></td><td style={styles.td}>Fetched from API</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>languages</code></td></tr>
            </tbody>
          </table>
          <div style={styles.info}>
            <strong>🔗 API Call Required:</strong> GET Language List API to populate dropdown options
          </div>
        </div>

        {/* Field 7: Role */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>7. Role / Consultant Type <span style={styles.mandatory}>*</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>Integer</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.mandatory }}>Yes</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Input Type</strong></td><td style={styles.td}>Radio Button / Dropdown</td></tr>
              <tr><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>consultant_type</code></td></tr>
            </tbody>
          </table>
          <div style={styles.staticValues}>
            <strong>Static Values:</strong>
            <ul style={{ ...styles.ul, marginTop: '8px' }}>
              <li><code style={styles.code}>1</code> - Astrologer</li>
              <li><code style={styles.code}>2</code> - Coach</li>
              <li><code style={styles.code}>3</code> - Listener</li>
            </ul>
          </div>
          <div style={styles.warning}>
            <strong>⚠️ Important:</strong> This field controls the visibility of Categories and Skills fields based on the selection.
          </div>
        </div>

        {/* Conditional Field Logic */}
        <h3 style={styles.h3}>🔀 Conditional Field Logic</h3>
        <div style={styles.flowDiagram}>
          <div style={styles.flowStep}>
            <strong>IF Role = Astrologer (1)</strong>
            <ul style={{ ...styles.ul, marginTop: '10px' }}>
              <li>✅ Show: Skills field (mandatory)</li>
              <li>❌ Hide: Categories field (but send <code style={styles.code}>categories: [1]</code> in request)</li>
              <li>✅ Show: Services field (optional)</li>
            </ul>
          </div>
          <div style={styles.flowArrow}>⬇️</div>
          <div style={styles.flowStep}>
            <strong>IF Role = Coach (2)</strong>
            <ul style={{ ...styles.ul, marginTop: '10px' }}>
              <li>✅ Show: Categories field (mandatory, max 3)</li>
              <li>✅ Show: Skills field (mandatory, based on categories)</li>
              <li>✅ Show: Services field (optional)</li>
            </ul>
          </div>
          <div style={styles.flowArrow}>⬇️</div>
          <div style={styles.flowStep}>
            <strong>IF Role = Listener (3)</strong>
            <ul style={{ ...styles.ul, marginTop: '10px' }}>
              <li>❌ Hide: Categories field (but send <code style={styles.code}>categories: [3]</code> in request)</li>
              <li>❌ Hide: Skills field</li>
              <li>❌ Hide: Services field</li>
            </ul>
          </div>
        </div>

        {/* Field 8: Categories */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>8. Categories <span style={styles.conditional}>* (Conditional)</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>Array of Integers</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.mandatory }}>Always required in API request</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Visibility</strong></td><td style={styles.td}>
                • Coach: Visible (user selects up to 3 categories)<br />
                • Astrologer: Hidden (auto-send <code style={styles.code}>[1]</code>)<br />
                • Listener: Hidden (auto-send <code style={styles.code}>[3]</code>)
              </td></tr>
              <tr><td style={styles.td}><strong>Input Type</strong></td><td style={styles.td}>Multi-select Dropdown (for Coach only)</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Min Selection</strong></td><td style={styles.td}>1 category (for Coach)</td></tr>
              <tr><td style={styles.td}><strong>Max Selection</strong></td><td style={styles.td}>3 categories (for Coach)</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Data Source</strong></td><td style={styles.td}>Fetched from API (for Coach)</td></tr>
              <tr><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>categories</code></td></tr>
            </tbody>
          </table>
          <div style={styles.warning}>
            <strong>⚠️ Important Implementation Note:</strong>
            <ul style={{ ...styles.ul, marginTop: '10px' }}>
              <li>For <strong>Astrologer</strong>: Hide the field in UI, but send <code style={styles.code}>categories: [1]</code> in the registration request</li>
              <li>For <strong>Coach</strong>: Show the field and let user select categories</li>
              <li>For <strong>Listener</strong>: Hide the field in UI, but send <code style={styles.code}>categories: [3]</code> in the registration request</li>
            </ul>
          </div>
          <div style={styles.info}>
            <strong>🔗 API Call Required:</strong> GET Categories List API to populate dropdown options (only for Coach role)
          </div>
        </div>

        {/* Field 9: Skills */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>9. Skills <span style={styles.conditional}>* (Conditional)</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>Array of Integers</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.conditional }}>Only for Astrologer & Coach roles</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Visibility</strong></td><td style={styles.td}>
                • Astrologer: Always visible<br />
                • Coach: Visible after categories selection<br />
                • Listener: Hidden
              </td></tr>
              <tr><td style={styles.td}><strong>Input Type</strong></td><td style={styles.td}>Multi-select Dropdown</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Data Source</strong></td><td style={styles.td}>
                • Astrologer: Direct API call<br />
                • Coach: Based on selected categories
              </td></tr>
              <tr><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>skills</code></td></tr>
            </tbody>
          </table>
          <div style={styles.info}>
            <strong>🔗 API Call Required:</strong> GET Skills API (with category_ids for Coach)
          </div>
        </div>

        {/* Field 10: Description */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>10. Description <span style={styles.optional}>(Optional)</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>String (Text Area)</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.optional }}>No</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Visibility</strong></td><td style={styles.td}>Always visible for all roles</td></tr>
              <tr><td style={styles.td}><strong>Max Length</strong></td><td style={styles.td}>500 characters (recommended)</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>description</code></td></tr>
            </tbody>
          </table>
        </div>

        {/* Field 11: Services */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>11. Services <span style={styles.optional}>(Optional)</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>String (Text Area)</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.optional }}>No</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Visibility</strong></td><td style={styles.td}>Only for Astrologer & Coach roles</td></tr>
              <tr><td style={styles.td}><strong>Max Length</strong></td><td style={styles.td}>500 characters (recommended)</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>services</code></td></tr>
            </tbody>
          </table>
        </div>

        {/* Field 12: How did you know about Flute */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>12. How did you come to know about Flute? <span style={styles.mandatory}>*</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>String</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.mandatory }}>Yes</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Visibility</strong></td><td style={styles.td}>Always visible for all roles</td></tr>
              <tr><td style={styles.td}><strong>Input Type</strong></td><td style={styles.td}>Dropdown</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>API Parameter</strong></td><td style={styles.td}><code style={styles.code}>from_where_did_you_learn_flute</code></td></tr>
            </tbody>
          </table>
          <div style={styles.staticValues}>
            <strong>Static Values (Examples):</strong>
            <ul style={{ ...styles.ul, marginTop: '8px' }}>
              <li><code style={styles.code}>"linkedin"</code> - LinkedIn</li>
              <li><code style={styles.code}>"facebook"</code> - Facebook</li>
              <li><code style={styles.code}>"instagram"</code> - Instagram</li>
              <li><code style={styles.code}>"google"</code> - Google Search</li>
              <li><code style={styles.code}>"friend"</code> - Friend/Referral</li>
              <li><code style={styles.code}>"other"</code> - Other</li>
            </ul>
          </div>
        </div>

        {/* Field 13: Upload Photos */}
        <div style={styles.fieldCard}>
          <div style={styles.fieldName}>13. Upload Photos <span style={styles.mandatory}>*</span></div>
          <table style={styles.table}>
            <tbody>
              <tr><th style={styles.th}>Property</th><th style={styles.th}>Value</th></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Type</strong></td><td style={styles.td}>File Upload (Images)</td></tr>
              <tr><td style={styles.td}><strong>Required</strong></td><td style={{ ...styles.td, ...styles.mandatory }}>Yes</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Min Images</strong></td><td style={styles.td}>3 photos</td></tr>
              <tr><td style={styles.td}><strong>Max Images</strong></td><td style={styles.td}>5 photos</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Accepted Formats</strong></td><td style={styles.td}>JPG, PNG, JPEG</td></tr>
              <tr><td style={styles.td}><strong>Max File Size</strong></td><td style={styles.td}>5 MB per image (recommended)</td></tr>
              <tr style={{ backgroundColor: '#f7fafc' }}><td style={styles.td}><strong>Visibility</strong></td><td style={styles.td}>Always visible for all roles</td></tr>
            </tbody>
          </table>
          <div style={styles.warning}>
            <strong>⚠️ Important:</strong> Photos must be uploaded using a separate API call BEFORE submitting the registration form.
          </div>
        </div>

        {/* API Flow */}
        <h2 style={styles.h2}>🔄 API Call Flow</h2>
        
        <div style={styles.flowDiagram}>
          <div style={styles.flowStep}>
            <strong>Step 1:</strong> Load Language List (on page load)
            <div style={{ marginTop: '8px', color: '#718096' }}>GET /meta/languages/get_all_languages</div>
          </div>
          <div style={styles.flowArrow}>⬇️</div>
          <div style={styles.flowStep}>
            <strong>Step 2:</strong> Load Categories (if user selects Coach role)
            <div style={{ marginTop: '8px', color: '#718096' }}>GET /meta/coach_categories/get_all</div>
          </div>
          <div style={styles.flowArrow}>⬇️</div>
          <div style={styles.flowStep}>
            <strong>Step 3:</strong> Load Skills based on selected categories
            <div style={{ marginTop: '8px', color: '#718096' }}>POST /meta/coach_skill/get_all</div>
          </div>
          <div style={styles.flowArrow}>⬇️</div>
          <div style={styles.flowStep}>
            <strong>Step 4:</strong> Upload Photos (3-5 photos)
            <div style={{ marginTop: '8px', color: '#718096' }}>POST /api/v1/consultant/profile/photos?is_registration=1</div>
          </div>
          <div style={styles.flowArrow}>⬇️</div>
          <div style={styles.flowStep}>
            <strong>Step 5:</strong> Register Consultant (after successful photo upload)
            <div style={{ marginTop: '8px', color: '#718096' }}>POST /api/v1/consultant/profile/register</div>
          </div>
          <div style={styles.flowArrow}>⬇️</div>
          <div style={styles.flowStep}>
            <strong>Step 6:</strong> Get Progress Level List (on progress screen load)
            <div style={{ marginTop: '8px', color: '#718096' }}>GET /api/v1/consultant/auth/onboard-level/get-all</div>
          </div>
          <div style={styles.flowArrow}>⬇️</div>
          <div style={styles.flowStep}>
            <strong>Step 7:</strong> Get Consultant Level Progress Status (on progress screen load)
            <div style={{ marginTop: '8px', color: '#718096' }}>GET /api/v1/consultant/auth/consultant-level-progress/get-all</div>
          </div>
          <div style={styles.flowArrow}>⬇️</div>
          <div style={styles.success}>
            <strong>✅ Display Progress Level Screen</strong>
            <div style={{ marginTop: '8px' }}>Show consultant's onboarding progress with status for each level</div>
          </div>
        </div>

        {/* API Endpoints Section */}
        <h2 style={styles.h2}>📡 API Endpoints</h2>

        {/* API 1: Get Languages */}
        <div style={styles.apiSection}>
          <h3 style={styles.h3}>1. Get Language List</h3>
          
          <div>
            <span style={{ ...styles.methodBadge, ...styles.methodGet }}>GET</span>
            <span style={{ fontSize: '0.9em', color: '#718096' }}>Fetch all available languages for the consultant to select</span>
          </div>

          <div style={styles.endpoint}>
            https://api.fluteconnect.com/meta/languages/get_all_languages?page=1&size=10
          </div>

          <h3 style={styles.h3}>📋 Query Parameters</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Parameter</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Required</th>
                <th style={styles.th}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>page</code></td>
                <td style={styles.td}>Integer</td>
                <td style={styles.td}>⚠️ Optional</td>
                <td style={styles.td}>Page number for pagination (default: 1)</td>
              </tr>
              <tr>
                <td style={styles.td}><code style={styles.code}>size</code></td>
                <td style={styles.td}>Integer</td>
                <td style={styles.td}>⚠️ Optional</td>
                <td style={styles.td}>Number of records per page (default: 10)</td>
              </tr>
            </tbody>
          </table>

          <h3 style={styles.h3}>📤 Sample Response</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "success": true,
    "message": "Languages fetched successfully",
    "data": {
        "languages": [
            {
                "id": 1,
                "name": "Hindi",
                "code": "hi"
            },
            {
                "id": 2,
                "name": "English",
                "code": "en"
            },
            {
                "id": 3,
                "name": "Bengali",
                "code": "bn"
            },
            {
                "id": 4,
                "name": "Tamil",
                "code": "ta"
            }
        ],
        "pagination": {
            "current_page": 1,
            "total_pages": 2,
            "total_records": 15
        }
    }
}`}</pre>
          </div>

          <h3 style={styles.h3}>🔄 cURL Command</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>curl --location 'https://api.fluteconnect.com/meta/languages/get_all_languages?page=1&size=10'</pre>
          </div>

          <div style={styles.info}>
            <strong>Usage:</strong> Store the language names in an array and use them for the multi-select dropdown. Send the selected language names (strings) in the registration API request.
          </div>
        </div>

        {/* API 2: Get Categories */}
        <div style={styles.apiSection}>
          <h3 style={styles.h3}>2. Get Categories List</h3>
          
          <div>
            <span style={{ ...styles.methodBadge, ...styles.methodGet }}>GET</span>
            <span style={{ fontSize: '0.9em', color: '#718096' }}>Fetch all coaching categories (Only for Coach role)</span>
          </div>

          <div style={styles.endpoint}>
            https://api.fluteconnect.com/meta/coach_categories/get_all
          </div>

          <h3 style={styles.h3}>📋 Headers</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Header</th>
                <th style={styles.th}>Value</th>
                <th style={styles.th}>Required</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>Authorization</code></td>
                <td style={styles.td}>Bearer {'{access_token}'}</td>
                <td style={styles.td}>✅ Yes</td>
              </tr>
            </tbody>
          </table>

          <h3 style={styles.h3}>📤 Sample Response</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "success": true,
    "message": "Categories fetched successfully",
    "data": {
        "categories": [
            {
                "id": 1,
                "name": "Career Coaching",
                "description": "Professional development and career growth"
            },
            {
                "id": 2,
                "name": "Life Coaching",
                "description": "Personal development and life goals"
            },
            {
                "id": 3,
                "name": "Health & Wellness",
                "description": "Physical and mental wellbeing"
            },
            {
                "id": 4,
                "name": "Relationship Coaching",
                "description": "Interpersonal relationships and communication"
            }
        ]
    }
}`}</pre>
          </div>

          <h3 style={styles.h3}>🔄 cURL Command</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`curl --location 'https://api.fluteconnect.com/meta/coach_categories/get_all' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}</pre>
          </div>

          <div style={styles.warning}>
            <strong>⚠️ Trigger Condition:</strong> This API should only be called when the user selects "Coach" as their role.
          </div>
        </div>

        {/* API 3: Get Skills */}
        <div style={styles.apiSection}>
          <h3 style={styles.h3}>3. Get Skills Based on Categories</h3>
          
          <div>
            <span style={{ ...styles.methodBadge, ...styles.methodPost }}>POST</span>
            <span style={{ fontSize: '0.9em', color: '#718096' }}>Fetch skills based on selected categories (For Coach role)</span>
          </div>

          <div style={styles.endpoint}>
            https://api.fluteconnect.com/meta/coach_skill/get_all
          </div>

          <h3 style={styles.h3}>📋 Headers</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Header</th>
                <th style={styles.th}>Value</th>
                <th style={styles.th}>Required</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>Content-Type</code></td>
                <td style={styles.td}>application/json</td>
                <td style={styles.td}>✅ Yes</td>
              </tr>
              <tr>
                <td style={styles.td}><code style={styles.code}>Authorization</code></td>
                <td style={styles.td}>Bearer {'{access_token}'}</td>
                <td style={styles.td}>✅ Yes</td>
              </tr>
            </tbody>
          </table>

          <h3 style={styles.h3}>📥 Request Body</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Parameter</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Required</th>
                <th style={styles.th}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>category_ids</code></td>
                <td style={styles.td}>Array[Integer]</td>
                <td style={styles.td}>✅ Yes</td>
                <td style={styles.td}>Array of selected category IDs (max 3)</td>
              </tr>
            </tbody>
          </table>

          <h3 style={styles.h3}>📄 Sample Request</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "category_ids": [1]
}`}</pre>
          </div>

          <h3 style={styles.h3}>📤 Sample Response</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "success": true,
    "message": "Skills fetched successfully",
    "data": {
        "skills": [
            {
                "id": 51,
                "name": "Leadership Development",
                "category_id": 1
            },
            {
                "id": 93,
                "name": "Interview Preparation",
                "category_id": 1
            },
            {
                "id": 94,
                "name": "Resume Building",
                "category_id": 1
            },
            {
                "id": 95,
                "name": "Career Transition",
                "category_id": 1
            }
        ]
    }
}`}</pre>
          </div>

          <h3 style={styles.h3}>🔄 cURL Command</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`curl --location 'https://api.fluteconnect.com/meta/coach_skill/get_all' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \\
--data '{
    "category_ids": [1]
}'`}</pre>
          </div>

          <div style={styles.warning}>
            <strong>⚠️ Trigger Condition:</strong> This API should be called whenever the user selects or changes categories. The skills dropdown should be updated dynamically based on the response.
          </div>
        </div>

        {/* API 4: Upload Photos */}
        <div style={styles.apiSection}>
          <h3 style={styles.h3}>4. Upload Consultant Photos</h3>
          
          <div>
            <span style={{ ...styles.methodBadge, ...styles.methodPost }}>POST</span>
            <span style={{ fontSize: '0.9em', color: '#718096' }}>Upload consultant profile photos (3-5 images required)</span>
          </div>

          <div style={styles.endpoint}>
            https://api.fluteconnect.com/api/v1/consultant/profile/photos?is_registration=1
          </div>

          <h3 style={styles.h3}>📋 Headers</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Header</th>
                <th style={styles.th}>Value</th>
                <th style={styles.th}>Required</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>Authorization</code></td>
                <td style={styles.td}>Bearer {'{access_token}'}</td>
                <td style={styles.td}>✅ Yes</td>
              </tr>
              <tr>
                <td style={styles.td}><code style={styles.code}>Content-Type</code></td>
                <td style={styles.td}>multipart/form-data</td>
                <td style={styles.td}>✅ Yes</td>
              </tr>
            </tbody>
          </table>

          <h3 style={styles.h3}>📋 Query Parameters</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Parameter</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Required</th>
                <th style={styles.th}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>is_registration</code></td>
                <td style={styles.td}>Integer</td>
                <td style={styles.td}>✅ Yes</td>
                <td style={styles.td}>Set to 1 to indicate this is during registration</td>
              </tr>
            </tbody>
          </table>

          <h3 style={styles.h3}>📥 Form Data</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Field Name</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Required</th>
                <th style={styles.th}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>file</code></td>
                <td style={styles.td}>File (Image)</td>
                <td style={styles.td}>✅ Yes</td>
                <td style={styles.td}>Upload 3-5 image files (multiple file parameters with same name "file")</td>
              </tr>
            </tbody>
          </table>

          <div style={styles.validationBox}>
            <strong>Validation Rules:</strong>
            <ul style={{ ...styles.ul, marginTop: '10px' }}>
              <li>Minimum 3 photos required</li>
              <li>Maximum 5 photos allowed</li>
              <li>Accepted formats: JPG, JPEG, PNG</li>
              <li>Recommended max size: 5 MB per image</li>
              <li>This API must be called BEFORE the registration API</li>
            </ul>
          </div>

          <h3 style={styles.h3}>📤 Sample Response (Success)</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "success": true,
    "message": "Photos uploaded successfully",
    "data": {
        "uploaded_photos": [
            {
                "photo_id": 1,
                "url": "https://cdn.fluteconnect.com/photos/consultant_123_photo_1.jpg",
                "is_primary": true
            },
            {
                "photo_id": 2,
                "url": "https://cdn.fluteconnect.com/photos/consultant_123_photo_2.jpg",
                "is_primary": false
            },
            {
                "photo_id": 3,
                "url": "https://cdn.fluteconnect.com/photos/consultant_123_photo_3.jpg",
                "is_primary": false
            }
        ],
        "total_uploaded": 3
    }
}`}</pre>
          </div>

          <h3 style={styles.h3}>🔄 cURL Command</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`curl --location 'https://api.fluteconnect.com/api/v1/consultant/profile/photos?is_registration=1' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \\
--form 'file=@"/path/to/photo1.png"' \\
--form 'file=@"/path/to/photo2.png"' \\
--form 'file=@"/path/to/photo3.png"'`}</pre>
          </div>

          <div style={styles.warning}>
            <strong>⚠️ Critical:</strong> This API must be called and completed successfully BEFORE calling the registration API. Store the response data to confirm successful upload before proceeding.
          </div>
        </div>

        {/* API 5: Register Consultant */}
        <div style={styles.apiSection}>
          <h3 style={styles.h3}>5. Register Consultant</h3>
          
          <div>
            <span style={{ ...styles.methodBadge, ...styles.methodPost }}>POST</span>
            <span style={{ fontSize: '0.9em', color: '#718096' }}>Complete consultant registration with all profile details</span>
          </div>

          <div style={styles.endpoint}>
            https://api.fluteconnect.com/api/v1/consultant/profile/register
          </div>

          <h3 style={styles.h3}>📋 Headers</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Header</th>
                <th style={styles.th}>Value</th>
                <th style={styles.th}>Required</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>Content-Type</code></td>
                <td style={styles.td}>application/json</td>
                <td style={styles.td}>✅ Yes</td>
              </tr>
              <tr>
                <td style={styles.td}><code style={styles.code}>Authorization</code></td>
                <td style={styles.td}>Bearer {'{access_token}'}</td>
                <td style={styles.td}>✅ Yes</td>
              </tr>
            </tbody>
          </table>

          <h3 style={styles.h3}>📥 Request Body Parameters</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Parameter</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Required</th>
                <th style={styles.th}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>first_name</code></td>
                <td style={styles.td}>String</td>
                <td style={{ ...styles.td, ...styles.mandatory }}>✅ Yes</td>
                <td style={styles.td}>First name (max 30 chars)</td>
              </tr>
              <tr>
                <td style={styles.td}><code style={styles.code}>last_name</code></td>
                <td style={styles.td}>String</td>
                <td style={{ ...styles.td, ...styles.optional }}>❌ No</td>
                <td style={styles.td}>Last name (max 30 chars, optional)</td>
              </tr>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>date_of_birth</code></td>
                <td style={styles.td}>String</td>
                <td style={{ ...styles.td, ...styles.mandatory }}>✅ Yes</td>
                <td style={styles.td}>Date of birth in DD/MM/YYYY format</td>
              </tr>
              <tr>
                <td style={styles.td}><code style={styles.code}>gender</code></td>
                <td style={styles.td}>Integer</td>
                <td style={{ ...styles.td, ...styles.mandatory }}>✅ Yes</td>
                <td style={styles.td}>1: Man, 2: Woman, 3: Others</td>
              </tr>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>marital_status</code></td>
                <td style={styles.td}>Integer</td>
                <td style={{ ...styles.td, ...styles.mandatory }}>✅ Yes</td>
                <td style={styles.td}>1: Single, 2: Married, 3: Divorced, 4: Separated, 5: Widow</td>
              </tr>
              <tr>
                <td style={styles.td}><code style={styles.code}>languages</code></td>
                <td style={styles.td}>Array[String]</td>
                <td style={{ ...styles.td, ...styles.mandatory }}>✅ Yes</td>
                <td style={styles.td}>Array of language names (max 3)</td>
              </tr>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>consultant_type</code></td>
                <td style={styles.td}>Integer</td>
                <td style={{ ...styles.td, ...styles.mandatory }}>✅ Yes</td>
                <td style={styles.td}>1: Astrologer, 2: Coach, 3: Listener</td>
              </tr>
              <tr>
                <td style={styles.td}><code style={styles.code}>categories</code></td>
                <td style={styles.td}>Array[Integer]</td>
                <td style={{ ...styles.td, ...styles.mandatory }}>✅ Yes</td>
                <td style={styles.td}>
                  Always required:<br />
                  • Astrologer: Send [1] (hidden in UI)<br />
                  • Coach: User-selected category IDs (max 3)<br />
                  • Listener: Send [3] (hidden in UI)
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>skills</code></td>
                <td style={styles.td}>Array[Integer]</td>
                <td style={{ ...styles.td, ...styles.conditional }}>⚠️ Conditional</td>
                <td style={styles.td}>Required for Astrologer & Coach (skill IDs)</td>
              </tr>
              <tr>
                <td style={styles.td}><code style={styles.code}>description</code></td>
                <td style={styles.td}>String</td>
                <td style={{ ...styles.td, ...styles.optional }}>❌ No</td>
                <td style={styles.td}>About the consultant (optional)</td>
              </tr>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>services</code></td>
                <td style={styles.td}>String</td>
                <td style={{ ...styles.td, ...styles.optional }}>❌ No</td>
                <td style={styles.td}>Services offered (optional, only for Astrologer & Coach)</td>
              </tr>
              <tr>
                <td style={styles.td}><code style={styles.code}>from_where_did_you_learn_flute</code></td>
                <td style={styles.td}>String</td>
                <td style={{ ...styles.td, ...styles.mandatory }}>✅ Yes</td>
                <td style={styles.td}>Source of how they learned about Flute</td>
              </tr>
            </tbody>
          </table>

          <h3 style={styles.h3}>📄 Sample Request (Astrologer)</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "first_name": "Rajesh",
    "last_name": "Sharma",
    "date_of_birth": "15/08/1985",
    "gender": 1,
    "marital_status": 2,
    "languages": ["Hindi", "English"],
    "consultant_type": 1,
    "categories": [1],
    "skills": [51, 93, 94],
    "description": "Experienced Vedic astrologer with 10+ years of practice",
    "services": "Birth chart reading, Matchmaking, Career guidance",
    "from_where_did_you_learn_flute": "linkedin"
}`}</pre>
          </div>

          <h3 style={styles.h3}>📄 Sample Request (Coach)</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "first_name": "Ankur",
    "last_name": "Kumar",
    "date_of_birth": "04/10/1994",
    "gender": 1,
    "marital_status": 1,
    "languages": ["Hindi", "English"],
    "consultant_type": 2,
    "categories": [1],
    "skills": [51, 93, 94],
    "description": "Hi, Testing account.",
    "services": "Testing purpose",
    "from_where_did_you_learn_flute": "linkedin"
}`}</pre>
          </div>

          <h3 style={styles.h3}>📄 Sample Request (Listener)</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "first_name": "Priya",
    "last_name": "Verma",
    "date_of_birth": "20/03/1992",
    "gender": 2,
    "marital_status": 1,
    "languages": ["Hindi", "English", "Bengali"],
    "consultant_type": 3,
    "categories": [3],
    "description": "Empathetic listener available to support you",
    "from_where_did_you_learn_flute": "instagram"
}`}</pre>
          </div>

          <h3 style={styles.h3}>📤 Sample Response (Success)</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "success": true,
    "message": "Consultant registered successfully",
    "data": {
        "consultant_id": 3355,
        "first_name": "Ankur",
        "last_name": "Kumar",
        "consultant_type": 2,
        "status": "pending_approval",
        "registration_completed_at": "2025-11-11T10:30:00Z"
    }
}`}</pre>
          </div>

          <h3 style={styles.h3}>🔄 cURL Command</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`curl --location 'https://api.fluteconnect.com/api/v1/consultant/profile/register' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \\
--data '{
    "first_name": "Ankur",
    "last_name": "Kumar",
    "date_of_birth": "04/10/1994",
    "gender": 1,
    "marital_status": 1,
    "languages": ["Hindi", "English"],
    "consultant_type": 1,
    "categories": [1],
    "skills": [51, 93, 94],
    "description": "Hi, Testing account.",
    "services": "Testing purpose",
    "from_where_did_you_learn_flute": "linkedin"
}'`}</pre>
          </div>

          <div style={styles.warning}>
            <strong>⚠️ Pre-requisite:</strong> The photo upload API must be successfully completed before calling this API.
          </div>
        </div>

        {/* API 6: Progress Level List */}
        <div style={styles.apiSection}>
          <h3 style={styles.h3}>6. Get Progress Level List</h3>
          
          <div>
            <span style={{ ...styles.methodBadge, ...styles.methodGet }}>GET</span>
            <span style={{ fontSize: '0.9em', color: '#718096' }}>Fetch all available onboarding progress levels</span>
          </div>

          <div style={styles.endpoint}>
            https://api.fluteconnect.com/api/v1/consultant/auth/onboard-level/get-all
          </div>

          <h3 style={styles.h3}>📋 Headers</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Header</th>
                <th style={styles.th}>Value</th>
                <th style={styles.th}>Required</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>Authorization</code></td>
                <td style={styles.td}>Bearer {'{access_token}'}</td>
                <td style={styles.td}>✅ Yes</td>
              </tr>
            </tbody>
          </table>

          <h3 style={styles.h3}>📤 Sample Response</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "success": true,
    "message": "Progress levels fetched successfully",
    "data": {
        "levels": [
            {
                "level_id": 1,
                "level_name": "Registration",
                "level_order": 1,
                "description": "Complete your profile registration"
            },
            {
                "level_id": 2,
                "level_name": "Document Verification",
                "level_order": 2,
                "description": "Upload and verify your documents"
            },
            {
                "level_id": 3,
                "level_name": "Profile Review",
                "level_order": 3,
                "description": "Admin review of your profile"
            },
            {
                "level_id": 4,
                "level_name": "Training Completion",
                "level_order": 4,
                "description": "Complete mandatory training modules"
            }
        ]
    }
}`}</pre>
          </div>

          <h3 style={styles.h3}>🔄 cURL Command</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`curl --location 'https://api.fluteconnect.com/api/v1/consultant/auth/onboard-level/get-all' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}</pre>
          </div>

          <div style={styles.info}>
            <strong>Usage:</strong> This API provides the master list of all onboarding levels that consultants need to complete.
          </div>
        </div>

        {/* API 7: Consultant Level Progress Status */}
        <div style={styles.apiSection}>
          <h3 style={styles.h3}>7. Get Consultant Level Progress Status</h3>
          
          <div>
            <span style={{ ...styles.methodBadge, ...styles.methodGet }}>GET</span>
            <span style={{ fontSize: '0.9em', color: '#718096' }}>Fetch consultant's current progress status for each onboarding level</span>
          </div>

          <div style={styles.endpoint}>
            https://api.fluteconnect.com/api/v1/consultant/auth/consultant-level-progress/get-all
          </div>

          <h3 style={styles.h3}>📋 Headers</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Header</th>
                <th style={styles.th}>Value</th>
                <th style={styles.th}>Required</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <td style={styles.td}><code style={styles.code}>Authorization</code></td>
                <td style={styles.td}>Bearer {'{access_token}'}</td>
                <td style={styles.td}>✅ Yes</td>
              </tr>
            </tbody>
          </table>

          <h3 style={styles.h3}>📤 Sample Response</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "success": true,
    "message": "Consultant progress status fetched successfully",
    "data": {
        "consultant_id": 1,
        "progress": [
            {
                "level_id": 1,
                "level_name": "Registration",
                "status": "completed",
                "completed_at": "2025-11-11T10:30:00Z",
                "completion_percentage": 100
            },
            {
                "level_id": 2,
                "level_name": "Document Verification",
                "status": "in_progress",
                "completed_at": null,
                "completion_percentage": 60
            },
            {
                "level_id": 3,
                "level_name": "Profile Review",
                "status": "pending",
                "completed_at": null,
                "completion_percentage": 0
            },
            {
                "level_id": 4,
                "level_name": "Training Completion",
                "status": "not_started",
                "completed_at": null,
                "completion_percentage": 0
            }
        ],
        "current_level": 2,
        "overall_progress": 40
    }
}`}</pre>
          </div>

          <h3 style={styles.h3}>🔄 cURL Command</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`curl --location 'https://api.fluteconnect.com/api/v1/consultant/auth/consultant-level-progress/get-all' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}</pre>
          </div>

          <div style={styles.success}>
            <strong>✅ Combined Usage:</strong> Call both APIs (Progress Level List + Consultant Level Progress Status) when loading the Progress Level screen to show:
            <ul style={{ ...styles.ul, marginTop: '10px' }}>
              <li>All available onboarding levels (from API 6)</li>
              <li>Consultant's current status and progress for each level (from API 7)</li>
            </ul>
          </div>
        </div>

        {/* Error Handling */}
        <div style={styles.apiSection}>
          <h2 style={styles.h2}>❌ Common Error Responses</h2>
          
          <h3 style={styles.h3}>Validation Error (400)</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "success": false,
    "message": "Validation error",
    "error_code": "VALIDATION_ERROR",
    "errors": [
        {
            "field": "first_name",
            "message": "First name is required"
        },
        {
            "field": "languages",
            "message": "Maximum 3 languages can be selected"
        }
    ]
}`}</pre>
          </div>

          <h3 style={styles.h3}>Unauthorized (401)</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "success": false,
    "message": "Unauthorized access",
    "error_code": "UNAUTHORIZED",
    "details": "Invalid or expired authentication token"
}`}</pre>
          </div>

          <h3 style={styles.h3}>Photos Not Uploaded (400)</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "success": false,
    "message": "Photos must be uploaded before registration",
    "error_code": "PHOTOS_REQUIRED",
    "details": "Please upload 3-5 profile photos before completing registration"
}`}</pre>
          </div>

          <h3 style={styles.h3}>File Upload Error (400)</h3>
          <div style={styles.codeBlock}>
            <pre style={{ margin: 0 }}>{`{
    "success": false,
    "message": "File upload failed",
    "error_code": "FILE_UPLOAD_ERROR",
    "details": "Minimum 3 photos required. Current count: 2"
}`}</pre>
          </div>
        </div>

        {/* Best Practices */}
        <div style={styles.apiSection}>
          <h2 style={styles.h2}>✨ Implementation Guidelines</h2>
          
          <h3 style={styles.h3}>Form Validation</h3>
          <ul style={styles.ul}>
            <li>Validate all mandatory fields before allowing form submission</li>
            <li>Show real-time validation errors as users fill the form</li>
            <li>Ensure date of birth results in age 18+ before submission</li>
            <li>Limit text inputs to specified character limits</li>
            <li>Enforce language selection limit (max 3)</li>
            <li>Enforce category selection limit for coaches (max 3)</li>
          </ul>

          <h3 style={styles.h3}>Conditional Field Rendering</h3>
          <ul style={styles.ul}>
            <li>Hide/show Categories and Skills fields based on role selection</li>
            <li>For Astrologer: Hide categories field but send <code style={styles.code}>categories: [1]</code> in request</li>
            <li>For Coach: Show categories field and let user select (max 3)</li>
            <li>For Listener: Hide categories field but send <code style={styles.code}>categories: [3]</code> in request</li>
            <li>Clear user-selected Categories and Skills data when role is changed</li>
            <li>Dynamically load skills when categories change (for Coach)</li>
            <li>Show Services field only for Astrologer and Coach roles</li>
          </ul>

          <h3 style={styles.h3}>API Call Sequence</h3>
          <ul style={styles.ul}>
            <li><strong>On Page Load:</strong> Call Language List API</li>
            <li><strong>When Role = Coach:</strong> Call Categories List API</li>
            <li><strong>When Categories Selected:</strong> Call Skills API with category IDs</li>
            <li><strong>Before Registration:</strong> Upload photos (3-5 images)</li>
            <li><strong>After Photo Upload:</strong> Call Registration API</li>
            <li><strong>After Registration:</strong> Call both Progress Level APIs and redirect</li>
          </ul>

          <h3 style={styles.h3}>Photo Upload</h3>
          <ul style={styles.ul}>
            <li>Allow users to preview images before upload</li>
            <li>Validate file format (JPG, PNG, JPEG only)</li>
            <li>Validate file size (recommended max 5 MB)</li>
            <li>Show upload progress indicator</li>
            <li>Disable registration submit until photos are uploaded successfully</li>
            <li>Allow users to remove and re-upload photos if needed</li>
          </ul>

          <h3 style={styles.h3}>Error Handling</h3>
          <ul style={styles.ul}>
            <li>Display user-friendly error messages for validation failures</li>
            <li>Handle network errors gracefully with retry options</li>
            <li>Show specific field-level errors below the respective fields</li>
            <li>Prevent form submission if photo upload fails</li>
          </ul>

          <h3 style={styles.h3}>User Experience</h3>
          <ul style={styles.ul}>
            <li>Use a progress indicator to show registration completion status</li>
            <li>Provide helpful tooltips or hints for complex fields</li>
            <li>Disable submit button during API calls to prevent double submissions</li>
            <li>Show loading states during API calls</li>
            <li>Provide confirmation message on successful registration</li>
          </ul>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p><strong>API Documentation v1.0</strong></p>
          <p style={{ marginTop: '10px' }}>Last Updated: November 11, 2025</p>
          <p style={{ marginTop: '10px' }}>For support or questions, please contact the development team</p>
        </div>
      </div>
    </div>
  );
};

export default ConsultantRegistrationDocs;