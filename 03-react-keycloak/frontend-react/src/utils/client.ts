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

  getHome = () => this.getPayloadContent('');

  getPage = () => this.getPayloadContent('page');

  getEditablePage = () => this.getPayloadContent('editable-page');

  postEditablePage = (content: string) =>
    this.post('editable-page', {content: content});

  private get = (path: string) => this.request('GET', path, null);

  private getPayloadContent = async (path: string) =>
    (await this.get(path)).data.content;

  private post = (path: string, payload: PageData) =>
    this.request('POST', path, payload);

  private request = async (
    method: Method,
    path: string,
    payload: PageData | null
  ) => {
    console.debug(
      `[client] ${method} ${BACKEND_ROOT_URL}/${path} ...`,
      payload
    );

    try {
      const response = await this._http.request<PageData>({
        method: method,
        url: path,
        data: payload,
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

const doRequest = <T>(
  request: () => Promise<T>,
  onfulfilled: (response: T) => void,
  onrejected: (error: unknown) => void
): Promise<void> => request.call(null).then(onfulfilled).catch(onrejected);

export {doRequest};
export default client;
