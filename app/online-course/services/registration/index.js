'use strict';
const bcrypt = require('bcrypt');

const { authConfig } = require('../../configs');
const { uid } = require('../../helpers/uid');
const { User } = require('../../models/user');

/**
 * Function 
 */
const create = async (params) => {
  try {
    if (!(params.email && params.password)) {
      return {
        metadata: { http_code: 400 },
        error: { message: 'email_and_password_is_required' },
      };
    }

    let user = await User.findOne({ where: { email: params.email } });
    if (user) {
      return {
        metadata: { http_code: 409 },
        error: { message: 'email_already_registered' },
      };
    }
    const now = Date.now();
    const hashedPassword = await bcrypt.hash(params.password, authConfig.passwordSaltRound);

    user = await User.create({
      id: uid(),
      first_name: params.email.split("@")[0],
      last_name: '',
      email: params.email,
      password: hashedPassword,
      created_at: now,
      updated_at: now,
    });

    return {
      metadata: { http_code: 201 },
      data: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }
    };
  } catch (error) {
    console.error('Error: Unable to execute registration.create  => ', error);

    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

module.exports = {
  create,
}