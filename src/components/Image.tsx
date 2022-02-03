import React, { useRef, useEffect } from 'react';
import { numAddComma, percentageMaker } from './utils';
import * as S from './ImageStyled';

function useOutsideAlerter(ref: any, onClick: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClick]);
}

const ProductInformationBox = (props: any) => {
  const { imageUrl, productName, priceOriginal, priceDiscount } = props;

  return (
    <>
      <S.ProductInfoImage productUrl={imageUrl} />
      <S.ProductInfo>
        <S.ProductInfoName>{productName}</S.ProductInfoName>
        <S.PriceBox>
          {priceOriginal === priceDiscount ? (
            <>
              <S.ExpectPrice>예상가</S.ExpectPrice>
              <S.Price>{numAddComma(priceOriginal)}</S.Price>
            </>
          ) : (
            <>
              <S.DiscountRate>
                {percentageMaker(priceOriginal, priceDiscount)}%
              </S.DiscountRate>
              <S.Price>{numAddComma(priceDiscount)}</S.Price>
            </>
          )}
        </S.PriceBox>
      </S.ProductInfo>
      <S.ArrowBox>
        <img
          src="//cdn.ggumim.co.kr/storage/20211102181936xqHzyWAmb8.png"
          alt="상품보기"
          width="20px"
        />
      </S.ArrowBox>
    </>
  );
};

function Image(props: any) {
  const { state, onClick, api } = props;
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClick);

  const onClickTooltip = (id: number) => {
    window.location.href = `https://www.ggumim.co.kr/furniture/view/${id}`;
  };

  const productList: [] = api.productList;

  const MoreInfoMode = (p: any) => {
    const {
      productId,
      pointX,
      pointY,
      productName,
      imageUrl,
      priceOriginal,
      priceDiscount,
      index,
    } = p;
    return (
      <S.ProductClickIcon
        key={productId}
        pointX={pointX}
        pointY={pointY}
        ref={wrapperRef}
      >
        <img
          width="32px"
          src="//cdn.ggumim.co.kr/storage/20211029145330GwwumnWNSs.png"
          alt={productName}
          onClick={() => {
            onClick(productId, index);
          }}
        />
        {pointX > 250 ? (
          pointY > 250 ? (
            <>
              <S.RightBottomTri />
              <S.RightBottom
                pointX={pointX}
                pointY={pointY}
                onClick={() => {
                  onClickTooltip(productId);
                }}
              >
                <ProductInformationBox
                  imageUrl={imageUrl}
                  productName={productName}
                  priceOriginal={priceOriginal}
                  priceDiscount={priceDiscount}
                />
              </S.RightBottom>
            </>
          ) : (
            <>
              <S.LeftBottomTri />
              <S.LeftBottom
                pointX={pointX}
                pointY={pointY}
                onClick={() => {
                  onClickTooltip(productId);
                }}
              >
                <ProductInformationBox
                  imageUrl={imageUrl}
                  productName={productName}
                  priceOriginal={priceOriginal}
                  priceDiscount={priceDiscount}
                />
              </S.LeftBottom>
            </>
          )
        ) : pointY > 250 ? (
          <>
            <S.RightTopTri />
            <S.RightTop
              pointX={pointX}
              pointY={pointY}
              onClick={() => {
                onClickTooltip(productId);
              }}
            >
              <ProductInformationBox
                imageUrl={imageUrl}
                productName={productName}
                priceOriginal={priceOriginal}
                priceDiscount={priceDiscount}
              />
            </S.RightTop>
          </>
        ) : (
          <>
            <S.LeftTopTri />
            <S.LeftTop
              pointX={pointX}
              pointY={pointY}
              onClick={() => {
                onClickTooltip(productId);
              }}
            >
              <ProductInformationBox
                imageUrl={imageUrl}
                productName={productName}
                priceOriginal={priceOriginal}
                priceDiscount={priceDiscount}
              />
            </S.LeftTop>
          </>
        )}
      </S.ProductClickIcon>
    );
  };

  return (
    <S.ImageBox>
      <S.Picture src={api.imageUrl} />
      {productList.map(
        (
          product: {
            productId: number;
            pointX: number;
            pointY: number;
            productName: string;
            imageUrl: string;
            priceDiscount: number;
            priceOriginal: number;
          },
          index,
        ) => {
          const {
            productId,
            pointX,
            pointY,
            productName,
            imageUrl,
            priceDiscount,
            priceOriginal,
          } = product;

          if (state === productId) {
            return (
              <MoreInfoMode
                key={productId}
                pointX={pointX}
                pointY={pointY}
                imageUrl={imageUrl}
                productName={productName}
                priceDiscount={priceDiscount}
                priceOriginal={priceOriginal}
                index={index}
              />
            );
          } else {
            return (
              <S.ProductClickIcon
                key={productId}
                pointX={pointX}
                pointY={pointY}
              >
                <img
                  width="32px"
                  src="//cdn.ggumim.co.kr/storage/20211029145238AlZrQ41xtg.png"
                  alt={productName}
                  onClick={() => {
                    onClick(productId, index);
                  }}
                />
              </S.ProductClickIcon>
            );
          }
        },
      )}
    </S.ImageBox>
  );
}

export default Image;
