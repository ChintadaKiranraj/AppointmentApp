import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], Title: '', date: '', isActiveFilter: false}

  onClickFilter = () => {
    this.setState(prevSta => ({
      isActiveFilter: !prevSta.isActiveFilter,
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isActiveFilter} = this.state

    if (isActiveFilter) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStared === true,
      )
    }
    return appointmentList
  }

  getClickedStarStatus = id => {
    this.setState(prevSta => ({
      appointmentList: prevSta.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStared: !each.isStared}
        }
        return each
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {Title, date} = this.state

    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      DATE: formattedDate,
      TITLE: Title,
      isStared: false,
    }

    this.setState(prevSta => ({
      appointmentList: [...prevSta.appointmentList, newAppointment],
      date: '',
      Title: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({Title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {date, Title} = this.state
    const filteredAppointmentList = this.getFilteredAppointmentsList()

    return (
      <div className="App-content">
        <div className="app-card">
          <div className="form-form-image">
            <div>
              <h1 className="appointmentHead">Add Appointment</h1>
              <form onSubmit={this.onAddAppointment}>
                <label htmlFor="title" placeholder="title">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  id="title"
                  onChange={this.onChangeTitle}
                  value={Title}
                  className="input-title"
                  placeholder="Title"
                />
                <br />
                <label htmlFor="date" placeholder="date">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  onChange={this.onChangeDate}
                  value={date}
                  className="input-title"
                />
                <br />
                <button type="submit" className="addButton">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>

          <hr />

          <div className="Ul-list-Container">
            <h1 className="appointmentHead">Appointments</h1>
            <button
              type="button"
              className="strFilterButton"
              onClick={this.onClickFilter}
            >
              Starred
            </button>
          </div>

          <ul className="appoint-list-container">
            {filteredAppointmentList.map(each => (
              <AppointmentItem
                eachAppointment={each}
                key={each.id}
                getClickedStarStatus={this.getClickedStarStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
