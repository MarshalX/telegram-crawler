import { useQuery } from '@tanstack/react-query';

import API from 'api/wallet';

import { convertLangCodeFromAPItoISO } from 'utils/common/lang';

export const useLanguages = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getAvailableLanguages'],
    queryFn: async () => {
      const { data } = await API.Languages.getAvailableLanguages();
      return data.map((item) => {
        return {
          ...item,
          language_code: convertLangCodeFromAPItoISO(item.language_code),
        };
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    data,
    isLoading,
  };
};
