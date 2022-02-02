import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [api, setApi] = useState(null);

  async function GetJsonData(address: string){
    const data = await fetch(address, { mode: 'cors' })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      return myJson;
    });
    setApi(data)
  };

  useEffect(() => {
    if(api === null){
      console.log('api를 호출합니다');
      const address = 'https://cdn.ggumim.co.kr/test/image_product_link.json';
      GetJsonData(address);
    }
  },[])

  console.log(api);
  
  return <div className="App"></div>;
}

export default App;
