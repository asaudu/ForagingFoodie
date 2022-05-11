--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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
-- Name: blogposts; Type: TABLE; Schema: public; Owner: tpl_1121_1
--

CREATE TABLE public.blogposts (
    id integer NOT NULL,
    imageurl character varying(255),
    alt character varying(255),
    dish text NOT NULL,
    restaurant text NOT NULL,
    content text NOT NULL,
    city text NOT NULL,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL
);


ALTER TABLE public.blogposts OWNER TO tpl_1121_1;

--
-- Name: blogposts_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl_1121_1
--

ALTER TABLE public.blogposts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.blogposts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl_1121_1
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nickname character varying(255),
    email character varying(255),
    recordcreation timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO tpl_1121_1;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl_1121_1
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tpl_1121_1;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl_1121_1
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tpl_1121_1
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: blogposts; Type: TABLE DATA; Schema: public; Owner: tpl_1121_1
--

COPY public.blogposts (id, imageurl, alt, dish, restaurant, content, city, date, user_id) FROM stdin;
1	https://www.charlottefashionplate.com/wp-content/uploads/2019/03/8f01f4ef-6c25-44e2-a6fd-63464dd9a820.jpg	chicken waffles	Crispy Chicken and Waffles	Addy's Kitchen	A delicious looking plate of chicken and waffles. Lightly crisped chicken over a plushy blanket of waffles with a soft coating of syrup.	Richardson, TX	2022-05-04 00:00:00-05	1
7	https://media2.dallasobserver.com/dal/imager/u/original/11826749/meddlesomemoth_chickenandegg_tayloradams..jpg	egg and chicken over grits	Mother and Child	Meddlesome Moth	Bacon ipsum dolor amet pancetta capicola chicken corned beef, sirloin ham boudin flank alcatra cupim shankle. Meatloaf flank ribeye, venison swine pork chop pork loin pork. Strip steak t-bone andouille hamburger. Chuck ham hock strip steak prosciutto corned beef jowl. Chicken burgdoggen pig, flank rump kielbasa ribeye bresaola short ribs hamburger frankfurter tongue kevin biltong shoulder. Picanha biltong tongue landjaeger kevin jerky tenderloin, hamburger strip steak porchetta burgdoggen jowl buffalo short ribs.	Dallas, TX	2022-05-06 00:00:00-05	6
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl_1121_1
--

COPY public.users (id, nickname, email, recordcreation) FROM stdin;
1	addy_gold	addy@gmail.com	2022-05-04 13:15:36.586756-05
6	uh_leksis	lexylou@lmail.com	2022-05-05 20:41:44.313078-05
7	fuzoo2000	fuzoo2000@yahoo.com	2022-05-06 12:46:43.115329-05
\.


--
-- Name: blogposts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl_1121_1
--

SELECT pg_catalog.setval('public.blogposts_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl_1121_1
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: blogposts blogposts_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl_1121_1
--

ALTER TABLE ONLY public.blogposts
    ADD CONSTRAINT blogposts_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl_1121_1
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: blogposts blogposts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl_1121_1
--

ALTER TABLE ONLY public.blogposts
    ADD CONSTRAINT blogposts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

