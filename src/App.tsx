import React, { useEffect, useState } from 'react';
import * as S from './styled';

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
          }) => {
            if (state === product.productId) {
              return (
                <S.ProductClickIcon
                  key={product.productId}
                  pointX={product.pointX}
                  pointY={product.pointY}
                >
                  <S.Magnify
                    src="//cdn.ggumim.co.kr/storage/20211029145330GwwumnWNSs.png"
                    alt={product.productName}
                    onClick={() => {
                      ToggleTag(product.productId);
                    }}
                  />
                  <span>
                    <div></div>
                    <div>{product.productName}</div>
                    <div>
                      <img
                        src="//cdn.ggumim.co.kr/storage/20211102181936xqHzyWAmb8.png"
                        alt="상품보기"
                      ></img>
                    </div>
                  </span>
                </S.ProductClickIcon>
              );
            } else {
              return (
                <S.ProductClickIcon
                  key={product.productId}
                  pointX={product.pointX}
                  pointY={product.pointY}
                >
                  <S.Magnify
                    src="//cdn.ggumim.co.kr/storage/20211029145238AlZrQ41xtg.png"
                    alt={product.productName}
                    onClick={() => {
                      ToggleTag(product.productId);
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
