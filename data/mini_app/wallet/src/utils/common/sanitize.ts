export const nullToUndefined = <T>(value: T) => {
  return value === null ? undefined : value;
};

// REGEX FROM W3C (https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email))
const EMAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const isValidEmail = (email: string) => {
  return email.match(EMAIL_REGEX);
};

export const censorEmail = (email: string) => {
  const emailParts = email.split('@');
  const emailPrefix = emailParts[0];
  let censoredPrefix = '*'.repeat(emailPrefix.length);
  if (emailPrefix.length > 5) {
    censoredPrefix = emailPrefix
      .substring(0, 2)
      .concat('***', emailPrefix.substring(emailPrefix.length - 1));
  }
  return censoredPrefix.concat('@', emailParts.slice(1).join('@'));
};
