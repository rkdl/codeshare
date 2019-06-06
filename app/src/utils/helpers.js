export const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

export const getDateNDaysFromNow = n =>
  new Date(Date.now() + n * 24 * 60 * 60 * 1000);

export const formatDate = date => (
  date.getDate() < 10 
    ? `0${date.getDate()}` 
    : date.getDate()
  ) + '-' + (
    date.getMonth() + 1 < 10 
      ? `0${date.getMonth() + 1}` 
      : date.getMonth() + 1
  ) + '-' + (
    date.getFullYear()
  );
