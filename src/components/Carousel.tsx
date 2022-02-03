import { percentageMaker } from './utils';
import * as S from './CarouselStyled';

function Carousel(props: any) {
  const { api, state, onClick, scrollRef } = props;
  const productList: [] = api.productList;

  return (
    <S.CarouselBox ref={scrollRef}>
      <S.SwiperWrapper>
        {productList.map(
          (
            product: {
              productId: number;
              imageUrl: string;
              priceDiscount: number;
              priceOriginal: number;
            },
            index,
          ) => {
            const { productId, imageUrl, priceDiscount, priceOriginal } =
              product;
            if (productId === state) {
              return (
                <S.CheckedProductImageBox
                  key={productId}
                  onClick={() => onClick(productId, index)}
                >
                  <S.ProductImage productUrl={imageUrl}>
                    {priceOriginal !== priceDiscount && (
                      <S.DiscountRate>
                        {percentageMaker(priceOriginal, priceDiscount)}
                        <span>%</span>
                      </S.DiscountRate>
                    )}
                  </S.ProductImage>
                </S.CheckedProductImageBox>
              );
            } else {
              return (
                <S.ProductImageBox
                  key={productId}
                  onClick={() => onClick(productId, index)}
                >
                  <S.ProductImage productUrl={imageUrl} />
                </S.ProductImageBox>
              );
            }
          },
        )}
      </S.SwiperWrapper>
    </S.CarouselBox>
  );
}

export default Carousel;
