import React, { useRef, useEffect, useState } from 'react';
import * as S from './styled';

function numAddComma(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function percentageMaker(originalPrice: number, discountPrice: number) {
  return (((originalPrice - discountPrice) * 100) / originalPrice).toFixed(0);
}

function App() {
  const [api, setApi] = useState<any>(null);
  const [state, setState] = useState<number | null>(null);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  async function GetJsonData(address: string) {
    const data = await fetch(address, { mode: 'cors' })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        return myJson;
      });
    setApi(data);
  }

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setState(null);
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    if (api === null) {
      console.log('api를 호출합니다');
      const address = 'https://cdn.ggumim.co.kr/test/image_product_link.json';
      GetJsonData(address);
    }
  });

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

  console.log(api);

  if (api === null) {
    return <div>로딩중</div>;
  }

  const productList: [] = api.productList;

  return (
    <S.App className="App">
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
    </S.App>
  );
}

export default App;
