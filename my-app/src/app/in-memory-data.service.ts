import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, STATUS, ResponseOptions, getStatusText } from 'angular-in-memory-web-api';
import { Response } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const users = [
      { id: 11, firstName: 'Reyaansh', lastName: 'Narkhede', email: 'rnn@gmail.com', password: 'rrr' },
      { id: 12, firstName: 'Vaishali', lastName: 'Narkhede', email: 'vnn@gmail.com', password: 'vvv' }      
    ];
    return { users };
  }

  getToken(user) {
    return 'this is a token';
  }

  post(reqInfo: RequestInfo) {

    if (reqInfo.id === 'login') {
      console.log('from login');
      return reqInfo.utils.createResponse$(() => {
        const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
        const user = reqInfo.collection.find(user => {
          return reqInfo.req['body'].email === user.email && reqInfo.req['body'].email === user.password === user.password;
        });

        let responseBody = {};

        if (users) {
          responseBody = {
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            token: this.getToken(users)
          };
        }

        const options: ResponseOptions = responseBody ?
          {
            body: dataEncapsulation ? { responseBody } : responseBody,
            status: 200
          } :
          {
            body: { error: `'User' with email='$(reqInfo.req['body'].email)' not found` },
            status: 404
          };

        options.statusText = getStatusText(options.status);
        options.headers = headers;
        options.url = url;
        return options;
      });
    } else if (reqInfo.id === 'signup') {
      reqInfo.id = null;
      console.log('from signup');
    }

  }
}
