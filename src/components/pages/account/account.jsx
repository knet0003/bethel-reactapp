import React from "react";
import "./account.css";
import profile from "../../../profile.png";
import { getProfile, saveProfile } from "../../../services/authService";
import Joi from "joi-browser";
import Form from "../../common/form";
import countryList from "react-select-country-list";

class Account extends Form {
  state = {
    data: {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      country: "",
      country_code: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    fname: Joi.string().required().label("First Name"),
    lname: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    phone: Joi.number().required().label("Phone"),
    country: Joi.string().required().label("Country"),
    country_code: Joi.number().required().label("Country code"),
  };

  async componentDidMount() {
    await this.populateProfile();
    console.log("mounted");
  }

  async populateProfile() {
    try {
      const { data: profile } = await getProfile();
      this.setState({ data: this.mapToViewModel(profile) });
      this.setState({ email: localStorage.getItem("email") });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  doSubmit = async () => {
    await saveProfile(this.state.data);
    console.log("save");
  };

  mapToViewModel(profile) {
    return {
      fname: profile.first_name,
      lname: profile.last_name,
      phone: profile.phone,
      country: profile.country,
      country_code: profile.country_code,
    };
  }

  render() {
    const options = countryList().getData();
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="cardContainer">
          <h3 className="title"> Profile </h3>

          <img src={profile} alt="avatar" className="avatar" />
          <div className="contain">
            <div className="column">
              {this.renderInput("fname", "First name", "60px")}

              <br />
              {this.renderSelect("country", "Country", options)}
              <br />
              {this.renderInput("email", "Email", "60px")}
            </div>

            <br />
            {/* {this.renderSelect("lname", "Last name", this.state.providers)} */}
            <div className="column">
              {this.renderInput("lname", "Last name", "60px")}
              <br />
              {this.renderInput("country_code", "Country Code", "60px")}
              <br />
              {this.renderInput("phone", "Phone", "60px")}
              <br />
            </div>
          </div>
          <br />
          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default Account;
