import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Share from './Share';
import { firebaseStorage, firebaseAuth } from '../../config/firebaseConfig';
import './styles.css';

class ShareContainer extends Component {
    constructor() {
        super();
        this.state = {
            uploadProgress: 0,
            stepIndex: 0,
            newItemPreview: {
                imageurl: null,
                title: '',
                description: '',
                created: Date.now(),
                itemowner: {
                    id: ' ',
                    email: ' ',
                    fullname: ' '
                },
                itemborrower: null,
                tags: []
            }
        };
        this.firebaseStorage = firebaseStorage;
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleFilters = this.handleFilters.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }
    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 3
        });
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };
    handleImage = image => {
        const uploadTask = this.firebaseStorage
            .ref()
            .child(`images/${image.name}`)
            .put(image);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            'state_changed',
            snapshot => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    snapshot.bytesTransferred / snapshot.totalBytes;
                this.setState({ uploadProgress: progress * 100 });
            },
            error => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;

                default:
                    console.log(error);
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                this.handleNext();
                this.setState({
                    newItemPreview: {
                        ...this.state.newItemPreview,
                        imageurl: uploadTask.snapshot.downloadURL
                    },
                    uploadProgress: 0
                });
            }
        );
    };
    handleFilters = values => {
        this.setState({
            newItemPreview: {
                ...this.state.newItemPreview,
                tags: values
            }
        });
    };
    handleTitleChange = e => {
        this.setState({
            newItemPreview: {
                ...this.state.newItemPreview,
                title: e.target.value
            }
        });
    };
    handleDescriptionChange = e => {
        this.setState({
            newItemPreview: {
                ...this.state.newItemPreview,
                description: e.target.value
            }
        });
    };
    render() {
        return (
            <Share
                uploadProgress={this.state.uploadProgress}
                stepIndex={this.state.stepIndex}
                handleNext={this.handleNext}
                handlePrev={this.handlePrev}
                finished={this.state.finished}
                newItemPreview={this.state.newItemPreview}
                data={this.props.data}
                handleFinished=""
                handleFilters={this.handleFilters}
                handleTitleChange={this.handleTitleChange}
                handleDescriptionChange={this.handleDescriptionChange}
                handleImage={this.handleImage}
                imageValue={this.state.imageValue}
            />
        );
    }
}

const fetchUser = gql`
    query fetchUser($id: ID) {
        user(id: $id) {
            id
            fullname
            email
        }
    }
`;

export default graphql(fetchUser, {
    options: () => ({
        variables: { id: firebaseAuth.currentUser.uid }
    })
})(ShareContainer);
