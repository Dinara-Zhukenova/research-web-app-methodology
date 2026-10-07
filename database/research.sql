--
-- PostgreSQL database dump
--

\restrict JbVdsZwQarxJllfg1f7bBtfQsHkjC6dMdZa1NfgV6wHkPvjTJfEcN4OBCewVIxv

-- Dumped from database version 17.11 (Debian 17.11-1.pgdg12+2)
-- Dumped by pg_dump version 17.11 (Debian 17.11-1.pgdg12+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: app
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO app;

--
-- Name: measurements; Type: TABLE; Schema: public; Owner: app
--

CREATE TABLE public.measurements (
    id integer NOT NULL,
    measured_at timestamp with time zone NOT NULL,
    control_mode character varying(20) NOT NULL,
    voltage double precision NOT NULL,
    current double precision NOT NULL,
    power double precision NOT NULL,
    lux double precision NOT NULL,
    lighting_on boolean NOT NULL,
    device_online boolean NOT NULL,
    data_source character varying(30) NOT NULL,
    note character varying(500),
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.measurements OWNER TO app;

--
-- Name: measurements_id_seq; Type: SEQUENCE; Schema: public; Owner: app
--

CREATE SEQUENCE public.measurements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.measurements_id_seq OWNER TO app;

--
-- Name: measurements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app
--

ALTER SEQUENCE public.measurements_id_seq OWNED BY public.measurements.id;


--
-- Name: measurements id; Type: DEFAULT; Schema: public; Owner: app
--

ALTER TABLE ONLY public.measurements ALTER COLUMN id SET DEFAULT nextval('public.measurements_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: app
--

COPY public.alembic_version (version_num) FROM stdin;
20261008_01
\.


--
-- Data for Name: measurements; Type: TABLE DATA; Schema: public; Owner: app
--

COPY public.measurements (id, measured_at, control_mode, voltage, current, power, lux, lighting_on, device_online, data_source, note, created_at) FROM stdin;
1	2026-10-07 15:52:55.490227+00	conventional	218.6	3.2	699.5	48	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
2	2026-10-07 15:58:55.490227+00	conventional	222.3	3.04	675.8	35	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
3	2026-10-07 16:04:55.490227+00	conventional	221	3.22	711.6	60.3	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
4	2026-10-07 16:10:55.490227+00	conventional	220.7	3.29	726.1	59.6	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
5	2026-10-07 16:16:55.490227+00	conventional	221.8	3.23	716.4	35.8	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
6	2026-10-07 16:22:55.490227+00	conventional	221.1	3.04	672.1	61.8	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
7	2026-10-07 16:28:55.490227+00	conventional	220.2	3.33	733.3	55.8	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
8	2026-10-07 16:34:55.490227+00	conventional	221.4	3.08	681.9	36.3	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
9	2026-10-07 16:40:55.490227+00	conventional	222.9	3.37	751.2	61.2	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
10	2026-10-07 16:46:55.490227+00	conventional	223	3.21	715.8	28.4	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
11	2026-10-07 16:52:55.490227+00	conventional	219.7	3.22	707.4	38.1	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
12	2026-10-07 16:58:55.490227+00	conventional	220.3	3.35	738	56.7	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
13	2026-10-07 17:04:55.490227+00	conventional	220.9	3.01	664.9	57	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
14	2026-10-07 17:10:55.490227+00	conventional	219.8	3.17	696.8	42.9	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
15	2026-10-07 17:16:55.490227+00	conventional	220.9	3.2	706.9	30.2	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
16	2026-10-07 17:22:55.490227+00	conventional	220.5	3.3	727.6	52	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
17	2026-10-07 17:28:55.490227+00	conventional	220.5	3.37	743.1	36.6	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
18	2026-10-07 17:34:55.490227+00	conventional	220.1	3.37	741.7	46.6	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
19	2026-10-07 17:40:55.490227+00	conventional	220.6	3.01	664	35.1	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
20	2026-10-07 17:46:55.490227+00	conventional	218.6	3.02	660.2	56.7	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
21	2026-10-07 17:52:55.490227+00	adaptive	222.4	1.87	415.9	53	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
22	2026-10-07 17:58:55.490227+00	adaptive	220.4	2.14	471.7	35.3	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
23	2026-10-07 18:04:55.490227+00	adaptive	222.4	2.24	498.2	45.6	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
24	2026-10-07 18:10:55.490227+00	adaptive	220.3	2.45	539.7	69.4	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
25	2026-10-07 18:16:55.490227+00	adaptive	220.7	2.19	483.3	55.1	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
26	2026-10-07 18:22:55.490227+00	adaptive	219.5	2.36	518	47.6	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
27	2026-10-07 18:28:55.490227+00	adaptive	220.4	2.42	533.4	44.5	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
28	2026-10-07 18:34:55.490227+00	adaptive	219.5	1.99	436.8	26.5	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
29	2026-10-07 18:40:55.490227+00	adaptive	221.3	2.22	491.3	45.6	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
30	2026-10-07 18:46:55.490227+00	adaptive	220.6	2.14	472.1	66.5	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
31	2026-10-07 18:52:55.490227+00	adaptive	219.3	2.14	469.3	48	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
32	2026-10-07 18:58:55.490227+00	adaptive	222.1	2.37	526.4	50.1	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
33	2026-10-07 19:04:55.490227+00	adaptive	222.5	2.38	529.5	39.2	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
34	2026-10-07 19:10:55.490227+00	adaptive	222.6	1.87	416.3	56	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
35	2026-10-07 19:16:55.490227+00	adaptive	221.9	2.16	479.3	45.4	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
36	2026-10-07 19:22:55.490227+00	adaptive	222.8	2.48	552.5	62.9	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
37	2026-10-07 19:28:55.490227+00	adaptive	220.4	1.85	407.7	37	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
38	2026-10-07 19:34:55.490227+00	adaptive	220.5	1.87	412.3	58.6	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
39	2026-10-07 19:40:55.490227+00	adaptive	220.1	2.11	464.4	25.6	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
40	2026-10-07 19:46:55.490227+00	adaptive	218	2.21	481.8	66.9	t	t	simulation	Синтетическое наблюдение для пилотного исследования	2026-10-07 19:52:55.487008+00
\.


--
-- Name: measurements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app
--

SELECT pg_catalog.setval('public.measurements_id_seq', 41, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: app
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: measurements measurements_pkey; Type: CONSTRAINT; Schema: public; Owner: app
--

ALTER TABLE ONLY public.measurements
    ADD CONSTRAINT measurements_pkey PRIMARY KEY (id);


--
-- Name: ix_measurements_control_mode; Type: INDEX; Schema: public; Owner: app
--

CREATE INDEX ix_measurements_control_mode ON public.measurements USING btree (control_mode);


--
-- Name: ix_measurements_data_source; Type: INDEX; Schema: public; Owner: app
--

CREATE INDEX ix_measurements_data_source ON public.measurements USING btree (data_source);


--
-- Name: ix_measurements_measured_at; Type: INDEX; Schema: public; Owner: app
--

CREATE INDEX ix_measurements_measured_at ON public.measurements USING btree (measured_at);


--
-- Name: ix_measurements_power; Type: INDEX; Schema: public; Owner: app
--

CREATE INDEX ix_measurements_power ON public.measurements USING btree (power);


--
-- PostgreSQL database dump complete
--

\unrestrict JbVdsZwQarxJllfg1f7bBtfQsHkjC6dMdZa1NfgV6wHkPvjTJfEcN4OBCewVIxv

