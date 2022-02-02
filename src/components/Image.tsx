import React, { useRef, useEffect } from 'react';
import * as S from './ImageStyled';

function numAddComma(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function percentageMaker(originalPrice: number, discountPrice: number) {
  return (((originalPrice - discountPrice) * 100) / originalPrice).toFixed(0);
}

function useOutsideAlerter(ref: any, setState: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setState(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setState]);
}

function Image(props: any) {
  const { state, setState, api } = props;
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setState);

  const ToggleTag = (key: number) => {
    console.log(key);
    if (key === state) {
      setState(null);
    } else {
      setState(key);
    }
  };

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
    } = p;
    console.log(p);
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
            ToggleTag(productId);
          }}
        />
        <S.ProductInfoBox
          onClick={() => {
            onClickTooltip(productId);
          }}
        >
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
        </S.ProductInfoBox>
      </S.ProductClickIcon>
    );
  };

  return (
    <S.ImageBox>
      <S.Picture src={api.imageUrl} />
      {productList.map(
        (product: {
          productId: number;
          pointX: number;
          pointY: number;
          productName: string;
          imageUrl: string;
          priceDiscount: number;
          priceOriginal: number;
        }) => {
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
                    ToggleTag(productId);
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
