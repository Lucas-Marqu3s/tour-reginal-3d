/**
 * Polyfills para suportar Blob, FileReader e URL APIs no React Native
 * Necessário para carregar texturas de arquivos GLTF com THREE.js
 */

// Salvar referência ao Blob original se existir
const OriginalBlob = global.Blob;

// Sobrescrever Blob para suportar ArrayBuffer e ArrayBufferView
class BlobPolyfill {
  _data: any[];
  type: string;
  size: number;

  constructor(parts: any[] = [], options: any = {}) {
    this._data = [];
    this.type = options.type || '';
    this.size = 0;

    // Processar cada parte
    for (const part of parts) {
      if (part instanceof ArrayBuffer) {
        this._data.push(part);
        this.size += part.byteLength;
      } else if (ArrayBuffer.isView(part)) {
        // ArrayBufferView (TypedArray, DataView, etc)
        this._data.push(part.buffer.slice(part.byteOffset, part.byteOffset + part.byteLength));
        this.size += part.byteLength;
      } else if (typeof part === 'string') {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(part);
        this._data.push(encoded.buffer);
        this.size += encoded.byteLength;
      } else if (part instanceof BlobPolyfill) {
        this._data.push(...part._data);
        this.size += part.size;
      } else {
        // Tentar converter para string
        const str = String(part);
        const encoder = new TextEncoder();
        const encoded = encoder.encode(str);
        this._data.push(encoded.buffer);
        this.size += encoded.byteLength;
      }
    }
  }

  async text() {
    const arrayBuffer = await this.arrayBuffer();
    const decoder = new TextDecoder();
    return decoder.decode(arrayBuffer);
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    if (this._data.length === 0) {
      return new ArrayBuffer(0);
    }

    if (this._data.length === 1) {
      return this._data[0];
    }

    // Concatenar múltiplos ArrayBuffers
    const result = new Uint8Array(this.size);
    let offset = 0;
    for (const buffer of this._data) {
      result.set(new Uint8Array(buffer), offset);
      offset += buffer.byteLength;
    }
    return result.buffer;
  }

  slice(start: number = 0, end?: number, contentType?: string) {
    // Implementação simplificada de slice
    const actualEnd = end === undefined ? this.size : end;
    // Para simplificar, vamos retornar um novo blob com os mesmos dados
    return new BlobPolyfill(this._data, { type: contentType || this.type });
  }
}

// Sobrescrever o Blob global
(global as any).Blob = BlobPolyfill;

// Polyfill para FileReader
class FileReaderPolyfill {
  result: any = null;
  error: any = null;
  onload: ((event: any) => void) | null = null;
  onerror: ((event: any) => void) | null = null;
  onloadend: ((event: any) => void) | null = null;
  onloadstart: ((event: any) => void) | null = null;
  onprogress: ((event: any) => void) | null = null;
  readyState: number = 0;

  EMPTY = 0;
  LOADING = 1;
  DONE = 2;

