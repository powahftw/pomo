/** Unsecure hash function to be used for quick hashes of text content.  */
export const hashCodeFrom = (s: string) => {
  return s.split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};
