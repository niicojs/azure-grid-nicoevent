import { AzureFunction, Context } from '@azure/functions';
import fetch from 'node-fetch';

const eventGridTrigger: AzureFunction = async function(
  context: Context,
  event: any
): Promise<void> {
  context.log(event);

  if (event.eventType !== 'nico-event') return;

  const telegram = process.env.TELEGRAM_URL;
  await fetch(telegram + event.subject);
};

export default eventGridTrigger;
