import Color from 'color';

export const green = 'rgba(27, 153, 139, 1)';
export const black = 'rgba(45, 48, 71, 1)';
export const yellow = 'rgba(255, 253, 130, 1)';
export const orange = 'rgba(255, 155, 113, 1)';
export const red = 'rgba(232, 72, 85, 1)';

export const white = '#fff';

export const lightGreen = Color(green)
  .lighten(0.2)
  .string();

export const lightBlack = Color(black)
  .lighten(0.2)
  .string();
export const darkBlack = Color(black)
  .darken(0.2)
  .string();
