import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'https://www.crcind.com:443';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  resultAsXML: string;
  resultAsJson: any;
  
  constructor(private http: HttpClient) { 
    this.resultAsXML = '';
  }

  getUser(userId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/SOAP.Demo.FindPerson'
    });
    const body = this.createXMLBody(userId);
    this.http.post(`${baseUrl}/csp/samples/SOAP.Demo.cls`, body, { headers, responseType: 'text'}).subscribe((xmlResponse) => {
      this.resultAsXML = xmlResponse;
      console.log('**** result as XMLS', this.resultAsXML);
      this.resultAsJson = this.parseXmlToJson(xmlResponse);
      console.log('**** result as JSON', this.resultAsJson);
    });
  }

  private createXMLBody(userId: string): string {
    return `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <FindPerson xmlns="http://tempuri.org">
          <id>${userId}</id>
        </FindPerson>
      </soap:Body>
    </soap:Envelope>`;
  }

  parseXmlToJson(xml: string) {
    const json: any = {};
    for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
        const key = res[1] || res[3];
        const value = res[2] && this.parseXmlToJson(res[2]);
        json[key] = ((value && Object.keys(value).length) ? value : res[2]) || null;
    }
    return json;
  }
}
