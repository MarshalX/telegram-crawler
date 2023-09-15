import { forwardRef } from 'react';

const NON_WESTERN_DIGITS: {
  [key: string]: string;
} = {
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  '٫': '.',
  '،': '.', // Arabic
  '०': '0',
  '१': '1',
  '२': '2',
  '३': '3',
  '४': '4',
  '५': '5',
  '६': '6',
  '७': '7',
  '८': '8',
  '९': '9',
  '।': '.', // Hindi
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9', // Bengali
};

export const NumericInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        const newValue = value
          .split('')
          .map((char) => NON_WESTERN_DIGITS[char] || char)
          .join('');

        event.target.value = newValue;

        if (props.onChange) {
          props.onChange(event);
        }
      }}
    />
  );
});
