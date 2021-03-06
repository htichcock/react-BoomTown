import React from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';

import LinearProgress from 'material-ui/LinearProgress';

import RaisedButton from 'material-ui/RaisedButton';
import Filter from '../../components/Filter';
import ItemCard from '../../components/ItemCard';
import ValidatedTextField from '../../components/ValidatedTextField';

const Share = ({
    stepIndex,
    handleNext,
    handlePrev,
    handleFinished,
    handleImage,
    newItemPreview,
    handleTitleChange,
    handleDescriptionChange,
    handleDescriptionErr,
    handleTitleErr,
    titleErr,
    descriptionErr,
    data,
    uploadProgress,
    handleFilters,
    imageErr,
    tagsErr,
    genErr
}) => (
    <div className="share-container">
        <div className="card-preview-wrapper">
            {data.loading ? (
                <ItemCard item={newItemPreview} />
            ) : (
                <div className="card-preview">
                    <ItemCard
                        item={{
                            ...newItemPreview,
                            itemowner: {
                                id: data.user.id,
                                email: data.user.email,
                                fullname: data.user.fullname
                            }
                        }}
                    />
                </div>
            )}
        </div>
        <div style={{ margin: '4.5% auto auto 0' }}>
            <Stepper activeStep={stepIndex} orientation="vertical">
                <Step>
                    <StepLabel>Add an Image</StepLabel>
                    <StepContent>
                        <p>
                            {`We live in a visual culture. Upload an image of the item
                        you're sharing.`}
                        </p>
                        {uploadProgress ? (
                            <LinearProgress
                                color="white"
                                mode="determinate"
                                value={uploadProgress}
                            />
                        ) : (
                            <div style={{ margin: '12px 0' }}>
                                <RaisedButton
                                    label="Select an Image"
                                    containerElement="label"
                                    style={{ marginRight: 12 }}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => {
                                            handleImage(e.target.files[0]);
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            position: 'absolute',
                                            top: 0,
                                            bottom: 0,
                                            right: 0,
                                            left: 0,
                                            width: '100%',
                                            zIndex: 9000,
                                            opacity: 0
                                        }}
                                    />
                                </RaisedButton>
                                <div className="errorMess">{imageErr}</div>
                            </div>
                        )}
                        <div style={{ margin: '12px 0' }}>
                            {newItemPreview.imageurl && (
                                <RaisedButton
                                    disabled={!newItemPreview.imageurl}
                                    label="Next"
                                    disableTouchRipple
                                    disableFocusRipple
                                    onClick={handleNext}
                                    style={{ marginRight: 12 }}
                                />
                            )}
                        </div>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>{'Add a Title & Description'}</StepLabel>
                    <StepContent>
                        <p>
                            {`Folks need to know what you're sharing. Give them a
                            clue by adding a title & description.`}
                        </p>
                        <div>
                            <ValidatedTextField
                                label="Title"
                                handleChange={handleTitleChange}
                                value={newItemPreview.title}
                                type="text"
                                error={titleErr}
                                floatingLabelShrinkStyle={{
                                    color: 'white'
                                }}
                            />
                        </div>
                        <div>
                            <ValidatedTextField
                                label="Description"
                                handleChange={handleDescriptionChange}
                                type="textarea"
                                rows="4"
                                floatingLabelShrinkStyle={{
                                    color: 'white'
                                }}
                                multiLine
                                value={newItemPreview.description}
                                error={descriptionErr}
                            />
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <RaisedButton
                                label="Next"
                                disableTouchRipple
                                disableFocusRipple
                                onClick={
                                    !(
                                        newItemPreview.description &&
                                        newItemPreview.title
                                    )
                                        ? () => {
                                            if (!newItemPreview.title) {
                                                handleTitleErr(
                                                    'A title is required.'
                                                );
                                            }
                                            if (!newItemPreview.description) {
                                                handleDescriptionErr(
                                                    'A description is required.'
                                                );
                                            }
                                        }
                                        : handleNext
                                }
                                style={{ marginRight: 12 }}
                            />

                            <RaisedButton
                                label="Back"
                                secondary
                                disabled={stepIndex === 0}
                                disableTouchRipple
                                disableFocusRipple
                                onClick={handlePrev}
                            />
                        </div>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Categorize Your Item</StepLabel>
                    <StepContent>
                        <p>
                            {`To share an item, you'll add it to our list of
                            categories. You can select multiple categories.`}
                        </p>
                        <Filter
                            hintText="Select Category Tags"
                            handleChange={(event, index, values) => {
                                handleFilters(values);
                            }}
                            values={newItemPreview.tags}
                        />
                        <div className="errorMess">{tagsErr}</div>
                        <div style={{ margin: '12px 0' }}>
                            <RaisedButton
                                label="Next"
                                disabled={!newItemPreview.tags.length}
                                disableTouchRipple
                                disableFocusRipple
                                onClick={handleNext}
                                style={{ marginRight: 12 }}
                            />

                            <RaisedButton
                                label="Back"
                                secondary
                                disabled={stepIndex === 0}
                                disableTouchRipple
                                disableFocusRipple
                                onClick={handlePrev}
                            />
                        </div>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Confirm Things!</StepLabel>
                    <StepContent>
                        <p>
                            {
                                "Great! If you're happy with everything, tap the button."
                            }
                        </p>
                        <div style={{ margin: '12px 0' }}>
                            <RaisedButton
                                label="Confirm"
                                disabled={
                                    !(
                                        newItemPreview.tags.length &&
                                        newItemPreview.description &&
                                        newItemPreview.title &&
                                        newItemPreview.imageurl
                                    )
                                }
                                disableTouchRipple
                                disableFocusRipple
                                onClick={handleFinished}
                                style={{ marginRight: 12 }}
                            />
                            <RaisedButton
                                label="Back"
                                secondary
                                disabled={stepIndex === 0}
                                disableTouchRipple
                                disableFocusRipple
                                onClick={handlePrev}
                            />
                        </div>
                        <div className="errorMess">{genErr}</div>
                    </StepContent>
                </Step>
            </Stepper>
        </div>
    </div>
);

export default Share;
