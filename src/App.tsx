import { useEffect, useState, useRef } from 'react';
import Image from './components/Image';
import Carousel from './components/Carousel';
import * as S from './styled';

function App() {
  const [api, setApi] = useState<any>(null);
  const [state, setState] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const onClick = (productId: number, index: number) => {
    ToggleTag(productId);
    if (scrollRef.current) {
      const width = scrollRef.current.scrollWidth;
      const x = ((index + 1) / api.productList.length) * width - width / 2;
      scrollRef.current.scrollTo(x, 0);
    }
  };

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
      <Image state={state} onClick={onClick} api={api} />
      <Carousel
        api={api}
        state={state}
        onClick={onClick}
        scrollRef={scrollRef}
      />
    </S.App>
  );
}

export default App;
