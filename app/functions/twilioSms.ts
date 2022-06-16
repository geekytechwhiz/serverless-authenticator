import { Twilio } from 'twilio';
import { ISendMessageParams } from '../interfaces/SMSServices';
import { TWILIO_CONFIG } from '../utils/config';
const twilioClient = new Twilio(
  TWILIO_CONFIG.accountSid,
  TWILIO_CONFIG.authToken
);
export const sendSms = async (payload: ISendMessageParams) => {
  const { to, message } = payload;
  try {
    const msgRes = await twilioClient.messages.create({
      from: TWILIO_CONFIG.fromNumber,
      to,
      body: message,
    });
    console.log('Twilio Msg Response', msgRes);
    return msgRes;
  } catch (err) {
    console.log('Twilio Error', err);
    return err;
  }
};
