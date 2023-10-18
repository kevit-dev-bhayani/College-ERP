const USER_ERROR_CODES = {
	UNAUTHENTICATED: 'Invalid Credentials',
	USERS_NOT_FOUND: 'No users found',
	USER_NOT_FOUND: 'User not found for phone_no id',
	USER_ID_NOT_FOUND: 'User Id not found',
	CREATE_USER_UNHANDLED_IN_DB: 'Something went wrong while creating new user',
	PHONE_NO_OR_PASSWORD_NOT_FOUND: 'phone_no or Password not present.',
};

export default USER_ERROR_CODES;
