export const convertInt = (text: string): number | undefined => {
  const number = parseInt(text);
  return (!isNaN(number) && number) || undefined;
};
