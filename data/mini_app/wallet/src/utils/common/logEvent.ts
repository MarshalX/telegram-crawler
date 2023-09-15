import BigNumber from 'bignumber.js';
import { v4 as uuidv4 } from 'uuid';

import API from 'api/events';
import { EventsGatewayProperty } from 'api/events/generated';

import { AMPLITUDE_NEW_PROJECT_INSTANCE_NAME } from 'config';

type EventProperty = string | boolean | number | BigNumber | undefined;

export function setAnalyticsProps(props: {
  userId?: number;
  userCountryPhoneAlpha2Code?: string;
  raffle_participant?: boolean;
}) {
  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.NODE_ENV !== 'test'
  ) {
    const amplitude = window.amplitude.getInstance(
      AMPLITUDE_NEW_PROJECT_INSTANCE_NAME,
    );

    if (props.raffle_participant) {
      amplitude.setUserProperties({
        raffle_participant: true,
      });
    }

    if (props.userId !== undefined) {
      const normalizedUserId = props.userId.toString().padStart(5, '0');

      amplitude.setUserId(normalizedUserId);
    }

    if (props.userCountryPhoneAlpha2Code) {
      amplitude.setUserProperties({
        phone_country: props.userCountryPhoneAlpha2Code,
      });
    }
  }
}

export const logEvent = (
  eventName: string,
  options: Record<string, EventProperty | EventProperty[]> = {},
) => {
  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.NODE_ENV !== 'test'
  ) {
    const userId =
      window.amplitude
        .getInstance(AMPLITUDE_NEW_PROJECT_INSTANCE_NAME)
        .getUserId() || undefined;

    API.EventsGateway.eventsGatewayNewEvents({
      events: [
        {
          idempotencyKey: uuidv4(),
          unsafe: true,
          clientTime: new Date(Date.now()).toISOString(),
          version: 0,
          userId,
          name: eventName,
          eventProperties: Object.entries(options).reduce(
            (acc: Record<string, EventsGatewayProperty>, [key, value]) => {
              if (value !== undefined) {
                acc[key] = {
                  value: Array.isArray(value)
                    ? value
                        .filter((item) => item !== undefined)
                        .map((item) =>
                          item === undefined ? '' : item.toString(),
                        )
                        .join(',')
                    : value.toString(),
                  type: 'UNSPECIFIED',
                  kind: 'event',
                };
              }
              return acc;
            },
            {},
          ),
        },
      ],
    });

    window.amplitude
      .getInstance(AMPLITUDE_NEW_PROJECT_INSTANCE_NAME)
      .logEvent(eventName, options);
  }
};
