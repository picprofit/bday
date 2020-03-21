import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import DatePicker from "react-datepicker";

import { calculateAge } from "../helpers";
import { ICard } from "../interfaces";

interface ICardForm extends ICard {
  error: string;
  button: string;
  saveCard(cardData: ICard): void;
}

const CardForm: React.FC<ICardForm> = ( props ) => {
  const { age = 0, birthday, name, from, text, error, saveCard, button } = props;
  const [cardData, setCardData] = useState<ICard>({
    age,
    birthday,
    name,
    from,
    text
  });

  useEffect(() => {
    setCardData({
      ...cardData,
      age: calculateAge(birthday)
    });
  }, [birthday]);

  const inputHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setCardData({
        ...cardData,
        [name]: value
    });
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    saveCard(cardData);
  };

  const errorBlock =
      error.length > 0 ? (
      <div className="alert alert-warning">{error}</div>
    ) : null;

  return (
    <>
      <form onSubmit={(e: FormEvent) => submitHandler(e)} className="text-left">
        <div className="form-group form-inline">
          <label htmlFor="datePicker">Select the birthday date</label>
          <DatePicker
            onChange={(selectedDate: Date) => {
              setCardData({
                ...cardData,
                birthday: selectedDate
              });
            }}
            selected={cardData.birthday}
            placeholderText="Click to select (your) birthday date"
            withPortal
            showYearDropdown
            scrollableYearDropdown
            showMonthDropdown
            dropdownMode="select"
            id="datePicker"
            className="datePicker"
          >
            <div style={{ color: "green" }}>Select (your) birthday date!</div>
          </DatePicker>
        </div>
        <div className="form-group">
          <label htmlFor="nameInput">To</label>
          <input
            type="text"
            id="nameInput"
            placeholder="Name"
            defaultValue={cardData.name}
            name="name"
            className="form-control"
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nameInput">From</label>
          <input
            type="text"
            id="nameInput"
            placeholder="Name"
            defaultValue={cardData.from}
            name="from"
            className="form-control"
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="textInput">Text</label>
          <textarea
            id="textInput"
            cols={30}
            rows={10}
            placeholder="Text"
            className="form-control"
            name="text"
            onChange={inputHandler}
            value={cardData.text}
          />
        </div>
        <input type="submit" value={button} className="btn btn-primary" />
      </form>
      {errorBlock}
    </>
  );
};

export default CardForm;
