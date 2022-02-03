import styled from 'styled-components';

export const CarouselBox = styled.div`
  display: flex;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;
  padding: 0 10px;
  box-sizing: border-box;
`;

export const SwiperWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
  align-items: center;
  transform: translate3d(0px, 0, 0);
`;

export const ProductImageBox = styled.div`
  display: inline-flex;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  margin: 28px 6px;
  position: relative;
  transition-property: transform;
  cursor: pointer;
`;

export const ProductImage = styled.div<{ productUrl: string }>`
  background-image: url(${(props) => props.productUrl});
  position: relative;
  background-size: cover;
  width: 106px;
  height: 106px;
  border-radius: 16px;
  border: 0.5 px solid #aaafb9;
  user-select: none;
`;

export const CheckedProductImageBox = styled(ProductImageBox)`
  background: linear-gradient(163.54deg, #ff659e 8.22%, #f56b30 94.1%);
  margin: 26px 4px;
  padding: 2px;
  border-radius: 18px;
`;
