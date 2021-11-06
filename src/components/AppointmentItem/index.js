import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, getClickedStarStatus} = props
  const {id, TITLE, DATE, isStared} = eachAppointment
  const filledStar =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  const unFilledStar =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const isLiked = isStared ? filledStar : unFilledStar

  const onClickStar = () => {
    getClickedStarStatus(id)
  }

  return (
    <li className="EachAppointmentItem">
      <div>
        <p>{TITLE}</p>
        <p>Date:{DATE}</p>
      </div>
      <button
        type="button"
        className="startButton"
        testid="star"
        onClick={onClickStar}
      >
        <img src={isLiked} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
