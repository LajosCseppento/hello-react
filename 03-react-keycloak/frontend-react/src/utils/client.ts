import axios, {Axios, Method} from 'axios';

const BACKEND_ROOT_URL = 'http://127.0.0.1:10302';

type PageData = {
  content: string;
};

enum ClientErrorCode {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
}

class ClientError<T = unknown> extends Error {
  readonly code: ClientErrorCode;

  constructor(message: string, cause: T, code: ClientErrorCode) {
    super(message, {cause: cause});
    this.code = code;
  }
}

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

  getHome = (signal?: AbortSignal) => this.getPageDataContent('/', signal);

  getPage = (signal?: AbortSignal) => this.getPageDataContent('/page', signal);

  getFailingPage = (signal?: AbortSignal) =>
    this.getPageDataContent('/failing-page', signal);

  getEditablePage = (signal?: AbortSignal) =>
    this.getPageDataContent('/editable-page', signal);

  postEditablePage = (content: string, signal?: AbortSignal) =>
    this.postPageData('editable-page', {content: content}, signal);

  private get = (path: string, signal?: AbortSignal) =>
    this.requestPageData('GET', path, null, signal);

  private getPageDataContent = async (path: string, signal?: AbortSignal) =>
    (await this.get(path, signal)).data.content;

  private postPageData = (
    path: string,
    pageData: PageData,
    signal?: AbortSignal
  ) => this.requestPageData('POST', path, pageData, signal);

  private requestPageData = async (
    method: Method,
    path: string,
    pageData: PageData | null,
    signal?: AbortSignal
  ) => {
    console.debug(`[client] ${method} ${path} ...`, pageData);

    try {
      const request = this._http.request<PageData>({
        method: method,
        url: path,
        data: pageData,
        signal: signal,
      });

      const response = await request;

      console.debug(
        `[client] ${method} ${path} - ${response.status} ${response.statusText}`
      );

      return response;
    } catch (error) {
      throw this.handleError(method, path, error);
    }
  };

  private handleError = (method: string, path: string, error: unknown) => {
    if (axios.isCancel(error)) {
      console.debug('[client] Request cancelled', method.toUpperCase(), path);

      throw new ClientError(
        'Request cancelled',
        error,
        ClientErrorCode.Cancelled
      );
    } else {
      console.error(
        '[client] Request failed',
        method.toUpperCase(),
        path,
        error
      );
      throw new ClientError('Request failed', error, ClientErrorCode.Failed);
    }
  };
}

const client = new Client();

export default client;
