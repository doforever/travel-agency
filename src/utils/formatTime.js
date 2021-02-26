export const formatTime = arg => {
  if (arg === 'undefined' || isNaN(arg) || arg < 0) return null;

  const seconds = Math.floor(arg % 60);
  const minutes = Math.floor((arg / 60) % 60);
  const hours = Math.floor(arg / 3600);

  const zeroPad = num => {
    if (num < 10) {
      return '0' + Math.floor(num);
    } else return '' + num;
  };

  return `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
};
