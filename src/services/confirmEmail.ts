import { validate } from '../validations';
import config from '../config';
import { transporter } from '../utils/transporter';
import {
  ConfirmEmailReq,
  ConfirmEmailReqSchema,
} from '../validations/ConfirmEmailReq';
import { logger } from '../utils/logger';
import { confirmEmailHtml } from '../contents/confirmEmail';

export async function confirmEmail(data: ConfirmEmailReq) {
  validate(ConfirmEmailReqSchema, data);
  const result = await transporter.sendMail({
    from: config.mail.auth.user,
    to: data.email,
    subject: '[IFELFI] Confirm your email address',
    html: confirmEmailHtml(data.link),
  });

  if (result.accepted.length) {
    logger.info(`Email sent to ${data.email}`);
  } else {
    logger.error(`Failed to send email to ${data.email}`);
  }
}
