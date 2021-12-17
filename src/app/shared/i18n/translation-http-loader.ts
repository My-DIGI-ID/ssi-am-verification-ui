/*
 * Copyright 2021 Bundesrepublik Deutschland
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import ConfigInitService from '../../core/authentication/config-init.service';

export default class TranslationHttpLoader implements TranslateLoader {
  public constructor(private http: HttpClient, private readonly configService: ConfigInitService) {}

  public getTranslation(language: string): Observable<any> {
    return this.http.get<any>(
      `${this.configService.getConfigStatic().VERIFICATION_CONTROLLER_BASE_URL}/admin/i18n?languageCode=${language}`
    );
  }
}
