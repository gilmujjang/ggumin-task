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

export const ProductClick = styled.div<{ pointX: number; pointY: number }>`
  position: absolute;
  left: ${(props) => 1.7 * props.pointY}px;
  top: ${(props) => 1.6 * props.pointX}px;
`;

export const Magnify = styled.img`
  width: 32px;
  height: 32px;
`;

export const CarouselBox = styled.div`
  display: flex;
`;

export const ProductImage = styled.div<{ productUrl: string }>`
  background-image: url(${(props) => props.productUrl});
  width: 106px;
  height: 106px;
  margin: 28px 6px;
`;
