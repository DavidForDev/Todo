const accountSchema = `
#user / Registration / Authorization =========
type User {
    _id: String
    username: String!
    email: String
    collections: [Collection!]!
    token: String
    password: String
    alert: ActionMessage
}

# ====== sign in/up Account
input CreateUser {
    username: String!
    email: String!
    password: String!
}
input LoginUser { 
    email: String!
    password: String!
}

# ====== forgot / recovery / change password
input RecoveryPasswordInput {
    token: String!
    newPassword: String!
    confirmPassword: String!
}
input ChangePasswordInput {
    userId: String!
    newPassword: String!
}

# ====== change the username || email
input ChangeUserNameInput {
    userId: String!
    newUserName: String!
}

input ChangeEmailInput {
    userId: String!
    newEmail: String!
}

`;

const accountRootMutation = `
createUser(createInput: CreateUser): User
forgotPassword(email: String!): User
recoveryPassword(recoveryInput: RecoveryPasswordInput): User
changePassword(changePasswordInput: ChangePasswordInput): User
changeUserName(changeUserNameInput: ChangeUserNameInput): User
changeUserEmail(changeEmailInput: ChangeEmailInput): User
removeAccount(userId: String!): User
`;

const accountRootQuery = `
users: [User!]! 
exactlyUser(id: String!): User
loginUser(loginInput: LoginUser): User
`;

exports.accountSchema = accountSchema;
exports.accountRootMutation = accountRootMutation;
exports.accountRootQuery = accountRootQuery;
