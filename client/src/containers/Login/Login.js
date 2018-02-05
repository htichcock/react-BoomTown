import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import ValidatedTextField from '../../components/ValidatedTextField';

import './styles.css';
import logo from '../../images/boomtown-logo.svg';
import bottomLeft from '../../images/home-bl.svg';
import topRight from '../../images/home-tr.svg';

const Login = ({
    login,
    handleEmailChange,
    handlePassChange,
    passwordValue,
    emailValue,
    passwordErr,
    emailErr
}) => (
    <div className="page login">
        <div
            ref={div => {
                this.overflowFix = div;
                if (this.overflowFix) {
                    this.overflowFix.innerHTML = `<style> @media screen and (min-height: 400px) {
                    body { overflow: hidden }
                    } </style> `;
                }
            }}
        />
        <div className="logo">
            <img src={logo} alt="Boomtown Logo" />
        </div>
        <div className="topRight">
            <img src={topRight} alt="Sky" />
        </div>
        <div className="bottomLeft">
            <img src={bottomLeft} alt="City" />
        </div>
        <div className="cardContainer">
            <Paper zDepth={5}>
                <div className="formContainer">
                    <form
                        onSubmit={ev => {
                            ev.preventDefault();
                            login();
                        }}
                        autoComplete="off"
                    >
                        <div>
                            <ValidatedTextField
                                label="Email"
                                handleChange={handleEmailChange}
                                value={emailValue}
                                type="email"
                                error={emailErr}
                            />
                        </div>
                        <div>
                            <ValidatedTextField
                                label="Password"
                                handleChange={handlePassChange}
                                type="password"
                                value={passwordValue}
                                error={passwordErr}
                            />
                        </div>
                        <RaisedButton
                            className="enterButton"
                            primary
                            fullWidth
                            type="submit"
                        >
                            Enter
                        </RaisedButton>
                    </form>
                </div>
            </Paper>
        </div>
    </div>
);

Login.propTypes = {
    login: PropTypes.func.isRequired
};

export default Login;
