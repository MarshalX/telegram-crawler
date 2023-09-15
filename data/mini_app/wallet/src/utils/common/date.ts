import * as Sentry from '@sentry/react';
import { TFunction, t } from 'i18next';
import { parse, toSeconds } from 'iso8601-duration';

import { resolveLanguageCode } from './currency';

// Для фарси выводим дату в формате dd/mm
export function dateFormatter(languageCode?: string) {
  return Intl.DateTimeFormat(resolveLanguageCode(languageCode), {
    month: languageCode === 'fa' ? 'numeric' : 'long',
    day: 'numeric',
  });
}

// Для фарси выводим дату в формате dd/mm/yyyy
export function fullDateFormatter(languageCode?: string) {
  return Intl.DateTimeFormat(resolveLanguageCode(languageCode), {
    month: languageCode === 'fa' ? 'numeric' : 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Для фарси выводим время в формате 24 часов
export function timeFormatter(languageCode?: string) {
  return Intl.DateTimeFormat(languageCode === 'fa' ? 'ru' : languageCode, {
    minute: 'numeric',
    hour: 'numeric',
  });
}

/**
 * Выводит дату в формате "Вчера в 10:20" | "Сегодня в 12:15" | "30 июля в 16:00"
 */
export function printDate({
  t,
  value,
  languageCode,
}: {
  value: Date;
  t: TFunction;
  languageCode?: string;
}): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const time = timeFormatter(languageCode).format(value);
  let date: string;

  if (value.toDateString() === today.toDateString()) {
    date = t('common.today');
  } else if (value.toDateString() === yesterday.toDateString()) {
    date = t('common.yesterday');
  } else {
    date = dateFormatter(languageCode).format(value);
  }

  return t('common.date', {
    date,
    time,
  });
}

/**
 * Выводит дату в формате "16:00 20 сентября 2022 года"
 */
export function printFullDate(value: Date, languageCode?: string): string {
  const time = timeFormatter(languageCode).format(value);
  const date = fullDateFormatter(languageCode).format(value);

  return `${time} ${date}`;
}

/**
 * Выводит интервал в формате "3 минуты" | "68 минут" | "1 час 8 минут"
 * @param duration - интервал в формате ISO 8601 (пример: PT1H8M)
 */
export const printDuration = (
  duration: string,
  options = {
    printInMinutes: false,
  },
): string => {
  try {
    const parsedDuration = parse(duration);

    const { hours = 0, minutes = 0 } = parsedDuration;

    if (options.printInMinutes) {
      const durationInMinutes = Math.ceil(toSeconds(parsedDuration) / 60);
      return t('common.xx_minutes', { count: durationInMinutes });
    }

    const hoursStr = t('common.xx_hours', { count: hours });
    const minutesStr = t('common.xx_minutes', { count: minutes });

    let result = '';

    if (hours > 0) {
      result += `${hoursStr} `;
    }

    if (minutes > 0) {
      result += `${minutesStr} `;
    }

    return result.trim();
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return '';
  }
};

export const parseDuration = (duration: string) => {
  const parsedDuration = parse(duration);

  const { hours = 0, minutes = 0 } = parsedDuration;

  return {
    hours,
    minutes,
  };
};
