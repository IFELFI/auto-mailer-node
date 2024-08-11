import { validate } from '../validations';
import config from '../config';
import { transporter } from '../utils/transporter';
import {
  ConfirmEmailReq,
  ConfirmEmailReqSchema,
} from '../validations/ConfirmEmailReq';
import { logger } from '../utils/logger';

export async function confirmEmail(data: ConfirmEmailReq) {
  validate(ConfirmEmailReqSchema, data);
  const result = await transporter.sendMail({
    from: config.mail.auth.user,
    to: data.email,
    subject: '[IFELFI] Confirm your email address',
    text: `Your auth code is ${data.link}`,
  });

  if (result.accepted.length) {
    logger.info(`Auth code sent to ${data.email}`);
  } else {
    logger.error(`Failed to send auth code to ${data.email}`);
  }
}
