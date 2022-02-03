export function numAddComma(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function percentageMaker(originalPrice: number, discountPrice: number) {
  return (((originalPrice - discountPrice) * 100) / originalPrice).toFixed(0);
}
