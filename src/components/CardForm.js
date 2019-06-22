import React from 'react';
import DatePicker from 'react-datepicker';
import {calculateAge} from '../helpers';

class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...this.props};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({...this.props});
    }
  }

  dateHandler = birthday => {
    const age = calculateAge(birthday);
    this.setState({
      age,
      birthday
    });
  };

  inputHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const data = {
      birthday: this.state.birthday.getTime(),
      age: this.state.age,
      name: this.state.name,
      from: this.state.from,
      text: this.state.text
    };
    this.props.saveCard(data);
  };

  render() {
    let errorBlock = '';
    if(this.state.lastError.length > 0) {
      errorBlock = <div className='alert alert-warning'>
        {this.state.lastError}
      </div>;
    }
    return <React.Fragment>
      <form onSubmit={this.submitHandler} className="text-left">
        <div className="form-group form-inline">
          <label htmlFor="datePicker">Select the birthday date</label>
          <DatePicker onChange={this.dateHandler} selected={this.state.birthday}
                      placeholderText="Click to select (your) birthday date" withPortal
                      showYearDropdown scrollableYearDropdown showMonthDropdown
                      dropdownMode="select" id="datePicker" className="datePicker">
            <div style={{color: 'green'}}>Select (your) birthday date!</div>
          </DatePicker>
        </div>
        <div className="form-group">
          <label htmlFor="nameInput">To</label>
          <input type="text" id="nameInput" placeholder="Name" defaultValue={this.state.name}
                 name="name" className="form-control" onChange={this.inputHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="nameInput">From</label>
          <input type="text" id="nameInput" placeholder="Name" defaultValue={this.state.from}
                 name="from" className="form-control" onChange={this.inputHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="textInput">Text</label>
          <textarea id="textInput" cols="30" rows="10" placeholder="Text" className="form-control"
                    name="text" onChange={this.inputHandler} value={this.state.text}/>
        </div>
        <input type="submit" value={this.props.button} className="btn btn-primary"/>
      </form>
      {errorBlock}
    </React.Fragment>;
  }
}

export default CardForm;