import BigNumber from 'bignumber.js';
function getReadableNumber(value, assetDecimal, displayDecimal) {
  console.log(11111)
  let renderValue = new BigNumber(value);
  renderValue = renderValue.shiftedBy(assetDecimal * -1);

  let decimalPlaces = assetDecimal > 6 ? 6 : assetDecimal;
  if (renderValue.comparedTo(new BigNumber(0.000001)) < 0) {
    decimalPlaces = assetDecimal;
  }

  BigNumber.config({ DECIMAL_PLACES: displayDecimal == null ? decimalPlaces : displayDecimal });
  renderValue = renderValue.toString(10);
  return renderValue;
}
function isEmptyObj(obj) {
  return obj == null || obj == '';
}

export {
  getReadableNumber,isEmptyObj
}