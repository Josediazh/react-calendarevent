import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useCalendarStore } from "../../../hook/useCalendarStore";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onEventModalClose } from "../../../store/ui/uiSlice";

export const CalendarEdit = () => {

    const { activeEvent } = useSelector( state => state.calendar );
    const { startGetEvent,startEditEvent } = useCalendarStore();
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputForm, setInputForm] = useState({
      title: activeEvent.title || 'Evento sin titulo',
      start: activeEvent.start,
      end:  activeEvent.end,
      notes: activeEvent.notes,
    });

    useEffect(() => {

      startGetEvent({id});
      
    }, [])
    

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

    const onSubmit = (event) => {
      event.preventDefault();

      startEditEvent({
        id: id,
        title: inputForm.title,
        start: inputForm.start,
        end:  inputForm.end,
        notes: inputForm.notes
      });  
      
      navigate('/');
      dispatch(onEventModalClose());
    }  

    const oncloseEdit = () => {

      navigate('/');
      dispatch(onEventModalClose());

    }

  return (
    <div className="container">
        <div className="col-12 mb-2">
          <i onClick={oncloseEdit} class="bi bi-x-circle h1"></i>
        </div>
        <form onSubmit={onSubmit} action="">
            <div className="col-12 mb-3">
                <label className="form-label">Titulo</label>
                <input className="form-control" type="text" placeholder="Junta con producción" name="title" onChange={onInputChange} value={inputForm.title} />
            </div>
            <div className="col-12 mb-3">
                <label className="form-label">Fecha inicio</label>
                <ReactDatePicker showTimeSelect dateFormat={'Pp'} className="form-control" selected={inputForm.start} onChange={(event) => onDateChange(event,'start') } />
            </div>
            <div className="col-12 mb-3">
                <label className="form-label">Fecha final</label>
                <ReactDatePicker minDate={inputForm.start} showTimeSelect dateFormat={'Pp'} className="form-control" selected={inputForm.end} onChange={(event) => onDateChange(event,'end')} />
            </div>
            <div className="col-12 mb-3">
                <label className="form-label">Notas</label>
                <textarea name="notes" className="form-control" onChange={onInputChange} value={inputForm.notes}></textarea>
            </div>
            <div className="col-12">
                <button className="btn btn-outline-primary">Guardar</button>
            </div>
        </form>
    </div>
  )
}