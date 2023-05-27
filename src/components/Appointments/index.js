import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    nameInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  getFilteredItems = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isLiked === true,
      )
    }
    return appointmentsList
  }

  setInputValuesClear = () => {
    this.setState({nameInput: '', dateInput: ''})
  }

  bookAppointment = event => {
    event.preventDefault()

    this.setInputValuesClear()

    const {nameInput, dateInput} = this.state

    const newAppointment = {
      id: v4(),
      name: nameInput,
      date: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isLiked: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
    }))
  }

  changeStarredFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  updateNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  updateDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  addAppointmentToStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isLiked: !eachAppointment.isLiked}
        }
        return eachAppointment
      }),
    }))
  }

  render() {
    const {nameInput, dateInput, isFilterActive} = this.state

    const filteredContent = this.getFilteredItems()

    const starredBackground = isFilterActive
      ? 'activeStarredButton'
      : 'starredButton'

    return (
      <div className="home-container">
        <div className="card-container">
          <div className="head-section">
            <form className="form" onSubmit={this.bookAppointment}>
              <h1 className="heading"> Add Appointment</h1>
              <label htmlFor="name" className="titleText">
                Title
              </label>
              <input
                id="name"
                type="text"
                className="nameInput"
                placeholder="Enter Your Name"
                onChange={this.updateNameInput}
                value={nameInput}
              />
              <label htmlFor="date" className="titleText">
                Date
              </label>
              <input
                id="date"
                type="date"
                className="dateInput"
                onChange={this.updateDateInput}
                value={dateInput}
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appStar">
            <h1 className="heading2">Appointments</h1>
            <button
              type="button"
              onClick={this.changeStarredFilter}
              className={`filter-style ${starredBackground}`}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {filteredContent.map(eachAppointment => (
              <l1>
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  addAppointmentToStarred={this.addAppointmentToStarred}
                />
              </l1>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
