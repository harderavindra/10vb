import { useState } from 'react'
import SectionHeader from '../components/SectionHeader.jsx'
import LanguageToggle from '../components/LanguageToggle.jsx'
import { ATTENDANCE_LIST } from '../constants.js'

function AttendancePage() {
  const [language, setLanguage] = useState('en')
  const [searchText, setSearchText] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const filteredList = ATTENDANCE_LIST.filter(person => {
    const matchesSearch = person.name['en'].toLowerCase().includes(searchText.toLowerCase())
    const matchesRole = selectedRole === '' || person.role.toString() === selectedRole
    return matchesSearch && matchesRole
  })

  return (
    <main className="attendance-page " style={{paddingBottom:'60px'}}>
      <SectionHeader title={language === 'en' ? "Attendance" : "उपस्थिति"} subtitle={language === 'en' ? "View the attendance list here." : "येथे उपस्थिति यादी पहा."} />
      
      

      <div className="filters">
        <LanguageToggle currentLanguage={language} onChange={setLanguage} />
        <label>
          {language === 'en' ? 'Search Name:' : 'नाव शोधा:'}
          <input 
            type="text" 
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)} 
            placeholder={language === 'en' ? 'Enter name...' : 'नाव प्रविष्ट करा...'}
          />
        </label>
        <label>
          {language === 'en' ? 'Role Number:' : 'हजेरी क्रमांक'}
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="">{language === 'en' ? 'All' : 'सर्व'}</option>
            {ATTENDANCE_LIST.map(person => (
              <option key={person.role} value={person.role}>{person.role}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="attendance-list">
        <h3>{language === 'en' ? 'Attendance List' : 'उपस्थिति यादी'}</h3>
        <table>
          <thead>
            <tr>
              <th>{language === 'en' ? 'Role' : 'हजेरी'}</th>
              <th>{language === 'en' ? 'Name' : 'नाव'}</th>
              <th>{language === 'en' ? 'DOB' : 'जन्मतारीख'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map(person => (
              <tr key={person.role}>
                <td>{person.role}</td>
                <td>{person.name[language]}</td>
                <td>{person.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default AttendancePage
