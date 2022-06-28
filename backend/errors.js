module.exports = {
    UserCreationError : class UserCreationError extends Error {
        constructor(params) {

            super(params);
        
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, UserCreationError);
            }
        
            this.name = 'Failed to create the user';
            this.id = 0;
          }
    },
    UserExistsError: class UserExistsError extends Error {
        constructor(params) {

            super(params);
        
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, UserExistsError);
            }
        
            this.name = 'User already exists!';
            this.id = 1;
          }
    },
    LoginUserError: class LoginUserError extends Error {
      constructor(params) {

        super(params);
    
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, LoginUserError);
        }
    
        this.name = 'Login user error. Invalid credentials or the user does not exists!';
        this.id = 2;
      }
    },
    CreateSessionError: class CreateSessionError extends Error {
      constructor(params) {

        super(params);
    
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, CreateSessionError);
        }
    
        this.name = 'CreateSessionError';
        this.id = 3;
      }
    },
    NotAuthenticatedError: class NotAuthenticatedError extends Error {
      constructor(params) {

        super(params);
    
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, NotAuthenticatedError);
        }
    
        this.name = 'NotAuthenticatedError';
        this.id = 4;
      }
    },
    SessionExpiredError: class SessionExpiredError extends Error {
      constructor(params) {

        super(params);
    
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, SessionExpiredError);
        }
    
        this.name = 'SessionExpiredError';
        this.id = 5;
      }
    },
    InvalidRequestError: class InvalidRequestError extends Error {
      constructor(params) {

        super(params);
    
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, InvalidRequestError);
        }
    
        this.name = 'InvalidRequestError';
        this.id = 6;
      }
    }
}