export const CalendarEvent = ({event}) => {

  const {title,end,start,allDay,user,notes} = event;  

  return (
    <div className='calendarevent'>
        <div className='row'>
            <span>
              <i className="bi bi-person-fill"></i>
                {user?.name}
            </span>
            <span><i className="bi bi-bookmark-fill text-truncate"></i>{title}</span>
            <span><i className="bi bi-journal-text text-truncate"></i>{notes}</span>
        </div>
    </div>
  )
}