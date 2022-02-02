import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (api === null) {
      console.log('api를 호출합니다');
      const address = 'https://cdn.ggumim.co.kr/test/image_product_link.json';
      GetJsonData(address);
    }
  });

  const ToggleTag = (key: number) => {
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
        <S.Picture src={api.imageUrl}></S.Picture>
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

            if (state === product.productId) {
              return (
                <S.ProductClickIcon
                  key={productId}
                  pointX={pointX}
                  pointY={pointY}
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
                    <img src={imageUrl} alt={productName} width="70px"></img>
                    <S.ProductInfo>
                      <div>{productName}</div>
                      <S.PriceBox>
                        {priceOriginal === priceDiscount ? (
                          <>
                            <span>예상가</span>
                            <span>{numAddComma(priceOriginal)}</span>
                          </>
                        ) : (
                          <>
                            <span>
                              {percentageMaker(priceOriginal, priceDiscount)}%
                            </span>
                            <span>{numAddComma(priceDiscount)}</span>
                          </>
                        )}
                      </S.PriceBox>
                    </S.ProductInfo>
                    <div>
                      <img
                        src="//cdn.ggumim.co.kr/storage/20211102181936xqHzyWAmb8.png"
                        alt="상품보기"
                        width="20px"
                      />
                    </div>
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
