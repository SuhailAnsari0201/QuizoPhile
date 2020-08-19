import React, { useState, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../_actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    website: "",
    location: "",
    skills: "",
    bio: "",
    dob: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    website,
    location,
    skills,
    bio,
    dob,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h2>Add Profile</h2>

      <div className="container-fluid form-groups">
        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group controlId="profileFormWebsite">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="website"
              name="website"
              onChange={(e) => onChange(e)}
              value={website}
            />
          </Form.Group>
          <Form.Group controlId="profileFormLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="location"
              name="location"
              onChange={(e) => onChange(e)}
              value={location}
            />
          </Form.Group>
          <Form.Group controlId="profileFormSkills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              placeholder="skills"
              name="skills"
              onChange={(e) => onChange(e)}
              value={skills}
            />
          </Form.Group>
          <Form.Group controlId="profileFormbio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              placeholder="bio"
              name="bio"
              onChange={(e) => onChange(e)}
              value={bio}
            />
          </Form.Group>
          <Form.Group controlId="profileFormdob">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              type="date"
              placeholder="dob"
              name="dob"
              onChange={(e) => onChange(e)}
              value={dob}
            />
          </Form.Group>

          <div className="my-2">
            <Button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              varient="light"
            >
              Add Social Network Links
            </Button>
            <span>Optional</span>
          </div>
          {displaySocialInputs && (
            <Fragment>
              <Form.Group controlId="profileFormTwitter">
                <Form.Label>
                  <i className="fab fa-twitter fa-2x"></i> Twitter
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="profileFormFacebook">
                <Form.Label>
                  <i className="fab fa-facebook fa-2x"></i> Facebook
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="profileFormYoutube">
                <Form.Label>
                  <i className="fab fa-youtube fa-2x"></i> Youtube
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="profileFormLinkedin">
                <Form.Label>
                  <i className="fab fa-linkedin fa-2x"></i> LinkedIn
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="profileFormInstagram">
                <Form.Label>
                  <i className="fab fa-instagram fa-2x"></i> Instagram
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
            </Fragment>
          )}
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </Form>
      </div>
    </Fragment>
  );
};
CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
