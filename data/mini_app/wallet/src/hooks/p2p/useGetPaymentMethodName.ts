import { PaymentMethodRestDto, SbpBankRestDto } from 'api/p2p/generated-common';

import { useLanguage } from 'hooks/utils/useLanguage';

const useGetPaymentMethodName = () => {
  const userLanguageCode = useLanguage();

  const getPaymentMethodName = (
    paymentMethod: PaymentMethodRestDto,
    banks?: SbpBankRestDto[],
  ) => {
    const isInSameLocale = paymentMethod.originNameLocale === userLanguageCode;

    const name = isInSameLocale ? paymentMethod.name : paymentMethod.nameEng;

    if (!banks || !banks.length) {
      return name;
    }

    const banksNames =
      userLanguageCode === 'ru'
        ? banks.map((bank) => bank.nameRu)
        : banks.map((bank) => bank.nameEn);

    return `${name} (${banksNames.join(', ')})`;
  };

  return getPaymentMethodName;
};

export default useGetPaymentMethodName;
