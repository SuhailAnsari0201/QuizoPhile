import React from "react";
import { Route, Switch } from "react-router-dom";

import LoginPage from "../auth/Login/Login";
import Register_SendOTP from "../auth/Signup/Register";
import Signup_VerifyOTP from "../auth/Signup/VerifyOTP";
import ForgotPassword from "../forgatePass/ForgotPassword";
import ResetPassword from "../forgatePass/ResetPassword";

import LoginAdmin from "../auth/Login/AdminLogin";

import Dashboard from "../dashboard/Dashboard";
import Profile from "../profile/Profile";
import CreateProfile from "../profile/CreateProfile";
import EditProfile from "../profile/EditProfile";
import CreateExam from "../exam/create-quiz/CreateExam";
import PlayQuiz from "../exam/play-quiz/PlayQuiz";
import PlayQuiz1 from "../exam/play-quiz/PlayQuiz1";
import NotFound from "../layout/NotFound";

import PrivateRoute from "../routing/PrivateRoute";
import AdminRoute from "../routing/AdminRoute";
import Alert from "../layout/Alert";
import QuizSummary from "../exam/QuizSummary";
import QuizInstructions from "../exam/play-quiz/QuizInstructions";
import AdminDashboard from "../dashboard/AdminDashboard";

const Routes = () => {
  return (
    <section className="container my-4">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register_SendOTP} />
        <Route exact path="/verifyotp" component={Signup_VerifyOTP} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/resetPassword/:token" component={ResetPassword} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/play-quiz" component={PlayQuiz1} />
        <PrivateRoute
          exact
          path="/play-quiz/quizinstruction"
          component={QuizInstructions}
        />
        <PrivateRoute
          exact
          path="/play-quiz/quizsummary"
          component={QuizSummary}
        />

        <Route exact path="/login-admin" component={LoginAdmin} />
        <AdminRoute exact path="/admin-dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/create-exam" component={CreateExam} />
        {/* 
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/posts/:i7d" component={Post} />*/}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};
export default Routes;
