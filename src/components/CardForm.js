import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import {calculateAge} from '../helpers';

const CardForm = (props) => {
  const [state, setState] = useState(props);

//  componentDidUpdate(prevProps, prevState, snapshot) {
//    if (prevProps !== this.props) {
//      this.setState({...this.props});
//    }
//  }

  const dateHandler = birthday => {
    setState({
      calculateAge(birthday),
      birthday
    });
  };

  const inputHandler = { target } => {
    const { value, name } = target;
    setState({
      [name]: value
    });
  };

  const submitHandler = event => {
    event.preventDefault();
    const data = {
      birthday: state.birthday.getTime(),
      age: state.age,
      name: state.name,
      from: state.from,
      text: state.text
    };
    props.saveCard(data);
  };

  
    const errorBlock = state.lastError.length > 0 ? 
      errorBlock = <div className='alert alert-warning'>
        {this.state.lastError}
      </div> : null;
    
    return <>
      <form onSubmit={submitHandler} className="text-left">
        <div className="form-group form-inline">
          <label htmlFor="datePicker">Select the birthday date</label>
          <DatePicker onChange={dateHandler} selected={state.birthday}
                      placeholderText="Click to select (your) birthday date" withPortal
                      showYearDropdown scrollableYearDropdown showMonthDropdown
                      dropdownMode="select" id="datePicker" className="datePicker">
            <div style={{color: 'green'}}>Select (your) birthday date!</div>
          </DatePicker>
        </div>
        <div className="form-group">
          <label htmlFor="nameInput">To</label>
          <input type="text" id="nameInput" placeholder="Name" defaultValue={state.name}
                 name="name" className="form-control" onChange={inputHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="nameInput">From</label>
          <input type="text" id="nameInput" placeholder="Name" defaultValue={state.from}
                 name="from" className="form-control" onChange={inputHandler}}/>
        </div>
        <div className="form-group">
          <label htmlFor="textInput">Text</label>
          <textarea id="textInput" cols="30" rows="10" placeholder="Text" className="form-control"
                    name="text" onChange={inputHandler} value={state.text}/>
        </div>
        <input type="submit" value={props.button} className="btn btn-primary"/>
      </form>
      {errorBlock}
    </>;
 
}

export default CardForm;