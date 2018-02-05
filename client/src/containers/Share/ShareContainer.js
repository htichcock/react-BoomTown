import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
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
            imageErr: '',
            titleErr: '',
            descriptionErr: '',
            tagsErr: '',
            genErr: '',
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
        this.handleDescriptionErr = this.handleDescriptionErr.bind(this);
        this.handleTitleErr = this.handleTitleErr.bind(this);
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
    handleDescriptionErr = message => {
        this.setState({ descriptionErr: message });
    };
    handleTitleErr = message => {
        this.setState({ titleErr: message });
    };
    handleImage = image => {
        if (!image) return;
        const uploadTask = this.firebaseStorage
            .ref()
            .child(`images/${image.name}`)
            .put(image);

        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress =
                    snapshot.bytesTransferred / snapshot.totalBytes;
                this.setState({ uploadProgress: progress * 100 });
            },
            error => {
                this.setState({ imageErr: error.message });
            },
            () => {
                this.handleNext();
                this.setState({
                    newItemPreview: {
                        ...this.state.newItemPreview,
                        imageurl: uploadTask.snapshot.downloadURL
                    },
                    imageErr: '',
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
            },
            titleErr: ''
        });
    };
    handleDescriptionChange = e => {
        this.setState({
            newItemPreview: {
                ...this.state.newItemPreview,
                description: e.target.value
            },
            descriptionErr: ''
        });
    };
    handleFinished = () => {
        try {
            this.props.submitItem({
                ...this.state.newItemPreview
            });
        } catch (e) {
            this.setState({
                stepIndex: 0,
                genErr: e.message
            });
            return;
        }
        this.setState({ genErr: '' });
        this.props.history.push('/');
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
                handleFinished={this.handleFinished}
                handleFilters={this.handleFilters}
                handleTitleChange={this.handleTitleChange}
                handleDescriptionChange={this.handleDescriptionChange}
                handleTitleErr={this.handleTitleErr}
                titleErr={this.state.titleErr}
                handleDescriptionErr={this.handleDescriptionErr}
                descriptionErr={this.state.descriptionErr}
                handleImage={this.handleImage}
                imageErr={this.state.imageErr}
                imageValue={this.state.imageValue}
                tagsErr={this.state.tagsErr}
                genErr={this.state.genErr}
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
const submitItem = gql`
    mutation submitItem(
        $imageurl: String
        $title: String
        $description: String
        $itemowner: ID
        $tags: [TagInput]
    ) {
        addItem(
            newItem: {
                imageurl: $imageurl
                title: $title
                description: $description
                itemowner: $itemowner
                tags: $tags
            }
        ) {
            id
        }
    }
`;

export default compose(
    graphql(fetchUser, {
        options: () => ({
            variables: { id: firebaseAuth.currentUser.uid }
        })
    }),
    graphql(submitItem, {
        props: ({ mutate }) => ({
            submitItem: item =>
                mutate({
                    variables: {
                        imageurl: item.imageurl,
                        title: item.title,
                        description: item.description,
                        tags: item.tags.map(tag => ({
                            id: tag.id
                        })),
                        itemowner: firebaseAuth.currentUser.uid
                    }
                })
        })
    })
)(ShareContainer);
