import React from "react";
import "./account.css";
import profile from "../../../avatar.png";
import {
  getProfile,
  savePicture,
  saveProfile,
  sendSMS,
} from "../../../services/authService";
import { getProfPicture } from "../../../services/authService";
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
      mobile_verified: "",
    },
    profile_picture: "",
    selectedFile: "",
    isFilePicked: false,
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
    const { data } = await getProfPicture();
    const { message, image_stream } = data;
    if (message === "") this.setState({ profile_picture: image_stream });
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
      email: profile.email,
      country: profile.country,
      country_code: profile.country_code,
      mobile_verified: profile.mobile_verified,
    };
  }
  changeHandler = (event) => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
    this.setState({ isSelected: true });
  };

  handleSubmission = async () => {
    console.log(this.state.selectedFile);
    await savePicture(this.state.selectedFile);
    window.location.reload(false);
  };

  sendSMS = async () => {
    const mobile = this.state.data.phone;
    const { status } = await sendSMS(mobile);
    if (status === true) {
      console.log(status);
    }
  };

  render() {
    const options = countryList().getData();
    const { selectedFile, isSelected } = this.state;
    console.log(this.state.data.mobile_verified);
    return (
      <div className="cardContainer">
        <h3 className="title"> Profile </h3>
        {this.state.profile_picture ? (
          <img
            src={`data: image/png;base64,${this.state.profile_picture}`}
            alt="avatar"
            className="avatar"
          />
        ) : (
          <img src={profile} alt="avatar" className="avatar" />
        )}
        <input type="file" name="file" onChange={this.changeHandler} />
        {isSelected ? (
          <div>
            <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button onClick={this.handleSubmission}>Submit</button>
        </div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="contain">
            <div className="column">
              {this.renderInput("fname", "First name", "60px")}

              <br />
              {this.renderSelect("country", "Country", options)}
              <br />
              {this.renderInput("email", "Email", "60px")}
            </div>

            <br />
            <div className="column">
              {this.renderInput("lname", "Last name", "60px")}
              <br />
              {this.renderInput("country_code", "Country Code", "60px")}
              <br />
              {this.renderInput("phone", "Phone", "60px")}
              {this.state.data.mobile_verified === true ? (
                <div className="alert alert-success" role="alert">
                  verified
                </div>
              ) : (
                <div className="alert alert-danger" role="alert">
                  <button className="btn btn-link" onClick={this.sendSMS}>
                    Please verify phone
                  </button>
                </div>
              )}
            </div>
          </div>
          <br />
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default Account;
