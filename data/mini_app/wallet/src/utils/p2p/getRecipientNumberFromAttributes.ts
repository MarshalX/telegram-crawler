import { createDefaultMaskGenerator, mask } from 'react-hook-mask';

import { ArraySbpBank, AttributesRestDto, Str } from 'api/p2p/generated-common';

const RU_PHONE_MASK = createDefaultMaskGenerator('+9 (999) 999-99-99');

export const getRecipientNumberFromAttributes = (
  attributes?: AttributesRestDto | ArraySbpBank | Str,
) => {
  if (!attributes) return '';

  let attribute: ArraySbpBank | Str | undefined;

  if (attributes && 'version' in attributes) {
    attribute = attributes?.values?.find((attribute) => {
      if (
        (attribute.name === 'PHONE' ||
          attribute.name === 'PAYMENT_DETAILS_NUMBER') &&
        attribute.value
      ) {
        return true;
      }

      return false;
    });
  } else {
    attribute = attributes;
  }

  if (!attribute || Array.isArray(attribute.value)) return '';

  if (attribute.name === 'PHONE' && typeof attribute.value === 'string') {
    return mask(attribute.value, RU_PHONE_MASK);
  }

  return attribute.value;
};
