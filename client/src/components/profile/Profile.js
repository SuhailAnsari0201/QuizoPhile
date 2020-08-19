import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../_actions/profile";
import { Spinner, Form } from "react-bootstrap";

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  // const [formData, setFormData] = useState({
  //   website: "",
  //   location: "",
  //   skills: "",
  //   bio: "",
  //   school: "",
  //   fieldofstudy: "",
  //   passingyear: "",
  //   description: "",
  //   degree: "",
  //   twitter: "",
  //   facebook: "",
  //   linkedin: "",
  //   youtube: "",
  //   instagram: "",
  // });
  //const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    // profile !== null &&
    //   setFormData({
    //     website: loading || !profile.website ? "" : profile.website,
    //     skills: loading || !profile.skills ? "" : profile.skills.join(","),
    //     location: loading || !profile.location ? "" : profile.location,
    //     bio: loading || !profile.bio ? "" : profile.bio,
    //     school: loading || !profile.education ? "" : profile.education.school,
    //     degree: loading || !profile.education ? "" : profile.education.degree,
    //     fieldofstudy:
    //       loading || !profile.education ? "" : profile.education.fieldofstudy,
    //     passingyear:
    //       loading || !profile.education ? "" : profile.education.passingyear,
    //     description:
    //       loading || !profile.education ? "" : profile.education.description,

    //     twitter: loading || !profile.social ? "" : profile.social.twitter,
    //     facebook: loading || !profile.social ? "" : profile.social.facebook,
    //     linkedin: loading || !profile.social ? "" : profile.social.linkedin,
    //     youtube: loading || !profile.social ? "" : profile.social.youtube,
    //     instagram: loading || !profile.social ? "" : profile.social.instagram,
    //   });
  }, [loading, getCurrentProfile]);
  // const {
  //   website,
  //   location,
  //   skills,
  //   bio,
  //   school,
  //   fieldofstudy,
  //   passingyear,
  //   description,
  //   degree,
  //   twitter,
  //   facebook,
  //   linkedin,
  //   youtube,
  //   instagram,
  // } = formData;

  return loading && profile === null ? (
    <Spinner />
  ) : user !== null && profile !== null ? (
    <Fragment>
      <h2>Profile</h2>
      <div className="container-fluid form-groups">
        <Form>
          <Form.Group controlId="profileFormName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control readOnly defaultValue={user.name} />
          </Form.Group>
          <Form.Group controlId="profileFormEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" readOnly defaultValue={user.email} />
          </Form.Group>
          <Form.Group controlId="profileFormMobile">
            <Form.Label>Mobile number</Form.Label>
            <Form.Control readOnly defaultValue={user.mobile} />
          </Form.Group>
          <Form.Group controlId="profileFormDOJ">
            <Form.Label>Date Of Joining</Form.Label>
            <Form.Control readOnly defaultValue={user.doj} />
          </Form.Group>
          <Form.Group controlId="profileFormWebsite">
            <Form.Label>Website</Form.Label>
            <Form.Control readOnly defaultValue={profile.website} />
          </Form.Group>
          <Form.Group controlId="profileFormLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control readOnly defaultValue={profile.location} />
          </Form.Group>
          <Form.Group controlId="profileFormSkills">
            <Form.Label>Skills</Form.Label>
            <Form.Control readOnly defaultValue={profile.skills.join(",")} />
          </Form.Group>
          <Form.Group controlId="profileFormbio">
            <Form.Label>Bio</Form.Label>
            <Form.Control readOnly defaultValue={profile.bio} />
          </Form.Group>
          {/* <Form.Group controlId="profileFormSchool">
            <Form.Label>School</Form.Label>
            <Form.Control readOnly defaultValue={profile.education.school} />
          </Form.Group>
          <Form.Group controlId="profileFormFiledofstudy">
            <Form.Label>Field Of Study</Form.Label>
            <Form.Control
              readOnly
              defaultValue={profile.education.fieldofstudy}
            />
          </Form.Group>
          <Form.Group controlId="profileFormPassingyear">
            <Form.Label>Passing Year</Form.Label>
            <Form.Control
              readOnly
              defaultValue={profile.education.passingyear}
            />
          </Form.Group>
          <Form.Group controlId="profileFormDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              readOnly
              defaultValue={profile.education.description}
            />
          </Form.Group>
          <Form.Group controlId="profileFormDegree">
            <Form.Label>Degree</Form.Label>
            <Form.Control readOnly defaultValue={profile.education.degree} />
          </Form.Group> */}

          <Form.Group controlId="profileFormTwitter">
            <Form.Label>
              <i className="fab fa-twitter fa-2x"></i> Twitter
            </Form.Label>
            <Form.Control readOnly defaultValue={profile.social.twitter} />
          </Form.Group>

          <Form.Group controlId="profileFormFacebook">
            <Form.Label>
              <i className="fab fa-facebook fa-2x"></i> Facebook
            </Form.Label>
            <Form.Control
              className="ml-2"
              readOnly
              defaultValue={profile.social.facebook}
            />
          </Form.Group>
          <Form.Group controlId="profileFormYoutube">
            <Form.Label>
              <i className="fab fa-youtube fa-2x"></i> Youtube
            </Form.Label>
            <Form.Control readOnly defaultValue={profile.social.youtube} />
          </Form.Group>
          <Form.Group controlId="profileFormLinkedin">
            <Form.Label>
              <i className="fab fa-linkedin fa-2x"></i> LinkedIn
            </Form.Label>
            <Form.Control readOnly defaultValue={profile.social.linkedin} />
          </Form.Group>
          <Form.Group controlId="profileFormInstagram">
            <Form.Label>
              <i className="fab fa-instagram fa-2x"></i> Instagram
            </Form.Label>
            <Form.Control readOnly defaultValue={profile.social.instagram} />
          </Form.Group>
          <Link to="/edit-profile" className="btn btn-success">
            <i className="fas fa-user-circle text-primary"></i> Edit Profile
          </Link>
        </Form>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <p>You have not yet setup a profile add some info</p>
      <Link to="/create-profile" className="btn btn-primary my-1">
        Create Profile
      </Link>
    </Fragment>
  );
};
Profile.prototype = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
//create and update profile is on working
