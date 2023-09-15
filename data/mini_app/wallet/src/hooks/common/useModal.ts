import { Dispatch, SetStateAction, useState } from 'react';

export function useModal(
  initialShownValue = false,
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isShown, setIsShown] = useState(initialShownValue);

  return [isShown, setIsShown];
}
