import axios, {Axios, Method} from 'axios';

const BACKEND_ROOT_URL = 'http://127.0.0.1:10302';

type PageData = {
  content: string;
};

class Client {
  private _http: Axios;

  constructor() {
    this._http = Client.initHttp();
  }

  private static initHttp(): Axios {
    const http = axios.create({
      baseURL: BACKEND_ROOT_URL,
    });

    http.interceptors.request.use(
      config => {
        const token = window.oauth2Token;
        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    return http;
  }

  getHome = () => this.getPageDataContent('');

  getPage = () => this.getPageDataContent('page');

  getFailingPage = () => this.getPageDataContent('failing-page');

  getEditablePage = () => this.getPageDataContent('editable-page');

  postEditablePage = (content: string) =>
    this.postPageData('editable-page', {content: content});

  private get = (path: string) => this.requestPageData('GET', path, null);

  private getPageDataContent = async (path: string) =>
    (await this.get(path)).data.content;

  private postPageData = (path: string, pageData: PageData) =>
    this.requestPageData('POST', path, pageData);

  private requestPageData = async (
    method: Method,
    path: string,
    pageData: PageData | null
  ) => {
    console.debug(
      `[client] ${method} ${BACKEND_ROOT_URL}/${path} ...`,
      pageData
    );

    try {
      const response = await this._http.request<PageData>({
        method: method,
        url: path,
        data: pageData,
      });

      console.debug(
        `[client] ${method} ${BACKEND_ROOT_URL}/${path} - ${response.status} ${response.statusText}`
      );

      return response;
    } catch (error) {
      console.error('[client] Request failed', error);
      throw error;
    }
  };
}

const client = new Client();

export default client;
