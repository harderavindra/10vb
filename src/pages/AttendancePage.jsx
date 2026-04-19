import SectionHeader from '../components/SectionHeader.jsx'

function AttendancePage() {
  return (
    <main className="attendance-page page-content">
      <SectionHeader title="Attendance" subtitle="Save your session attendance here." />
      <form className="attendance-form" id="attendance-form">
        <label>
          Name
          <input type="text" name="name" placeholder="Enter your name" required />
        </label>
        <label>
          Date
          <input type="date" name="date" required />
        </label>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  )
}

export default AttendancePage
