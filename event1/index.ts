import { AzureFunction, Context } from '@azure/functions';
import fetch from 'node-fetch';
import * as shortid from 'shortid';

const eventGridTrigger: AzureFunction = async function(
  context: Context,
  event: any
): Promise<void> {
  context.log(event);

  if (event.eventType !== 'nico-event') return;

  try {
    for (let i = 1; i <= 5; i++) {
      const endpoint = process.env.EVENT_GRID_ENDPOINT;
      const newevent = [
        {
          id: shortid.generate(),
          eventType: 'nico-event',
          subject: `message/${i}`,
          eventTime: new Date().toUTCString(),
          data: event.data,
          dataVersion: '1.0'
        }
      ];

      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'aeg-sas-key': process.env.EVENT_GRID_KEY
        },
        body: JSON.stringify(newevent)
      });
    }
  } catch (e) {
    context.log.error(e);
    throw e;
  }
};

export default eventGridTrigger;
