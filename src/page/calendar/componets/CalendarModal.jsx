
import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux";
import { onEventModalClose } from '../../../store/ui/uiSlice'
import { deleteEvent, exitActiveEvent } from "../../../store/calendar/calendarSlice";
import dayjs from "dayjs";


export const CalendarModal = () => {

  const dispatch = useDispatch();
  const {isEventModalOpen} = useSelector( (state) => state.ui );
  const {activeEvent} = useSelector( (state) => state.calendar );

  const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
  };  

  Modal.setAppElement('#root');

  const onCloseModal = () => {
    dispatch(onEventModalClose());
    dispatch(exitActiveEvent())
  }

  const onDeleteEvent = () => {
    dispatch(deleteEvent(activeEvent));
    dispatch(onEventModalClose());
  }

  return (
    <Modal
    style={customStyles}
    isOpen={isEventModalOpen}
    onRequestClose={onCloseModal}
    closeTimeoutMS={500}
    >
      <div className="row modalevent">
        <div className="row justify-content-end">
          <div className="col-11"></div>
          <div className="col-1 btn-group justify-content-end">
            <button type="button" className="btn"><i className="bi bi-pencil-fill"></i></button>
            <button onClick={onDeleteEvent} type="button" className="btn"><i className="bi bi-trash3-fill"></i></button>
          </div>
        </div>
        <h3><i className="bi bi-bookmark-fill"></i>{activeEvent.title}</h3>
        <span><i className="bi bi-calendar"></i>{ (activeEvent.start == activeEvent.end) ? dayjs(activeEvent.start).format('DD-mm-YYYY, hh:mm A') : dayjs(activeEvent.start).format('MM-DD-YYYY, hh:mm A') +' - '+ dayjs(activeEvent.end).format('MM-DD-YYYY, hh:mm A') }</span>
        <span><i className="bi bi-journal-text"></i>{activeEvent.notes}</span>
        <span><i className="bi bi-person-fill"></i>{activeEvent.user?.name}</span>
      </div>
    </Modal>
  )
}