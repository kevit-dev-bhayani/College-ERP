import bcrypt = require('bcrypt');
import mongoose from 'mongoose';
import HttpException from '../../utils/error.utils';

const { Schema, model } = mongoose;
/**
 * User Schema for DB
 */
const staffSchema = new Schema({
	role: {
		type: Schema.Types.String,
		required: true,
	},
	name: {
		type: Schema.Types.String,
		required: true,
	},
	phone_no: {
		type: Schema.Types.Number,
		required: true,
		unique: true,
	},
	password: {
		type: Schema.Types.String,
		required: true,
	},

	department_init: {
		type: Schema.Types.String,
		required: true,
	},
	authToken: {
		type: Schema.Types.String,
	},
});
// eslint-disable-next-line func-names
staffSchema.pre('save', async function (next) {
	try {
		const roles = ['staff'];

		if (this.isModified('role')) {
			this.role = this.role.toLowerCase();
			if (!roles.includes(this.role)) {
				throw new Error('Please enter valid role');
			}
		}

		if (this.isModified('password')) {
			this.password = await bcrypt.hash(this.password, 10);
		}
		next();
	} catch (err) {
		throw new HttpException(
			500,
			err.message,
			'CREATE_USER_UNHANDLED_IN_DB',
			err,
		);
	}
});
const Staff = model('Staff', staffSchema);
export default Staff;
