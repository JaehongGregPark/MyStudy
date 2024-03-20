import { createApi } from "unsplash-js";

class UnsplashService {
  /**
   * Unsplash.js 의 인스턴스
   */
  #instance;

  constructor() {
    // initialise an instance of Unsplash.js
    // Notion 대시보드의 "Create-React-App 에서 환경변수 (.env) 쓰기 " 참조
    this.#instance = createApi({
      accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
    });
  }

  /**
   * query 로 검색해서 사진들을 가져옴
   * @param {string} query 찾을 사진들의 키워드 e.g. "office", "dog", "foods"
   * @returns 사진들의 url array
   */
  async getPhotoURLs(query) {
    if (typeof query !== "string") {
      throw new Error("Query is supposed to be the type of string!");
    }

    try {
      const { response, status } = await this.#instance.search.getPhotos({ query });
      console.log("Get Photo URLs status code : ", status);
      return response?.results.map(i => i.urls.regular);
    } catch (err) {
      console.error(err);
    }
  }
}

export default new UnsplashService();
