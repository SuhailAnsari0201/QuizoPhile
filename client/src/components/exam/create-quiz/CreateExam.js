import React, { useState, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createExam } from "../../../_actions/exam";

const CreateExam = ({ createExam, history }) => {
  const [formData, setFormData] = useState({
    exam_name: "",
    exam_code: "",
    exam_passkey: "",
    expire_time: "",
  });
  const [questions, setQuestion] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [opt4, setOpt4] = useState("");
  const [correct_option, setCorrectOption] = useState("");

  const { exam_code, exam_name, exam_passkey, expire_time } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = (e) => {
    e.preventDefault();
    setQuestion([
      ...questions,
      {
        title: title,
        content: content,
        opt1: opt1,
        opt2: opt2,
        opt3: opt3,
        opt4: opt4,
        correct_option: correct_option,
      },
    ]);
    createExam(exam_code, exam_name, exam_passkey, expire_time, questions);
  };

  // const addQuestion = (e) => {
  //   e.preventDefault();

  // };
  return (
    <Fragment>
      <div className=" container-fluid form-groups">
        <h2> Login Page </h2>
        {/* <div style={{ border- radius: "-5"+ px;}}>// */}

        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group controlId="exam_nameForExam">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              name="exam_name"
              value={exam_name}
              placeholder="Enter exam name"
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>

          <Form.Group controlId="exam_codeForExam">
            <Form.Label>exam code</Form.Label>
            <Form.Control
              type="text"
              name="exam_code"
              value={exam_code}
              placeholder="exam_code"
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group controlId="exam_passkeyForExam">
            <Form.Label>exam passkey</Form.Label>
            <Form.Control
              type="text"
              name="exam_passkey"
              value={exam_passkey}
              placeholder="exam_passkey"
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group controlId="expire_timeForExam">
            <Form.Label>expire_time</Form.Label>
            <Form.Control
              type="date"
              name="expire_time"
              value={expire_time}
              placeholder="expire_time"
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group controlId="titleForQuestion">
            <Form.Label>Question title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              placeholder="Question Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="contentForQuestion">
            <Form.Label>Question Content</Form.Label>
            <Form.Control
              type="text"
              name="content"
              value={content}
              placeholder="Question Content"
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="opt1ForQuestion">
            <Form.Label>opt 1</Form.Label>
            <Form.Control
              type="text"
              name="opt1"
              value={opt1}
              placeholder="Option 1"
              onChange={(e) => setOpt1(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="opt2ForQuestion">
            <Form.Label>opt2</Form.Label>
            <Form.Control
              type="text"
              name="opt2"
              value={opt2}
              placeholder="Option 2"
              onChange={(e) => setOpt2(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="opt3ForQuestion">
            <Form.Label>opt3</Form.Label>
            <Form.Control
              type="text"
              name="opt3"
              value={opt3}
              placeholder="Option 3"
              onChange={(e) => setOpt3(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="opt4ForQuestion">
            <Form.Label>opt4</Form.Label>
            <Form.Control
              type="text"
              name="opt4"
              value={opt4}
              placeholder="Option 4"
              onChange={(e) => setOpt4(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="correct_optionForQuestion">
            <Form.Label>correct_option</Form.Label>
            <Form.Control
              type="text"
              name="correct_option"
              value={correct_option}
              placeholder="Option 4"
              onChange={(e) => setCorrectOption(e.target.value)}
              required
            />
          </Form.Group>
          {/* <div>
            <Form onSubmit={(e) => addQuestion(e)}>
             
              <Button variant="primary" type="button">
                save
              </Button>
            </Form>
          </div> */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <br />
      </div>
    </Fragment>
  );
};
CreateExam.propTypes = {
  createExam: PropTypes.func.isRequired,
};
export default connect(null, { createExam })(withRouter(CreateExam));
