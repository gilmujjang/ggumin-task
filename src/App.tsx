import { useEffect, useState } from 'react';
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

  if (api === null) {
    return <div>로딩중</div>;
  }

  return (
    <S.App className="App">
      <Image state={state} ToggleTag={ToggleTag} api={api} />
      <Carousel api={api} state={state} ToggleTag={ToggleTag} />
    </S.App>
  );
}

export default App;