  readAsArrayBuffer(blob: any) {
    this.readyState = this.LOADING;
    if (this.onloadstart) this.onloadstart({ target: this });

    setTimeout(async () => {
      try {
        if (blob instanceof ArrayBuffer) {
          this.result = blob;
        } else if (blob.arrayBuffer) {
          this.result = await blob.arrayBuffer();
        } else if (blob._data && blob._data.length > 0) {
          this.result = await new BlobPolyfill(blob._data).arrayBuffer();
        } else {
          throw new Error('Blob format not supported');
        }

        this.readyState = this.DONE;
        if (this.onload) this.onload({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      } catch (error) {
        this.error = error;
        this.readyState = this.DONE;
        if (this.onerror) this.onerror({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      }
    }, 0);
  }

  readAsDataURL(blob: any) {
    this.readyState = this.LOADING;
    if (this.onloadstart) this.onloadstart({ target: this });

    setTimeout(async () => {
      try {
        const arrayBuffer = await blob.arrayBuffer();
        const base64 = this._arrayBufferToBase64(arrayBuffer);
        this.result = `data:${blob.type || 'application/octet-stream'};base64,${base64}`;

        this.readyState = this.DONE;
        if (this.onload) this.onload({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      } catch (error) {
        this.error = error;
        this.readyState = this.DONE;
        if (this.onerror) this.onerror({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      }
    }, 0);
  }

  readAsText(blob: any, encoding: string = 'utf-8') {
    this.readyState = this.LOADING;
    if (this.onloadstart) this.onloadstart({ target: this });

    setTimeout(async () => {
      try {
        this.result = await blob.text();
        this.readyState = this.DONE;
        if (this.onload) this.onload({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      } catch (error) {
        this.error = error;
        this.readyState = this.DONE;
        if (this.onerror) this.onerror({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      }
    }, 0);
  }

  abort() {
    this.readyState = this.DONE;
    this.error = new Error('Read aborted');
    if (this.onerror) this.onerror({ target: this });
    if (this.onloadend) this.onloadend({ target: this });
  }

  _arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const chunkSize = 8192;

    for (let i = 0; i < bytes.byteLength; i += chunkSize) {
      const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.byteLength));
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }

    return btoa(binary);
  }
}

(global as any).FileReader = FileReaderPolyfill;

// Polyfill para URL.createObjectURL e revokeObjectURL
const blobURLs = new Map<string, any>();
let blobIdCounter = 0;

const originalCreateObjectURL = URL.createObjectURL;
const originalRevokeObjectURL = URL.revokeObjectURL;

URL.createObjectURL = function(blob: any) {
  // Se for um Blob nativo e a função original existir, usar ela
  if (OriginalBlob && blob instanceof OriginalBlob && originalCreateObjectURL) {
    try {
      return originalCreateObjectURL.call(URL, blob);
    } catch (e) {
      // Se falhar, continuar com nossa implementação
    }
  }

  const id = `blob:rn-polyfill-${blobIdCounter++}`;
  blobURLs.set(id, blob);
  return id;
};

URL.revokeObjectURL = function(url: string) {
  if (url.startsWith('blob:rn-polyfill-')) {
    blobURLs.delete(url);
  } else if (originalRevokeObjectURL) {
    originalRevokeObjectURL.call(URL, url);
  }
};

// Interceptar XMLHttpRequest para lidar com blob URLs
const OriginalXHR = XMLHttpRequest;
const originalXHROpen = OriginalXHR.prototype.open;

XMLHttpRequest.prototype.open = function(method: string, url: string | URL, ...args: any[]) {
  const urlString = typeof url === 'string' ? url : url.toString();

  if (urlString.startsWith('blob:rn-polyfill-')) {
    const blob = blobURLs.get(urlString);

    if (blob) {
      // Armazenar referência ao blob para usar no send
      (this as any)._blobData = blob;
      (this as any)._isBlobURL = true;

      // Chamar o open original com uma URL dummy
      return originalXHROpen.call(this, method, 'about:blank', ...args);
    }
  }

  return originalXHROpen.call(this, method, url as any, ...args);
};

const originalXHRSend = OriginalXHR.prototype.send;

XMLHttpRequest.prototype.send = function(body?: any) {
  if ((this as any)._isBlobURL && (this as any)._blobData) {
    const blob = (this as any)._blobData;

    // Simular carregamento assíncrono
    setTimeout(async () => {
      try {
        const arrayBuffer = await blob.arrayBuffer();

        // Definir propriedades de resposta
        Object.defineProperty(this, 'response', {
          value: arrayBuffer,
          writable: false,
          configurable: true
        });
        Object.defineProperty(this, 'responseText', {
          value: '',
          writable: false,
          configurable: true
        });
        Object.defineProperty(this, 'status', {
          value: 200,
          writable: false,
          configurable: true
        });
        Object.defineProperty(this, 'statusText', {
          value: 'OK',
          writable: false,
          configurable: true
        });
        Object.defineProperty(this, 'readyState', {
          value: 4,
          writable: false,
          configurable: true
        });

        // Disparar eventos
        if (this.onreadystatechange) {
          this.onreadystatechange({ target: this } as any);
        }
        if (this.onload) {
          this.onload({ target: this, loaded: arrayBuffer.byteLength, total: arrayBuffer.byteLength } as any);
        }
      } catch (error) {
        Object.defineProperty(this, 'status', {
          value: 500,
          writable: false,
          configurable: true
        });
        Object.defineProperty(this, 'statusText', {
          value: 'Internal Error',
          writable: false,
          configurable: true
        });

        if (this.onerror) {
          this.onerror({ target: this } as any);
        }
      }
    }, 0);

    return;
  }

  return originalXHRSend.call(this, body);
};

console.log('[Blob Polyfill] Polyfills loaded successfully');
