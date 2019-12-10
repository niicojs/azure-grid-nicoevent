require('dotenv').config();

import fetch from 'node-fetch';
import * as shortid from 'shortid';

const endpoint = process.env.EVENT_GRID_ENDPOINT;

(async () => {
  console.log('Starting...');

  const event = [
    {
      id: shortid.generate(),
      eventType: 'nico-event',
      subject: 'one/bla',
      eventTime: new Date().toUTCString(),
      data: {
        bla: 'bli',
        bli: 'blu'
      },
      dataVersion: '1.0'
    }
  ];

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'aeg-sas-key': process.env.EVENT_GRID_KEY
    },
    body: JSON.stringify(event)
  });

  if (response.ok) {
    console.log('ok');
  } else {
    console.error('Error in HTTP request');
    const error = await response.json();
    console.error(error.error.message);
  }

  console.log('Done.');
})();
