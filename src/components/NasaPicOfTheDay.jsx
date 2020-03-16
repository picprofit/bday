import React from 'react';
import Axios from 'axios';
import {getRandom} from '../helpers';
import PropTypes from 'prop-types';


class NasaPicOfTheDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      pic: {
        url: "",
        title: "",
        explanation: ""
      }
    };
  };

  //"Date must be between Jun 16, 1995 and Dec 04, 2018."
  oldestDate = new Date(1995, 5, 16);

  componentDidMount() {
    this.getBirthdayPic();
    this.setState({
      date: this.props.date
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.getBirthdayPic();
      this.setState({
        date: this.props.date
      });
    }
  }

  //"Date must be between Jun 16, 1995 and Dec 04, 2018."
  validDate = (date) => {
    const today = new Date().setHours(23, 59, 59);
    return (this.oldestDate <= date && date <= today);
  };

  getPicOfTheDay = (date) => {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.setState({
        date,
        pic: {
          url: "",
          title: "",
          explanation: "",
        }
      });
      if (!self.validDate(date)) {
        const error = new Error("invalid date");
        return reject(error);
      }
      //date	YYYY-MM-DD
      const apiKey = 'u6BZiUC8WyYcFuWIHLkGRZiBcZj6iPJbzK0Bh50h';
      const url = `https://api.nasa.gov/planetary/apod?date=${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}&api_key=${apiKey}`;
      Axios.request({
        url,
        method: 'get'
      }).then((response) => {
          if (response.status === 200 && response.data.media_type === 'image') {
            self.setState({
              date,
              pic: {
                url: response.data.url,
                title: response.data.title,
                explanation: response.data.explanation,
              }
            });
            resolve("pic received");
          } else {
            reject("pic receive failed");
          }
        }
      ).catch(function (error) {
        reject(error);
      });
    });
  };

  getBirthdayPic = async() => {
    const date = this.props.date;
    const today = new Date();
    const thisYearDate = new Date(today.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12);

    this.setState({
      date,
      pic: {
        url: "",
        title: "",
        explanation: "",
      }
    });

    //first, try this year and birthday date pic
    this.getPicOfTheDay(thisYearDate)
      .then(
        response => {
        },
        error => {
          //second, try pic of birthday year
          this.getPicOfTheDay(date)
            .then(
              response => {
              },
              error => {
                //last, get random pics from prev years
                let minYear = this.oldestDate.getUTCFullYear();
                if (date.getUTCFullYear() > this.oldestDate.getUTCFullYear()) {
                  minYear = date.getUTCFullYear();
                }
                const randYear = getRandom(minYear, today.getUTCFullYear() - 1);
                const randYearDate = new Date(randYear, date.getUTCMonth(), date.getUTCDate(), 12);
                this.getPicOfTheDay(randYearDate).then(
                  response => {
                  },
                  error => {
                  }
                );
              }
            );
        }
      );

  };


  render() {
    if (this.state.pic.url !== undefined && this.state.pic.url.length > 0) {
      return <React.Fragment>
        <h3>This is the pic for your birthday from NASA</h3>
        <figure className="figure">
          <img src={this.state.pic.url} alt={this.state.pic.title} title={this.state.pic.title}
               className="img-responsive"/>
          <figcaption className="figure-caption float-left">
            <blockquote className="blockquote">
              <p className="mb-0">{this.state.pic.explanation}</p>
              <footer className="blockquote-footer">
                Foto of the day for {this.state.date.getUTCDate()}/{this.state.date.getUTCMonth() + 1}/{this.state.date.getUTCFullYear()} from&nbsp;
                <cite title="National Aeronautics and Space Administration, https://www.nasa.gov/">NASA</cite>
              </footer>
            </blockquote>
          </figcaption>
        </figure>
      </React.Fragment>
    }
    return (null);
  }
}

NasaPicOfTheDay.propTypes = {
  date: PropTypes.object
};

export default NasaPicOfTheDay;