import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
const baseURL: string = "http://localhost:5001/api/v1";

export class Repository {
    protected api: AxiosInstance;
    protected url: string;

    constructor() {
        this.url = baseURL;
        this.api = axios.create({
          baseURL,
          headers: {
            Accept: 'application/json',
          },
        });
      }

        // Core function for API requests
  private async onData<T>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    data: any  = null,
  ): Promise<AxiosResponse<T>> {
    
    
    return this.api({
      method,
      url: `${this.url}${path}`, // Appends version parameter
      data,
    })
      .then((response) => response?.data)
      .catch((error) => error.response);
  }

  // Request Methods
  protected getData<T>(path: string, data?: any,) {
    return this.onData<T>('get', path, data);
  }

  protected postData<T>(path: string, data?: any) {
    return this.onData<T>('post', path, data);
  }

  protected putData<T>(path: string, data?: any) {
    return this.onData<T>('put', path, data, );
  }

  protected deleteData<T>(path: string, data?: any) {
    return this.onData<T>('delete', path, data);
  }

  protected patchData<T>(path: string, data?: any) {
    return this.onData<T>('patch', path, data);
  }
}

