import gql from 'graphql-tag';

export const registerData = gql`
    mutation addUser($user: UserInput!) {
        register(user: $user) {
            status
            message
            user {
                id
                name
                lastname
                email
                registerDate
            }
        }
    }
`;

export const resetPwd = gql`
    mutation resetPwd($id: String!, $token: String!, $newPassword: String!) {
        changePassword(id: $id, token: $token, newPassword: $newPassword)
    }
`;
