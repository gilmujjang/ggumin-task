import React from 'react';
import * as S from './CarouselStyled';

function Carousel(props: any) {
  const { api } = props;
  const productList: [] = api.productList;

  return (
    <S.CarouselBox>
      {productList.map((product: { productId: number; imageUrl: string }) => {
        return (
          <S.ProductImage
            key={product.productId}
            productUrl={product.imageUrl}
          ></S.ProductImage>
        );
      })}
    </S.CarouselBox>
  );
}

export default Carousel;
