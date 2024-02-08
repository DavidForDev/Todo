const accountSchema = `
  type User {
    _id: ID!
    email: String!
    userName: String!
    password: String
    token: String
    tasks: [Task]
  }

  input CreateAccountInput {
    email: String!
    password: String
    userName: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ChangePasswordInput {
    password: String
    repeatPassword: String!
    token: String!
  }

  input ChangeEmailInput {
    _id: ID!
    newEmail: String!
  }

  input ChangeUserNameInput {
    newUserName: String!
    _id: ID!
  }

  input ChangeProfileInput {
    newUserName: String
    newEmail: String
    newPassword: String
    userId: String
  }
`;

const accountQuerySchema = `
  getUser(userId: String!): User
  loginUser(loginInput: LoginInput): User
`;

const accountMutationSchema = `
  createAccount(createAccountInput: CreateAccountInput): User
  removeAccount(accountId: String!): Boolean
  forgotPassword(email: String!): Boolean
  
  changePassword(changePasswordInput: ChangePasswordInput): Boolean
  changeEmail(changeEmailInput: ChangeEmailInput ): User
  changeUserName(changeUserNameInput: ChangeUserNameInput): User

  changeProfile(changeProfileInput: ChangeProfileInput): User
`;

exports.accountSchema = accountSchema;
exports.accountQuerySchema = accountQuerySchema;
exports.accountMutationSchema = accountMutationSchema;
