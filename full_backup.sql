--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO evansmanyala;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.companies (
    id text NOT NULL,
    name character varying(255) NOT NULL,
    identifier character varying(50),
    "fullName" character varying(255),
    "shortName" character varying(100),
    "workPhone" character varying(20),
    city character varying(100),
    address jsonb,
    settings jsonb,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.companies OWNER TO evansmanyala;

--
-- Name: email_logs; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.email_logs (
    id text NOT NULL,
    recipient character varying(255) NOT NULL,
    subject character varying(255) NOT NULL,
    status character varying(50) NOT NULL,
    "messageId" character varying(255),
    error text,
    "sentAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "companyId" text
);


ALTER TABLE public.email_logs OWNER TO evansmanyala;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.employees (
    id text NOT NULL,
    "employeeId" character varying(50) NOT NULL,
    "firstName" character varying(100) NOT NULL,
    "lastName" character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    "phoneNumber" character varying(20),
    department character varying(100) NOT NULL,
    "position" character varying(100) NOT NULL,
    status character varying(50) NOT NULL,
    "hireDate" timestamp(3) without time zone NOT NULL,
    "terminationDate" timestamp(3) without time zone,
    salary numeric(10,2) NOT NULL,
    "emergencyContact" jsonb,
    address jsonb,
    "bankDetails" jsonb,
    "taxInfo" jsonb,
    benefits jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "companyId" text NOT NULL,
    "userId" text,
    "managerId" text
);


ALTER TABLE public.employees OWNER TO evansmanyala;

--
-- Name: failed_login_attempts; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.failed_login_attempts (
    id text NOT NULL,
    "userId" text,
    email character varying(255) NOT NULL,
    "ipAddress" character varying(45),
    "userAgent" character varying(255),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_login_attempts OWNER TO evansmanyala;

--
-- Name: form_fields; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.form_fields (
    id text NOT NULL,
    type character varying(50) NOT NULL,
    label character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    required boolean DEFAULT false NOT NULL,
    options jsonb,
    validation jsonb,
    "order" integer NOT NULL,
    "formId" text NOT NULL
);


ALTER TABLE public.form_fields OWNER TO evansmanyala;

--
-- Name: form_responses; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.form_responses (
    id text NOT NULL,
    "fieldName" character varying(255) NOT NULL,
    value text NOT NULL,
    "submissionId" text NOT NULL
);


ALTER TABLE public.form_responses OWNER TO evansmanyala;

--
-- Name: form_submissions; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.form_submissions (
    id text NOT NULL,
    "submittedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "formId" text NOT NULL,
    "submittedBy" text NOT NULL
);


ALTER TABLE public.form_submissions OWNER TO evansmanyala;

--
-- Name: forms; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.forms (
    id text NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    category character varying(50) NOT NULL,
    status character varying(50) NOT NULL,
    "isTemplate" boolean DEFAULT false NOT NULL,
    settings jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "companyId" text NOT NULL,
    "createdBy" text NOT NULL
);


ALTER TABLE public.forms OWNER TO evansmanyala;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.notifications (
    id text NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    type character varying(50) NOT NULL,
    category character varying(50) NOT NULL,
    data jsonb,
    "isRead" boolean DEFAULT false NOT NULL,
    "readAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL,
    "companyId" text NOT NULL
);


ALTER TABLE public.notifications OWNER TO evansmanyala;

--
-- Name: payroll_records; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.payroll_records (
    id text NOT NULL,
    "payPeriodStart" timestamp(3) without time zone NOT NULL,
    "payPeriodEnd" timestamp(3) without time zone NOT NULL,
    "grossSalary" numeric(10,2) NOT NULL,
    "totalDeductions" numeric(10,2) NOT NULL,
    "netSalary" numeric(10,2) NOT NULL,
    "workingDays" integer NOT NULL,
    deductions jsonb,
    allowances jsonb,
    status character varying(50) NOT NULL,
    "processedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "employeeId" text NOT NULL,
    "companyId" text NOT NULL
);


ALTER TABLE public.payroll_records OWNER TO evansmanyala;

--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.refresh_tokens (
    id text NOT NULL,
    token character varying(255) NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public.refresh_tokens OWNER TO evansmanyala;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.roles (
    id text NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(500),
    permissions text[],
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO evansmanyala;

--
-- Name: user_activities; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.user_activities (
    id text NOT NULL,
    "userId" text NOT NULL,
    action character varying(100) NOT NULL,
    "ipAddress" character varying(45),
    "userAgent" character varying(255),
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_activities OWNER TO evansmanyala;

--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.user_sessions (
    id text NOT NULL,
    "userId" text NOT NULL,
    token character varying(255) NOT NULL,
    "ipAddress" character varying(45),
    "userAgent" character varying(255),
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_sessions OWNER TO evansmanyala;

--
-- Name: users; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.users (
    id text NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "firstName" character varying(100) NOT NULL,
    "lastName" character varying(100) NOT NULL,
    "phoneNumber" character varying(20),
    avatar character varying(255),
    "isActive" boolean DEFAULT true NOT NULL,
    "emailVerified" boolean DEFAULT false NOT NULL,
    "twoFactorSecret" character varying(255),
    "backupCodes" text[],
    "resetToken" character varying(255),
    "resetTokenExpiry" timestamp(3) without time zone,
    "lastLogin" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "companyId" text NOT NULL,
    "roleId" text,
    bio text,
    language character varying(10),
    preferences jsonb,
    timezone character varying(50),
    "accountStatus" character varying(20),
    "deactivatedAt" timestamp(3) without time zone,
    "deactivationReason" text,
    "lastPasswordChange" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "passwordHistory" jsonb
);


ALTER TABLE public.users OWNER TO evansmanyala;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
379043b7-e63e-4267-bc92-e2632eeafefb	7483570939db3a60d8984414db2206709fd94c0928f36011660c158dadce7897	2025-06-17 09:15:02.279323+03	20250617061502_init	\N	\N	2025-06-17 09:15:02.098344+03	1
a741c317-91a0-4962-ab08-a82662f42d2b	fe5fb2dfdb80364bc4ccedceb0ce422de0091d7899de8498efb2e8f408057da1	2025-06-17 21:59:19.557315+03	20250616125223_add_user_profile_fields		\N	2025-06-17 21:59:19.557315+03	0
ab80ce42-b95b-47cf-8284-a4f591fd012b	13648bf05d5ef98d0c9ba3361e54cf38f406e0414e6474f019d184aca394c2ca	2025-06-17 21:59:25.747107+03	20250616125727_add_security_fields		\N	2025-06-17 21:59:25.747107+03	0
bcc49a01-bfe9-48ef-aac5-c412d358f7b0	3fecb7dd3ceb62e1a3031315bb77f911c3420375e39ed28b2da447d3db77c154	2025-06-17 21:59:31.632564+03	20250616060020_add_performance_indexes		\N	2025-06-17 21:59:31.632564+03	0
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.companies (id, name, identifier, "fullName", "shortName", "workPhone", city, address, settings, "isActive", "createdAt", "updatedAt") FROM stdin;
27749677-1687-407e-b04e-ffe7bcd2f34c	Default Company	DEFAULT	\N	\N	\N	\N	\N	\N	t	2025-06-17 08:59:40.699	2025-06-17 08:59:40.699
08354870-9ebb-46d7-9abb-a5afe93955e3	Test's Company	TESTUSER	\N	\N	\N	\N	\N	\N	t	2025-06-18 08:39:44.055	2025-06-18 08:39:44.055
\.


--
-- Data for Name: email_logs; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.email_logs (id, recipient, subject, status, "messageId", error, "sentAt", "companyId") FROM stdin;
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.employees (id, "employeeId", "firstName", "lastName", email, "phoneNumber", department, "position", status, "hireDate", "terminationDate", salary, "emergencyContact", address, "bankDetails", "taxInfo", benefits, "createdAt", "updatedAt", "companyId", "userId", "managerId") FROM stdin;
\.


--
-- Data for Name: failed_login_attempts; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.failed_login_attempts (id, "userId", email, "ipAddress", "userAgent", "createdAt") FROM stdin;
0186e4fd-fbee-403a-afd5-925f215c3f87	6d00647d-66e2-434e-a5ac-4b39f359ca9d	admin@example.com	\N	\N	2025-06-18 08:42:54.634
\.


--
-- Data for Name: form_fields; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.form_fields (id, type, label, name, required, options, validation, "order", "formId") FROM stdin;
\.


--
-- Data for Name: form_responses; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.form_responses (id, "fieldName", value, "submissionId") FROM stdin;
\.


--
-- Data for Name: form_submissions; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.form_submissions (id, "submittedAt", "formId", "submittedBy") FROM stdin;
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.forms (id, title, description, category, status, "isTemplate", settings, "createdAt", "updatedAt", "companyId", "createdBy") FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.notifications (id, title, message, type, category, data, "isRead", "readAt", "createdAt", "userId", "companyId") FROM stdin;
\.


--
-- Data for Name: payroll_records; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.payroll_records (id, "payPeriodStart", "payPeriodEnd", "grossSalary", "totalDeductions", "netSalary", "workingDays", deductions, allowances, status, "processedAt", "createdAt", "updatedAt", "employeeId", "companyId") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.refresh_tokens (id, token, "expiresAt", "createdAt", "userId") FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.roles (id, name, description, permissions, "isActive", "createdAt", "updatedAt") FROM stdin;
89e7208e-40b7-4850-80ff-b159bef195bc	ADMIN	Administrator role with full access	{read:all,write:all,read:users,write:users,read:roles,write:roles}	t	2025-06-17 08:59:40.644	2025-06-17 08:59:40.644
0c69d882-a7d1-46b0-af39-8160d50fa8fd	USER	Default user role with basic permissions	{read:own,write:own}	t	2025-06-17 08:59:40.697	2025-06-17 08:59:40.697
\.


--
-- Data for Name: user_activities; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.user_activities (id, "userId", action, "ipAddress", "userAgent", metadata, "createdAt") FROM stdin;
28684428-2eff-4b8b-8826-1b086b1463a2	32f10a2d-b774-49be-a184-1b2a00e77d54	USER_REGISTERED	\N	\N	{"username": "testuser"}	2025-06-18 08:39:44.358
95f0dc72-1a37-4815-ab36-5f93bb2b4015	32f10a2d-b774-49be-a184-1b2a00e77d54	USER_LOGGED_IN	\N	\N	{"username": "testuser"}	2025-06-18 08:40:49.02
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.user_sessions (id, "userId", token, "ipAddress", "userAgent", "expiresAt", "createdAt") FROM stdin;
1e2ba9dd-7884-4425-8849-c2114a761ec5	32f10a2d-b774-49be-a184-1b2a00e77d54	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMmYxMGEyZC1iNzc0LTQ5YmUtYTE4NC0xYjJhMDBlNzdkNTQiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1MDIzNTk4NCwiZXhwIjoxNzUwODQwNzg0fQ.Mhv2uyIASSzx_A25sMvjHEE8Ugd47CUAnr-ZzpiXeE4	\N	\N	2025-06-19 08:39:44.26	2025-06-18 08:39:44.268
d290098d-ed69-44b3-9d76-ff42ee174025	32f10a2d-b774-49be-a184-1b2a00e77d54	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMmYxMGEyZC1iNzc0LTQ5YmUtYTE4NC0xYjJhMDBlNzdkNTQiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1MDIzNjA0OCwiZXhwIjoxNzUwODQwODQ4fQ.neSmG7gVaFQADNLlCEslGVMmf3Ij8-Q3oYnmFr2-55k	\N	\N	2025-06-19 08:40:48.981	2025-06-18 08:40:48.982
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.users (id, username, email, password, "firstName", "lastName", "phoneNumber", avatar, "isActive", "emailVerified", "twoFactorSecret", "backupCodes", "resetToken", "resetTokenExpiry", "lastLogin", "createdAt", "updatedAt", "companyId", "roleId", bio, language, preferences, timezone, "accountStatus", "deactivatedAt", "deactivationReason", "lastPasswordChange", "passwordHistory") FROM stdin;
6d00647d-66e2-434e-a5ac-4b39f359ca9d	admin	admin@example.com	$2a$10$w0KGRj2pc.XX4TtEBQsRWeDvdLCHSj26SqsIrH7lwXQWrgluVCrXm	Admin	User	\N	\N	t	f	\N	\N	\N	\N	\N	2025-06-17 08:59:40.782	2025-06-17 08:59:40.782	27749677-1687-407e-b04e-ffe7bcd2f34c	89e7208e-40b7-4850-80ff-b159bef195bc	\N	\N	\N	\N	\N	\N	\N	2025-06-17 08:59:40.782	\N
c4f1d64c-17ad-4362-951e-c7948f563e61	johndoe	john.doe@example.com	$2a$10$ZLcPE6VFXu.qdCOKmS77HOS2c9EOg7DXkH/iXUPHMHbXDUZK9x2Ke	John	Doe	\N	\N	t	f	\N	\N	\N	\N	\N	2025-06-17 08:59:40.859	2025-06-17 08:59:40.859	27749677-1687-407e-b04e-ffe7bcd2f34c	0c69d882-a7d1-46b0-af39-8160d50fa8fd	\N	\N	\N	\N	\N	\N	\N	2025-06-17 08:59:40.859	\N
3fb4df2b-7029-4c6c-90a6-cb9a5cc9c5b3	janesmith	jane.smith@example.com	$2a$10$ZLcPE6VFXu.qdCOKmS77HOS2c9EOg7DXkH/iXUPHMHbXDUZK9x2Ke	Jane	Smith	\N	\N	t	f	\N	\N	\N	\N	\N	2025-06-17 08:59:40.863	2025-06-17 08:59:40.863	27749677-1687-407e-b04e-ffe7bcd2f34c	0c69d882-a7d1-46b0-af39-8160d50fa8fd	\N	\N	\N	\N	\N	\N	\N	2025-06-17 08:59:40.863	\N
3a6a617e-07c6-4681-b6db-a8a9485eeedd	bobwilson	bob.wilson@example.com	$2a$10$ZLcPE6VFXu.qdCOKmS77HOS2c9EOg7DXkH/iXUPHMHbXDUZK9x2Ke	Bob	Wilson	\N	\N	t	f	\N	\N	\N	\N	\N	2025-06-17 08:59:40.871	2025-06-17 08:59:40.871	27749677-1687-407e-b04e-ffe7bcd2f34c	0c69d882-a7d1-46b0-af39-8160d50fa8fd	\N	\N	\N	\N	\N	\N	\N	2025-06-17 08:59:40.871	\N
b6e95f94-a35a-412f-a8bf-b0d6497fb0e5	alicejohnson	alice.johnson@example.com	$2a$10$ZLcPE6VFXu.qdCOKmS77HOS2c9EOg7DXkH/iXUPHMHbXDUZK9x2Ke	Alice	Johnson	\N	\N	t	f	\N	\N	\N	\N	\N	2025-06-17 08:59:40.874	2025-06-17 08:59:40.874	27749677-1687-407e-b04e-ffe7bcd2f34c	0c69d882-a7d1-46b0-af39-8160d50fa8fd	\N	\N	\N	\N	\N	\N	\N	2025-06-17 08:59:40.874	\N
32f10a2d-b774-49be-a184-1b2a00e77d54	testuser	test@example.com	$2a$10$D.kM5kuWMmhmzXYYI8cSTe0PuTU6Zn2xfWLSFc3gTn6TnVAzb.0Dq	Test	User	\N	\N	t	f	\N	\N	\N	\N	2025-06-18 08:40:48.932	2025-06-18 08:39:44.092	2025-06-18 08:40:48.933	08354870-9ebb-46d7-9abb-a5afe93955e3	0c69d882-a7d1-46b0-af39-8160d50fa8fd	\N	\N	\N	\N	\N	\N	\N	2025-06-18 08:39:44.092	\N
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: email_logs email_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.email_logs
    ADD CONSTRAINT email_logs_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: failed_login_attempts failed_login_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.failed_login_attempts
    ADD CONSTRAINT failed_login_attempts_pkey PRIMARY KEY (id);


--
-- Name: form_fields form_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_fields
    ADD CONSTRAINT form_fields_pkey PRIMARY KEY (id);


--
-- Name: form_responses form_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_responses
    ADD CONSTRAINT form_responses_pkey PRIMARY KEY (id);


--
-- Name: form_submissions form_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT form_submissions_pkey PRIMARY KEY (id);


--
-- Name: forms forms_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: payroll_records payroll_records_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT payroll_records_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: user_activities user_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.user_activities
    ADD CONSTRAINT user_activities_pkey PRIMARY KEY (id);


--
-- Name: user_sessions user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: companies_identifier_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX companies_identifier_idx ON public.companies USING btree (identifier);


--
-- Name: companies_identifier_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX companies_identifier_key ON public.companies USING btree (identifier);


--
-- Name: companies_isActive_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "companies_isActive_idx" ON public.companies USING btree ("isActive");


--
-- Name: companies_name_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX companies_name_idx ON public.companies USING btree (name);


--
-- Name: email_logs_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "email_logs_companyId_idx" ON public.email_logs USING btree ("companyId");


--
-- Name: email_logs_recipient_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX email_logs_recipient_idx ON public.email_logs USING btree (recipient);


--
-- Name: email_logs_sentAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "email_logs_sentAt_idx" ON public.email_logs USING btree ("sentAt");


--
-- Name: email_logs_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX email_logs_status_idx ON public.email_logs USING btree (status);


--
-- Name: employees_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "employees_companyId_idx" ON public.employees USING btree ("companyId");


--
-- Name: employees_department_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX employees_department_idx ON public.employees USING btree (department);


--
-- Name: employees_email_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX employees_email_idx ON public.employees USING btree (email);


--
-- Name: employees_email_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX employees_email_key ON public.employees USING btree (email);


--
-- Name: employees_employeeId_companyId_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX "employees_employeeId_companyId_key" ON public.employees USING btree ("employeeId", "companyId");


--
-- Name: employees_employeeId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "employees_employeeId_idx" ON public.employees USING btree ("employeeId");


--
-- Name: employees_hireDate_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "employees_hireDate_idx" ON public.employees USING btree ("hireDate");


--
-- Name: employees_managerId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "employees_managerId_idx" ON public.employees USING btree ("managerId");


--
-- Name: employees_position_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX employees_position_idx ON public.employees USING btree ("position");


--
-- Name: employees_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX employees_status_idx ON public.employees USING btree (status);


--
-- Name: employees_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "employees_userId_idx" ON public.employees USING btree ("userId");


--
-- Name: employees_userId_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX "employees_userId_key" ON public.employees USING btree ("userId");


--
-- Name: failed_login_attempts_createdAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "failed_login_attempts_createdAt_idx" ON public.failed_login_attempts USING btree ("createdAt");


--
-- Name: failed_login_attempts_email_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX failed_login_attempts_email_idx ON public.failed_login_attempts USING btree (email);


--
-- Name: failed_login_attempts_ipAddress_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "failed_login_attempts_ipAddress_idx" ON public.failed_login_attempts USING btree ("ipAddress");


--
-- Name: failed_login_attempts_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "failed_login_attempts_userId_idx" ON public.failed_login_attempts USING btree ("userId");


--
-- Name: form_fields_formId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_fields_formId_idx" ON public.form_fields USING btree ("formId");


--
-- Name: form_fields_name_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX form_fields_name_idx ON public.form_fields USING btree (name);


--
-- Name: form_fields_order_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX form_fields_order_idx ON public.form_fields USING btree ("order");


--
-- Name: form_fields_type_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX form_fields_type_idx ON public.form_fields USING btree (type);


--
-- Name: form_responses_fieldName_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_responses_fieldName_idx" ON public.form_responses USING btree ("fieldName");


--
-- Name: form_responses_submissionId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_responses_submissionId_idx" ON public.form_responses USING btree ("submissionId");


--
-- Name: form_submissions_formId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_submissions_formId_idx" ON public.form_submissions USING btree ("formId");


--
-- Name: form_submissions_submittedAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_submissions_submittedAt_idx" ON public.form_submissions USING btree ("submittedAt");


--
-- Name: form_submissions_submittedBy_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_submissions_submittedBy_idx" ON public.form_submissions USING btree ("submittedBy");


--
-- Name: forms_category_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX forms_category_idx ON public.forms USING btree (category);


--
-- Name: forms_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "forms_companyId_idx" ON public.forms USING btree ("companyId");


--
-- Name: forms_createdAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "forms_createdAt_idx" ON public.forms USING btree ("createdAt");


--
-- Name: forms_createdBy_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "forms_createdBy_idx" ON public.forms USING btree ("createdBy");


--
-- Name: forms_isTemplate_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "forms_isTemplate_idx" ON public.forms USING btree ("isTemplate");


--
-- Name: forms_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX forms_status_idx ON public.forms USING btree (status);


--
-- Name: forms_title_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX forms_title_idx ON public.forms USING btree (title);


--
-- Name: notifications_category_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX notifications_category_idx ON public.notifications USING btree (category);


--
-- Name: notifications_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "notifications_companyId_idx" ON public.notifications USING btree ("companyId");


--
-- Name: notifications_createdAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "notifications_createdAt_idx" ON public.notifications USING btree ("createdAt");


--
-- Name: notifications_isRead_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "notifications_isRead_idx" ON public.notifications USING btree ("isRead");


--
-- Name: notifications_type_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX notifications_type_idx ON public.notifications USING btree (type);


--
-- Name: notifications_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "notifications_userId_idx" ON public.notifications USING btree ("userId");


--
-- Name: payroll_records_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_records_companyId_idx" ON public.payroll_records USING btree ("companyId");


--
-- Name: payroll_records_employeeId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_records_employeeId_idx" ON public.payroll_records USING btree ("employeeId");


--
-- Name: payroll_records_payPeriodEnd_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_records_payPeriodEnd_idx" ON public.payroll_records USING btree ("payPeriodEnd");


--
-- Name: payroll_records_payPeriodStart_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_records_payPeriodStart_idx" ON public.payroll_records USING btree ("payPeriodStart");


--
-- Name: payroll_records_processedAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_records_processedAt_idx" ON public.payroll_records USING btree ("processedAt");


--
-- Name: payroll_records_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX payroll_records_status_idx ON public.payroll_records USING btree (status);


--
-- Name: refresh_tokens_expiresAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "refresh_tokens_expiresAt_idx" ON public.refresh_tokens USING btree ("expiresAt");


--
-- Name: refresh_tokens_token_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX refresh_tokens_token_idx ON public.refresh_tokens USING btree (token);


--
-- Name: refresh_tokens_token_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX refresh_tokens_token_key ON public.refresh_tokens USING btree (token);


--
-- Name: refresh_tokens_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "refresh_tokens_userId_idx" ON public.refresh_tokens USING btree ("userId");


--
-- Name: roles_isActive_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "roles_isActive_idx" ON public.roles USING btree ("isActive");


--
-- Name: roles_name_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX roles_name_idx ON public.roles USING btree (name);


--
-- Name: roles_name_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);


--
-- Name: user_activities_action_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX user_activities_action_idx ON public.user_activities USING btree (action);


--
-- Name: user_activities_createdAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "user_activities_createdAt_idx" ON public.user_activities USING btree ("createdAt");


--
-- Name: user_activities_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "user_activities_userId_idx" ON public.user_activities USING btree ("userId");


--
-- Name: user_sessions_expiresAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "user_sessions_expiresAt_idx" ON public.user_sessions USING btree ("expiresAt");


--
-- Name: user_sessions_token_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX user_sessions_token_idx ON public.user_sessions USING btree (token);


--
-- Name: user_sessions_token_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX user_sessions_token_key ON public.user_sessions USING btree (token);


--
-- Name: user_sessions_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "user_sessions_userId_idx" ON public.user_sessions USING btree ("userId");


--
-- Name: users_accountStatus_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_accountStatus_idx" ON public.users USING btree ("accountStatus");


--
-- Name: users_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_companyId_idx" ON public.users USING btree ("companyId");


--
-- Name: users_emailVerified_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_emailVerified_idx" ON public.users USING btree ("emailVerified");


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_isActive_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_isActive_idx" ON public.users USING btree ("isActive");


--
-- Name: users_lastLogin_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_lastLogin_idx" ON public.users USING btree ("lastLogin");


--
-- Name: users_lastPasswordChange_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_lastPasswordChange_idx" ON public.users USING btree ("lastPasswordChange");


--
-- Name: users_roleId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_roleId_idx" ON public.users USING btree ("roleId");


--
-- Name: users_username_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX users_username_idx ON public.users USING btree (username);


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: email_logs email_logs_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.email_logs
    ADD CONSTRAINT "email_logs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: employees employees_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "employees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employees employees_managerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "employees_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: employees employees_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: failed_login_attempts failed_login_attempts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.failed_login_attempts
    ADD CONSTRAINT "failed_login_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: form_fields form_fields_formId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_fields
    ADD CONSTRAINT "form_fields_formId_fkey" FOREIGN KEY ("formId") REFERENCES public.forms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: form_responses form_responses_submissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_responses
    ADD CONSTRAINT "form_responses_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES public.form_submissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: form_submissions form_submissions_formId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT "form_submissions_formId_fkey" FOREIGN KEY ("formId") REFERENCES public.forms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: form_submissions form_submissions_submittedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT "form_submissions_submittedBy_fkey" FOREIGN KEY ("submittedBy") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: forms forms_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT "forms_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: forms forms_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT "forms_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: notifications notifications_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: notifications notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payroll_records payroll_records_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT "payroll_records_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payroll_records payroll_records_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT "payroll_records_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_activities user_activities_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.user_activities
    ADD CONSTRAINT "user_activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_sessions user_sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT "user_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO evansmanyala;


--
-- PostgreSQL database dump complete
--

