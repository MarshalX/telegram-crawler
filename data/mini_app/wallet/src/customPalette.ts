type CustomPaletteKeys =
  | 'button_confirm_color'
  | 'button_confirm_text_color'
  | 'button_disabled_color'
  | 'button_disabled_text_color'
  | 'button_danger_color';
type CustomPalette = Record<
  'apple' | 'material',
  Record<'light' | 'dark', Record<CustomPaletteKeys, `#${string}`>>
>;

const customPalette: CustomPalette = {
  apple: {
    light: {
      button_confirm_color: '#34C759',
      button_confirm_text_color: '#FFFFFF',
      button_disabled_color: '#E8E8E9',
      button_disabled_text_color: '#B9B9BA',
      button_danger_color: '#ff3b30',
    },
    dark: {
      button_confirm_color: '#30D158',
      button_confirm_text_color: '#FFFFFF',
      button_disabled_color: '#2F2F2F',
      button_disabled_text_color: '#606060',
      button_danger_color: '#ff4530',
    },
  },
  material: {
    light: {
      button_confirm_color: '#31B545',
      button_confirm_text_color: '#FFFFFF',
      button_disabled_color: '#E9E8E8',
      button_disabled_text_color: '#BABABA',
      button_danger_color: '#f56058',
    },
    dark: {
      button_confirm_color: '#31B545',
      button_confirm_text_color: '#FFFFFF',
      button_disabled_color: '#3C3C3E',
      button_disabled_text_color: '#78787C',
      button_danger_color: '#f16d66',
    },
  },
};

export default customPalette;
