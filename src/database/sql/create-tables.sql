CREATE TABLE IF NOT EXISTS medical_specialties (
    id_specialty SERIAL PRIMARY KEY,
    specialty VARCHAR(100) UNIQUE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctor (
    id_doctor SERIAL PRIMARY KEY,
    doctor_name VARCHAR(100),
    id_specialty INT REFERENCES medical_specialties (id_specialty),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS day_of_week (
    id_day_of_week SERIAL PRIMARY KEY,
    day VARCHAR(10) UNIQUE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS availability (
    id_availability SERIAL PRIMARY KEY,
    id_doctor INT REFERENCES doctor (id_doctor),
    id_day_of_week INT REFERENCES day_of_week (id_day_of_week),
    start_time TIME,
    end_time TIME,
    appointment_time INT,
    recurrent BOOLEAN,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blockers (
    id_block SERIAL PRIMARY KEY,
    id_availability INT REFERENCES availability (id_availability),
    all_day BOOLEAN,
    start_time TIME,
    end_time TIME,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patient (
    id_patient SERIAL PRIMARY KEY,
    patient_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointment (
    id_appointment SERIAL PRIMARY KEY,
    id_doctor INT REFERENCES doctor (id_doctor),
    id_patient INT REFERENCES patient (id_patient),
    doctor_name VARCHAR(100),
    patient_name VARCHAR(100),
    symptoms VARCHAR(255),
    date DATE,
    time TIME,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_date TIMESTAMP
);