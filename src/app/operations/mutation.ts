import gql from 'graphql-tag';

export const register = gql`
    mutation addUser($user: UserInput!) {
        register(user: $user) {
            status
            message
            user {
                id
                name
                lastname
                registerDate
                email
            }
        }
    }
`;
