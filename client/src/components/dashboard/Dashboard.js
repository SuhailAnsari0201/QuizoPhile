import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import { startExam } from "../../_actions/exam";

const Dashboard = ({ startExam, examStarted, history }) => {
  const [formData, setFormData] = useState({
    exam_code: "",
    passkey: "",
  });
  const { exam_code, passkey } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("startExam");
    startExam({ exam_code, passkey, history });
  };
  // Redirect if Exam (Test) is Active.
  if (examStarted) {
    return <Redirect to="/play-quiz/quizinstruction" />;
  }
  return (
    <Fragment>
      <div className="container-fluid form-groups">
        <h2> Start Exam </h2>
        {/* <div style={{ border- radius: "-5"+ px;}}>// */}

        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group controlId="examFormExamCode">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              name="exam_code"
              value={exam_code}
              placeholder="Enter Exam Code"
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>

          <Form.Group controlId="examFormExamPasskey">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="passkey"
              name="passkey"
              value={passkey}
              placeholder="Enter Passkey"
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Start Exam
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};
Dashboard.prototype = {
  startExam: PropTypes.func.isRequired,
  examStarted: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  examStarted: state.exam.examStarted,
});
export default connect(mapStateToProps, { startExam })(withRouter(Dashboard));
