import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';

import "./GallaryMain.css";

const GallaryMain = () => {
  // 0. query 에 사용할 키워드 ! (useRef 로 사용하시오)
  // 왜 useRef 를 사용 했나요? ->
  state = { images: [] };

  onSearchSubmit = async (term) => {
     
  /*
    const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: term},
          headers: {
              Authorization: 'Client-ID -HoxePXCmq0V5vDn1RsZEgMy67x_wPWMH1kAagJifFA'
          }
      })

      this.setState({ images: response.data.results })
    */
 
     
    const getResponse = async() => {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: term},
          headers: {
              Authorization: 'Client-ID -HoxePXCmq0V5vDn1RsZEgMy67x_wPWMH1kAagJifFA'
          }
      }) 
      this.setState({ images: response.data.results })
    };
  
  useEffect(()=>{
    getResponse();
   },[]);
  
  }
  
  // 1. 사진 URL 들을 저장할 배열 state 를 만든다.
  // 왜 ... 했나요 ? ->
 /*  const puppeteer = require("puppeteer");
  const axios = require("axios");
  const fs = require("fs");
  
  const crawler = async () => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();
      await page.goto("https://unsplash.com");
  
  
  let result = []
     while(result.length <= 30){
      let srcs = await page.evaluate(() => {
          // 절대 좌표 
          window.scrollTo(0, 0);
          let imgs = [];
          const imgEls = document.querySelectorAll('.nDTlD');
          if(imgEls.length){
              // document.querySelctorAll은 배열이 아니므로 forEach만 사용가능 
              imgEls.forEach(v => {
                  const img = v.querySelector("img._2zEKz");
                  if(img && img.src){
                      imgs.push(img.src);
                  }
                  v.parentElement.removeChild(v);
                  
              })
          }
          //30번했는데 벌써 크롤러가 바닥으로 갔기때문에
          //상단에서 최상단으로 한번 스크롤을 해주고 진행한다 
          // scrollBy 상대좌표
          window.scrollBy(0, 100);
          setTimeout(() => {
            window.scrollBy(0, 200);
          }, 500);
          return imgs;
      });
      
      result = result.concat(srcs);
      //선택자를 기다릴 수 있다.
      await page.waitForSelector("figure");
      console.log("태그 로딩 완료");
     }
      
      console.log(result);
      console.log(result.length);
      await page.close();
      await browser.close();
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  crawler(); */
  
  
  // reduce를 활용해서 한번 리팩토링을 진행해 보았으나 
      // 원본 배열을 손상시키기때문에 forEach로 하는게 맞다는 생각이 들었다.
  
      // while (result.length <= 30) {
      //   // 클래스명이 정말 자주 바뀌기때문에 확인해줘야한다.
      //   const srcs = await page.evaluate(() => {
      //     window.scrollTo(0, 0);
      //     const imgEls = document.querySelectorAll(".nDTlD"); // 사이트 바뀌었을 때 클래스 적절히 바꾸기
      //     if (imgEls.length) {
      //       // querySelectorAll은 배열이 아니라서 forEach만 사용이 가능하다.
      //       const data = Array.from(imgEls).reduce((acc, cur) => {
      //         const img = cur.querySelector("img._2zEKz");
      //         if (img && img.src) {
      //           acc.push(img.src);
      //         }
      //         //크롤링을 한후에 현재 값을 지워준다.
      //         cur.parentElement.removeChild(cur);
      //         return acc;
      //       }, []);
      //       window.scrollBy(0, 100);
      //       setTimeout(() => {
      //         window.scrollBy(0, 200);
      //       }, 500);
      //       return data;
      //     }
      //   });
      //   result = result.concat(srcs);
      //   await page.waitForSelector("figure");
      // }
  // 2. 컴포넌트 렌더 시에 처음에 단 한 번, UnsplashService.getPhotoURLs() 를 이용해 사진 URL 들을 얻어온 다음, state 로 저장한다. (getPhotoURLs() 는 async 함수 임)
  // 왜 ... 했나요 ? ->

  // 3-1. 2. 에서 받아온 사진 URL 들과 <img/> 를 이용하여 JSX 를 만들기! JSX 는 useMemo() 로 caching 할 수 있다.
  // 3-2. 각 img 마다 클릭 시에 클릭 된 img 를 삭제 하도록 구현 -> array 조작을 이용 (젤 어려움)
  // 3-3.    img 는 GallaryImage 컴포넌트로 child 로 제작하기!
 
  // 왜 ... 했나요 ? ->

  // 4. 3. 에서 만든 JSX 를 리턴!
  // return <div className="GallaryMain">{...}</div>;
};

export default GallaryMain;
