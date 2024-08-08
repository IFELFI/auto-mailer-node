import { validate } from '../validations';
import config from '../config';
import { transporter } from '../config/transporter';
import { AuthCodeData, AuthCodeDataSchema } from '../validations/authCode';

export async function sendAuthCode(data: AuthCodeData) {
  validate(AuthCodeDataSchema, data)
  const result = await transporter.sendMail({
    from: config.mail.auth.user,
    to: data.email,
    subject: 'Your auth code',
    text: `Your auth code is ${data.code}`,
  });

  console.log(`Message sent: ${result.messageId}`);
}
