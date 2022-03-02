<p align="middle" >
  <img src="https://user-images.githubusercontent.com/24728385/148955263-b3a0e063-6950-46f2-82e9-1fcabc24e19e.jpeg"/>
</p>
<br/>
<h1 align="middle">[과제] 집꾸미기</h1>

## 🔗 배포

[집꾸미기 과제 배로 링크](https://gilmujjang.github.io/ggumin-task)

<br>

## ⚙️ 설치 및 시작하는 법

```
$ git clone https://github.com/gilmujjang/ggumin-task.git

$ cd ggumin-task

$ npm install

$ npm run start
```

<br>

## 🏹 과제 구현 목록

![image](https://user-images.githubusercontent.com/40172373/152340316-fe216ca1-5632-4fc2-ba29-f42fb35518a5.png)

판매상품을 클릭하여 상세정보를 볼 수 있게 아이콘을 정확한 위치에 출력한다.

![image](https://user-images.githubusercontent.com/40172373/152340521-553e54bb-9e18-458c-a611-e5139f5a90cd.png)

돋보기 아이콘을 클릭시 상품 상세정보를 출력한다. 상세정보를 출력할 때 는 돋보기 아이콘 대신 X모양의 아이콘으로 대체하고 specch bubble 형태의 제품 상세정보를 출력한다.
이때 밑의 캐로셀도 선택이 된다.

![image](https://user-images.githubusercontent.com/40172373/152340796-e91bdb42-9849-49d3-bf2f-4fa3ffa56c27.png)

할인 상품의 경우 할인율을 표시한다.

![image](https://user-images.githubusercontent.com/40172373/152340879-74d570a6-f104-4fa9-801d-f0fdd57b4003.png)

캐로셀의 제품을 클릭해도 위 이미지에서도 선택되어 상세정보를 출력한다. 선택한 제품을 스크롤바의 가운데로 부드럽게 이동시킨다.

![image](https://user-images.githubusercontent.com/40172373/152341072-b35722a1-82be-47e5-8c2e-c91b41576c1b.png)

할인상품의 경우 캐로셀에도 할인율을 표기한다.

<br>

## 🏗 프로젝트 구조

과제를 상단의 이미지와 하단의 캐로셀로 분리했다. 선택된 상품의 정보는 App.tsx에서 state로 관리하고 이미지 컴포넌트와 캐로셀 컴포넌트로 props를 전달한다.

```
├── 📂public
│   ├── 📜index.html
├── 📂src
│   ├── 📂components
│   │   ├── 📜Carousel.tsx
│   │   ├── 📜CarouselStyled.ts
│   │   ├── 📜Image.tsx
│   │   ├── 📜ImageStyled.ts
│   │   └── 📜utils.ts
│   ├── 📜App.tsx
│   ├── 📜index.css
│   ├── 📜index.tsx
│   └── 📜styled.ts
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## 어려웠던 부분

### 캐로셀 스크롤 이동

제품을 클릭하여 상세정보가 출력될때 캐로셀에서도 해당 제품이 가운데로 포커싱이 되어야 했다.

![image](https://user-images.githubusercontent.com/40172373/152341607-ce2b861e-2122-4f8e-92b7-c26788e007c2.png)

클릭 전

![image](https://user-images.githubusercontent.com/40172373/152341623-5b8c6850-5a5b-4a39-9718-71688a718cd4.png)

클릭 후

따라서 현재 선택된 제품이 캐로셀 컴포넌트내의 x좌표를 알아내야 했다.
useRef를 사용하여 컴포넌트의 현제 scrollWidth값과 해당 제품이 제품 목록에서 몇번째 인지를 이용하여 x축 스크롤 값을 결정하였다.

```
  const width = scrollRef.current.scrollWidth;
  const x: number =
    ((index + 1) / api.productList.length) * width - width / 2;
  scrollRef.current.scrollTo({ left: x, top: 0, behavior: 'smooth' });
```
