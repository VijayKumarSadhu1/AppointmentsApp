import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {id, name, date, isLiked} = appointmentDetails

  const imageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const addStar = event => {
    const {addAppointmentToStarred} = props
    addAppointmentToStarred(id, event)
  }

  return (
    <li className="appointmentContainer">
      <div className="nameAndDate">
        <p className="name">{name}</p>
        <p className="displayDate">{date}</p>
      </div>
      <button
        type="button"
        onClick={addStar}
        className="star"
        data-testid="star"
      >
        <img src={imageUrl} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem
