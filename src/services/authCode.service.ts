import { validate } from '../validations';
import config from '../config';
import { transporter } from '../utils/transporter';
import { AuthCodeData, AuthCodeDataSchema } from '../validations/authCode';
import { logger } from '../utils/logger';

export async function sendAuthCode(data: AuthCodeData) {
  validate(AuthCodeDataSchema, data)
  const result = await transporter.sendMail({
    from: config.mail.auth.user,
    to: data.email,
    subject: 'Your auth code',
    text: `Your auth code is ${data.code}`,
  });

  if (result.accepted.length) {
    logger.info(`Auth code sent to ${data.email}`);
  } else {
    logger.error(`Failed to send auth code to ${data.email}`);
  }
}
