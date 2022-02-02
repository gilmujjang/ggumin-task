import styled from 'styled-components';

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
