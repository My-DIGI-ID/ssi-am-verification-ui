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

export default class GuestDetailsViewModel {
  id!: string;

  title!: string;

  firstName!: string;

  lastName!: string;

  arriving!: string;

  leaving!: string;

  location!: string;

  status!: string;

  company!: string;

  companyAddress!: string;

  typeOfVisit!: string;

  phoneNumber!: string;

  secondPhoneNumber?: string;

  licensePlateNumber!: string;

  email!: string;

  invitedByName!: string;

  invitedByPhoneNumber!: string;

  invitedByEmail!: string;
}
