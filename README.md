# Hospital Appointment Scheduler

### Contents

- [Description](#description)
- [🛠️ Install project](#️-install-project)
  - [Run with Docker](#run-with-docker)
- [📦 Environment variables](#-environment-variables)
- [💻 Built with](#-built-with)

---

## Description

<hr>

## API

### Base URL

```javascript
const BASE_URL = "http://localhost:3001/api/v1";
```

### Doctor

#### Get all doctors

##### `/doctor`

- **GET** :

```javascript
`${BASE_URL}/doctor?search={search string}&limit={limit number}&page={page number}`;
```

Get all doctors

| Parameter | Type   | Required | Description                                   | Default |
| --------- | ------ | -------- | --------------------------------------------- | ------- |
| limit     | string | No       | Maximum number of records returned.           | 5       |
| page      | number | No       | To return records skipping the limit n times. | 0       |
| search    | string | No       | Part of the name to search for.               | none    |

<details>
<summary>
Reponse 
</summary>
<br>

Status `200 OK`
<br>

```json
{
  "results": [
    {
      "id_doctor": 1,
      "doctor_name": "Doctor Lorem",
      "specialty": "Surgery",
      "email": "doctor_lorem@email.com"
    },
    {
      "id_doctor": 2,
      "doctor_name": "Doctor Ipsum",
      "specialty": "Cardiology",
      "email": "doctor_ipsum@email.com"
    },
    {
      "id_doctor": 3,
      "doctor_name": "Doctor Ipsum Lorem",
      "specialty": "Urology",
      "email": "doctor_ipsum_lorem@email.com"
    },
    {
      "id_doctor": 4,
      "doctor_name": "Doctor Cicero",
      "specialty": "Ophthalmology",
      "email": "doctor_cicero@email.com"
    },
    {
      "id_doctor": 5,
      "doctor_name": "Doctor Consectetur",
      "specialty": "Generalist",
      "email": "doctor_consectetur@email.com"
    }
  ],
  "total": 100
}
```

</details>

#### Get one doctor by id

##### `/doctor/:doctorId`

- **GET** :

```javascript
`${BASE_URL}/doctor/{doctorId}`;
```

Get one doctor by id

| Parameter | Type   | Required | Description | Default |
| --------- | ------ | -------- | ----------- | ------- |
| id        | string | yes      | Doctor id.  | none    |

<details>
<summary>
Reponse 
</summary>
<br>

Status `200 OK`

```json
{
  "id_doctor": 1,
  "doctor_name": "Doctor Lorem",
  "specialty": "Surgery",
  "email": "doctor_lorem@email.com"
}
```

OR

Status `404 Not found`

```json
{ "message": "Doctor not found!" }
```

</details>

#### Create a new doctor

##### `/doctor`

- **POST** :

```javascript
`${BASE_URL}/doctor`;
```

Body required:

```json
{
  "doctor_name": "Doctor Lorem",
  "id_specialty": 1,
  "email": "doctor_lorem@email.com",
  "password": "password123"
}
```

| Body parameter | Type   | Required | Description     | Unique |
| -------------- | ------ | -------- | --------------- | ------ |
| doctor_name    | string | yes      | Doctor name     | no     |
| id_specialty   | number | no       | Specialty\*     | no     |
| email          | string | yes      | Doctor email    | yes    |
| password       | string | yes      | Strong password | no     |

\* From table [medical_specialties]()

<details>
<summary>
Reponse 
</summary>

<br>

Status `201 OK`

```json
{
  "id_doctor": 1,
  "doctor_name": "Doctor Lorem",
  "specialty": "Surgery",
  "email": "doctor_lorem@email.com"
}
```

OR

Status `400 Bad request`

```json
{
  "message": "Invalid parameters!",
  "bad_parameters": ["email", "id_specialty"]
}
```

</details>

#### Edit a doctor

##### `/doctor/{doctorId}`

- **PATCH** :

```javascript
`${BASE_URL}/doctor/{doctorId}`;
```

- Headers (application/json)

      Authorization: Bearer [access_token]

Body required:

```json
{
  "doctor_name": "Doctor Lorem",
  "id_specialty": 1,
  "email": "doctor_lorem@email.com",
  "password": "password123"
}
```

| Body parameter | Type   | Required | Description     | Unique |
| -------------- | ------ | -------- | --------------- | ------ |
| doctor_name    | string | no       | Doctor name     | no     |
| id_specialty   | number | no       | Specialty\*     | no     |
| email          | string | no       | Doctor email    | yes    |
| password       | string | no       | Strong password | no     |

\* From table [medical_specialties]()

<details>
<summary>
Reponse 
</summary>

<br>

Status `200 OK`

```json
{
  "id_doctor": 1,
  "doctor_name": "Doctor Lorem",
  "specialty": "Surgery",
  "email": "doctor_lorem@email.com"
}
```

OR

Status `400 Bad request`

```json
{
  "message": "Invalid parameters!",
  "bad_parameters": ["email", "id_specialty"]
}
```

OR

Status `401 Unathorized`

```json
{
  "message": "Your token is invalid!"
}
```

OR

Status `404 Not found`

```json
{ "message": "Doctor not found!" }
```

</details>

#### Delete a doctor

##### `/doctor/{doctorId}`

- **DELETE** :

```javascript
`${BASE_URL}/doctor/{doctorId}`;
```

- Headers (application/json)

      Authorization: Bearer [access_token]

Body required:

```
none
```

<details>
<summary>
Reponse 
</summary>

<br>

Status `204 No Content`

```
 No Content
```

OR

Status `401 Unathorized`

```json
{
  "message": "Your token is invalid!"
}
```

OR

Status `404 Not found`

```json
{ "message": "Doctor not found!" }
```

</details>

## 🛠️ Install project

1. Clone the repository

```bash
git clone https://github.com/Megas-MDN/hospital-appointment-scheduler-backend.git
```

2. Enter the cloned folder

```bash
cd hospital-appointment-scheduler-backend
```

3. Install the dependencies

```bash
npm install
```

4. Build the project

```bash
npm start
```

5. Run in development mode

```bash
npm run dev
```

<details>
<summary>
🐳 Run with Docker
</summary>

- For running application in Docker container you should have docker installed on your system

Run app

```bash
docker compose up
```

Turn off

```bash
docker compose down
```

</details>

## 📦 Environment variables

To run this project, you will need to add the following environment variables to your .env file.

`xxxx`= Backend.

`xxxx`= Socket server

🌟 Ready to use!

## 💻 Built with

- [Javascript](https://www.w3schools.com/js/js_es6.asp) : Language
- [Nodejs](https://nodejs.org/en) : Engine
- [Express](https://expressjs.com/) : Framework api
- [JWT](https://jwt.io//) : Authentication
- [Postgresql](https://www.postgresql.org/) : Data base
- [Jest](https://jestjs.io) : Tests
- [Docker](https://www.docker.com/) : Containerize
<hr>
<p align="center">
Developed with ❤️ by Megas
</p>
