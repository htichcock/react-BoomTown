import React from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

const Share = ({ stepIndex, handleNext, handlePrev, finished }) => (
    <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
                <StepLabel>Select campaign settings</StepLabel>
                <StepContent>
                    <p>
                        For each ad campaign that you create, you can control
                        how much you're willing to spend on clicks and
                        conversions, which networks and geographical locations
                        you want your ads to show on, and more.
                    </p>
                    <div style={{ margin: '12px 0' }}>
                        <RaisedButton
                            label={stepIndex === 2 ? 'Finish' : 'Next'}
                            disableTouchRipple
                            disableFocusRipple
                            primary
                            onClick={handleNext}
                            style={{ marginRight: 12 }}
                        />

                        <RaisedButton
                            label="Back"
                            disabled={stepIndex === 0}
                            disableTouchRipple
                            disableFocusRipple
                            onClick={handlePrev}
                        />
                    </div>
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Create an ad group</StepLabel>
                <StepContent>
                    <p>
                        An ad group contains one or more ads which target a
                        shared set of keywords.
                    </p>
                    <div style={{ margin: '12px 0' }}>
                        <RaisedButton
                            label={stepIndex === 2 ? 'Finish' : 'Next'}
                            disableTouchRipple
                            disableFocusRipple
                            primary
                            onClick={this.handleNext}
                            style={{ marginRight: 12 }}
                        />

                        <RaisedButton
                            label="Back"
                            disabled={stepIndex === 0}
                            disableTouchRipple
                            disableFocusRipple
                            onClick={this.handlePrev}
                        />
                    </div>
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Create an ad</StepLabel>
                <StepContent>
                    <p>
                        Try out different ad text to see what brings in the most
                        customers, and learn how to enhance your ads using
                        features like ad extensions. If you run into any
                        problems with your ads, find out how to tell if they're
                        running and how to resolve approval issues.
                    </p>
                    <div style={{ margin: '12px 0' }}>
                        <RaisedButton
                            label={stepIndex === 2 ? 'Finish' : 'Next'}
                            disableTouchRipple
                            disableFocusRipple
                            primary
                            onClick={this.handleNext}
                            style={{ marginRight: 12 }}
                        />

                        <RaisedButton
                            label="Back"
                            disabled={stepIndex === 0}
                            disableTouchRipple
                            disableFocusRipple
                            onClick={this.handlePrev}
                        />
                    </div>
                </StepContent>
            </Step>
        </Stepper>
        {finished && (
            <p style={{ margin: '20px 0', textAlign: 'center' }}>
                <a
                    href="#"
                    onClick={event => {
                        event.preventDefault();
                        this.setState({ stepIndex: 0, finished: false });
                    }}
                >
                    Click here
                </a>{' '}
                to reset the example.
            </p>
        )}
    </div>
);

export default Share;
