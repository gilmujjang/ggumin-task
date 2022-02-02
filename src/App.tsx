import React, { useEffect, useState } from 'react';
import Image from './components/Image';
import Carousel from './components/Carousel';
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

  if (api === null) {
    return <div>로딩중</div>;
  }

  console.log(api);

  return (
    <S.App className="App">
      <Image state={state} setState={setState} api={api} />
      <Carousel api={api} />
    </S.App>
  );
}

export default App;
