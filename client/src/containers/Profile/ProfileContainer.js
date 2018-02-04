import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Profile from './Profile';
import NotFound from '../../components/NotFound';

const ProfileContainer = ({ data }) => {
    if (data.loading || (data.user && data.user.id)) {
        return <Profile user={data.user} isLoading={data.loading} />;
    }
    return <NotFound />;
};

const fetchUser = gql`
    query fetchUser($id: ID) {
        user(id: $id) {
            id
            fullname
            email
            shareditems {
                id
                title
                description
                itemowner {
                    id
                    fullname
                    email
                }
                borrower {
                    id
                    fullname
                }
                imageurl
                created
                tags {
                    id
                    title
                }
            }
        }
    }
`;

export default graphql(fetchUser, {
    options: ({ match }) => ({ variables: { id: match.params.userId } })
})(ProfileContainer);
