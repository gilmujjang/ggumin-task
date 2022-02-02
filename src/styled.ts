import styled from 'styled-components';

export const App = styled.div`
  margin: auto;
  margin-top: 8px;
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageBox = styled.div`
  position: relative;
`;

export const Picture = styled.img`
  width: 100%;
`;

export const ProductClickIcon = styled.div<{ pointX: number; pointY: number }>`
  position: absolute;
  left: ${(props) => 1.7 * props.pointY}px;
  top: ${(props) => 1.6 * props.pointX}px;
  cursor: pointer;
`;

export const ProductInfoBox = styled.span`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 220px;
  padding: 8px 0 8px 8px;
  margin-top: 16px;
  border-radius: 7px;
  box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 20%);
  font-size: 14px;
  color: #4a4a4a;
  position: absolute;
  top: 28px;
  left: -20px;
`;

export const ProductInfoImage = styled.div<{ productUrl: string }>`
  background-image: url(${(props) => props.productUrl});
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  margin-right: 8px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
`;

export const ProductInfo = styled.div`
  height: 70px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2px;
  overflow: hidden;
  text-align: left;
`;

export const ProductInfoName = styled.div`
  overflow: hidden;
  white-space: initial;
`;

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

export const ExpectPrice = styled.span`
  line-height: 1.2em;
  color: #898f94;
  font-size: 11px;
  font-weight: bold;
  margin-right: 4px;
`;

export const DiscountRate = styled.span`
  color: #ff585d;
  margin-right: 4px;
  line-height: 1.2em;
  font-size: 16px;
  font-weight: bold;
`;

export const Price = styled.span`
  line-height: 1.2em;
  display: flex;
  align-items: center;
  color: #181d1f;
  font-size: 16px;
  font-weight: bold;
`;

export const ArrowBox = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: auto;
  margin-right: 2px;
`;

export const CarouselBox = styled.div`
  display: flex;
`;

export const ProductImage = styled.div<{ productUrl: string }>`
  background-image: url(${(props) => props.productUrl});
  width: 106px;
  height: 106px;
  margin: 28px 6px;
  cursor: pointer;
`;
