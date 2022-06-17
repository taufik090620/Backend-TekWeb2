CREATE TABLE IF NOT EXISTS public.users
(
    id VARCHAR(36) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url VARCHAR(255),
    email_verification_token VARCHAR(255) UNIQUE,
    email_verified_at TIMESTAMPTZ,
    forgot_password_token VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,

    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE INDEX index_users_email ON public.users (email);