import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux";
import { onNewEventModalClose } from "../../../store/ui/uiSlice";
import ReactDatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { exitActiveEvent, setNewEvent } from "../../../store/calendar/calendarSlice";
import { useEffect } from "react";

export const CalendarNewEventModal = () => {

    const dispatch = useDispatch();
    const {isNewEventModalOpen} = useSelector( (state) => state.ui );
    const {activeEvent} = useSelector( (state) => state.calendar );

    useEffect(() => {
      setInputForm({
        title: '',
        start: activeEvent.start,
        end: activeEvent.end,
        notes: ''
      })
    }, [isNewEventModalOpen])
    

    const [inputForm, setInputForm] = useState({})

    const onInputChange = ({ target }) => {
      const { name, value } = target;
      setInputForm({
          ...inputForm,
          [ name ]: value
      });
    }


    const onDateChange = (event,name) => {
      setInputForm({
          ...inputForm,
          [ name ]: event
      });
    }

    const formValidations = {
      title: [ (value) => value.length >= 1, 'El evento debe tener un titulo'],
    }

    const [formValidate, setFormValidate] = useState()

    const onFormValidate = () =>{

        const formErrorMessage = {}

        for (const formField of Object.keys( formValidations )) {

            const [ fn, errorMessage ] = formValidations[formField];

            formErrorMessage[`${ formField }Message`] = fn( inputForm[formField] ) ? null : errorMessage;

        }

        setFormValidate(formErrorMessage);

    }

    const onSubmit = (event) => {
      event.preventDefault();
      onFormValidate();
      //console.log(formValidate?.titleMessage);
      //if (formValidate?.titleMessage != '' ) return;

      const events = {
        id: new Date().getTime(),
        title: inputForm.title,
        start: inputForm.start,
        end:  inputForm.end,
        notes: inputForm.notes,
        user: {
          id: 1231231,
          name: 'jose diaz'
        }
      }

      dispatch(setNewEvent(events));
      dispatch(onNewEventModalClose());
    }

    const customStyles = {
        content: {
            width: '50%',
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
        dispatch(onNewEventModalClose());
        dispatch(exitActiveEvent())
        setFormValidate({});
      }
      
  return (
    <Modal
    style={customStyles}
    isOpen={isNewEventModalOpen}
    onRequestClose={onCloseModal}
    closeTimeoutMS={500}
    >
      <div className="modalevent">
        <form onSubmit={onSubmit} className="row">
          <div className="col-12 mb-3 has-validation">
            <label className="form-label">Titulo</label>
            <input className="form-control" type="text" placeholder="Junta con producción"name="title" onChange={onInputChange} value={inputForm.title} />
            <div className={ (!!formValidate?.titleMessage) ? "valid-form" : "" }>
              {formValidate?.titleMessage}
            </div>
          </div>
          <div className="col-6">
            <label className="form-label">Fecha inicio</label>
            <ReactDatePicker showTimeSelect dateFormat={'Pp'} className="form-control" selected={inputForm.start} onChange={(event) => onDateChange(event,'start') } />
          </div>
          <div className="col-6">
            <label className="form-label">Fecha final</label>
            <ReactDatePicker minDate={inputForm.start} showTimeSelect dateFormat={'Pp'} className="form-control" selected={inputForm.end} onChange={(event) => onDateChange(event,'end')} />
          </div>
          <div className="col-12 mt-2">
            <label className="form-label">Notas</label>
            <textarea name="notes" className="form-control" onChange={onInputChange} value={inputForm.notes}></textarea>
          </div>
          <div className="col-12 mt-2">
            <button className="btn btn-outline-primary">Guardar</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}