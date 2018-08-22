import { ExecutionResult } from 'graphql/execution/execute';
import { DocumentNode } from 'graphql/language/ast';
import $$observable from 'symbol-observable';

export interface Observer<T> {
  next?: (value: T) => void;
  error?: (error: Error) => void;
  complete?: () => void;
}

export interface Observable<T> {
  subscribe(
    observer: Observer<T>,
  ): {
    unsubscribe: () => void;
  };
}

export interface OperationOptions {
  query?: string | DocumentNode;
  variables?: Object;
  operationName?: string;
  [key: string]: any;
}

export type FormatedError = Error & {
  originalError?: any;
};

export interface Operation {
  options: OperationOptions;
  handler: (error: Error[], result?: any) => void;
}

export interface Operations {
  [id: string]: Operation;
}

export type SendFn = (
  id: string,
  type: string,
  payload: any
) => void;

export type ReceiveCb = (
  id: string,
  type: string,
  payload: any,
) => void;

export type BindReceiveFn = (callback: ReceiveCb) => void;

export class SubscriptionClient {
  private operations: Operations = {};
  private id: number = 0;
  private send: SendFn;

  constructor(send: SendFn, bind: BindReceiveFn) {
    this.send = send;

    bind(this.onMessage.bind(this));
  }

  public request(request: OperationOptions): Observable<ExecutionResult> {
    const getObserver = this.getObserver.bind(this);
    const executeOperation = this.executeOperation.bind(this);

    return {
      [$$observable]() {
        return this;
      },
      subscribe(
        observerOrNext:
          | (Observer<ExecutionResult>)
          | ((v: ExecutionResult) => void),
        onError?: (error: Error) => void,
        onComplete?: () => void,
      ) {
        const observer = getObserver(observerOrNext, onError, onComplete);
        const finish = executeOperation(request, (error: Error[], result: any) => {
          if (error === null && result === null) {
            if (observer.complete) {
              observer.complete();
            }
          } else if (error) {
            if (observer.error) {
              observer.error(error[0]);
            }
          } else {
            if (observer.next) {
              observer.next(result);
            }
          }
        });

        return {
          unsubscribe: () => finish(),
        };
      },
    };
  }

  private executeOperation(
    options: OperationOptions,
    handler: (error: Error[], result?: any) => void,
  ): string {
    const id = this.id++;
    this.operations[id] = { options: options, handler };
    this.send(id, MessageTypes.GQL_START, options);

    return () => {
      if (this.operations[id]) {
        delete this.operations[id];
        this.sendMessage(id, MessageTypes.GQL_STOP, undefined);
      }
    }
  }

  private getObserver<T>(
    observerOrNext: (Observer<T>) | ((v: T) => void),
    error?: (e: Error) => void,
    complete?: () => void,
  ): Observer<T> {
    if (typeof observerOrNext === 'function') {
      return {
        next: (v: T) => observerOrNext(v),
        error: (e: Error) => error && error(e),
        complete: () => complete && complete(),
      };
    }

    return observerOrNext;
  }

  private formatErrors(errors: any): FormatedError[] {
    if (Array.isArray(errors)) {
      return errors;
    }

    // TODO  we should not pass ValidationError to callback in the future.
    // ValidationError
    if (errors && errors.errors) {
      return this.formatErrors(errors.errors);
    }

    if (errors && errors.message) {
      return [errors];
    }

    return [
      {
        name: 'FormatedError',
        message: 'Unknown error',
        originalError: errors,
      },
    ];
  }

  private onMessage(id, type, payload) {
    switch (type) {
      case MessageTypes.GQL_COMPLETE:
        if (this.operations[id]) {
          this.operations[id].handler(null, null);
          delete this.operations[id];
        }
        break;

      case MessageTypes.GQL_ERROR:
        if (this.operations[id]) {
          this.operations[id].handler(this.formatErrors(payload), null);
          delete this.operations[id];
        }
        break;

      case MessageTypes.GQL_DATA:
        if (this.operations[id]) {
          const parsedPayload = !payload.errors
            ? payload
            : { ...payload, errors: this.formatErrors(payload.errors) };
          this.operations[id].handler(null, parsedPayload);
        }
        break;

      default:
        throw new Error('Invalid message type!');
    }
  }

  private finishOperation(id: string) {
    if (this.operations[id]) {
      delete this.operations[id];
      this.sendMessage(id, MessageTypes.GQL_STOP, undefined);
    }
  }
}
