import {parseOptionPrice} from './parseOptionPrice';

export const promoPrice = (price, promo) => {
  let standardPrice;

  if (price && promo) {
    if (parseOptionPrice(price).type === 'number') {
      standardPrice = parseOptionPrice(price).value;
    } else return null;
  } else return null;

  if ( isNaN(promo)
    || standardPrice < 0
    || promo < 0)
    return null;
  return (100 - promo) * 0.01 * standardPrice;
};
