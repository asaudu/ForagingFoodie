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
    imageurl text,
    alt character varying(255),
    dish text NOT NULL,
    restaurant text NOT NULL,
    content text NOT NULL,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL,
    alias text,
    city text
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

COPY public.blogposts (id, imageurl, alt, dish, restaurant, content, date, user_id, alias, city) FROM stdin;
11	https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2018/02/22/28cd4375d22647eebe4e393c08a5af7a_IMG_1286.JPG	pork rib soup	Hangover Soup	Hang-II-Og	Tri-tip shoulder tail ground round ham pork loin, jerky biltong alcatra tongue turducken. Jowl ham hock prosciutto, fatback pig drumstick kevin strip steak chicken chuck filet mignon shankle doner tail. Swine shankle capicola ball tip, prosciutto frankfurter jowl burgdoggen turkey hamburger pork tongue short ribs. Andouille alcatra meatball, leberkas cow pancetta strip steak ham hock cupim bresaola. Pork ground round chislic, boudin biltong turkey chuck. Flank tri-tip ground round swine meatball. Shank pancetta meatloaf leberkas pig chuck picanha venison hamburger.	2022-05-18 14:32:53.429568-05	1	\N	Korea
12	https://media-cdn.tripadvisor.com/media/photo-s/12/4a/37/d2/caption.jpg	cheese burger	Here Cheese Burger	Here Burger	Leberkas frankfurter pork, sirloin t-bone landjaeger chicken beef doner. Beef capicola leberkas, frankfurter ground round pastrami hamburger. Brisket chislic short ribs fatback pork burgdoggen. Ham hock beef ribs venison capicola shoulder rump short ribs ham chicken jerky. Meatloaf chuck chislic turducken. Buffalo turducken chislic cow ham sausage. Bacon flank pork belly rump ball tip kielbasa.	2022-05-18 14:54:05.051922-05	6	\N	Korea
13	https://www.seriouseats.com/thmb/5X3qEQzMuBRZq4Sc71HCB9q0cSM=/1500x1125/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2018__12__20181204-bossam-vicky-wasik-11-6b092534a2ea440fa5dba84bbbf020bf.jpg	boiled pork	Bossam	Bossam House	Biltong pancetta chicken doner tongue boudin jowl swine kielbasa drumstick kevin. Pork chop tail cow salami beef ribs drumstick. Kevin pancetta pork biltong salami ribeye shank pastrami tenderloin picanha brisket ham hock frankfurter pig turkey. Biltong tenderloin turkey sirloin. Short loin kevin hamburger shankle beef ribs alcatra fatback ribeye meatloaf. Cupim biltong flank shoulder buffalo. Bresaola alcatra meatloaf, flank short loin beef ribs swine sirloin shoulder pork loin jerky chislic porchetta.	2022-05-18 14:54:05.051922-05	7	\N	Korea
7	https://media2.dallasobserver.com/dal/imager/u/original/11826749/meddlesomemoth_chickenandegg_tayloradams..jpg	egg and chicken over grits	Mother and Child	Meddlesome Moth	Bacon ipsum dolor amet pancetta capicola chicken corned beef, sirloin ham boudin flank alcatra cupim shankle. Meatloaf flank ribeye, venison swine pork chop pork loin pork. Strip steak t-bone andouille hamburger. Chuck ham hock strip steak prosciutto corned beef jowl. Chicken burgdoggen pig, flank rump kielbasa ribeye bresaola short ribs hamburger frankfurter tongue kevin biltong shoulder. Picanha biltong tongue landjaeger kevin jerky tenderloin, hamburger strip steak porchetta burgdoggen jowl buffalo short ribs.	2022-05-06 00:00:00-05	6	\N	Dallas
10	https://cdn.usarestaurants.info/assets/uploads/2faa12d9112050cf1f088f1dc826f1a8_-united-states-texas-dallas-county-garland-pangea-restaurant-bar-214-703-2222htm.jpg	chicken sandwich	Breakfast Chicken Sandwich	Pangea Restaurant & Bar	Turducken tri-tip corned beef, doner salami prosciutto meatloaf pig. Strip steak brisket pork beef ribs. Pastrami t-bone strip steak pork loin kevin, beef ribs sirloin cow corned beef. Brisket buffalo cupim, salami biltong pig turducken. Spare ribs meatloaf turkey short loin, chicken sirloin flank turducken pork chop. Cupim doner tri-tip short loin corned beef ham hock bresaola turducken porchetta beef jowl tail fatback.	2022-05-15 00:00:00-05	6	pangea-restaurant-and-bar-garland	Dallas
1	https://www.charlottefashionplate.com/wp-content/uploads/2019/03/8f01f4ef-6c25-44e2-a6fd-63464dd9a820.jpg	chicken and fluffy waffles	Crispy Chicken and Waffles	Addy's Kitchen	A delicious looking plate of chicken and waffles. Lightly crisped chicken over a plushy blanket of waffles with a soft coating of syrup.	2022-05-18 00:00:00-05	1	\N	Dallas
9	https://media-cdn.tripadvisor.com/media/photo-p/12/b3/53/16/biscuits-and-turkey-sausage.jpg	biscuits and gravy	Biscuits and Gravy	First Watch	Meatball fatback cupim kevin kielbasa chuck pastrami ribeye brisket sausage short ribs drumstick pancetta ham hock pork. Flank chuck short ribs meatloaf corned beef, shank turkey. Pancetta ham hock tenderloin corned beef pork meatball boudin strip steak chuck. Pork chop salami swine burgdoggen, chislic tri-tip landjaeger kielbasa ground round flank buffalo turducken beef venison. Pancetta short ribs shank pork chop. Shoulder turducken tri-tip pancetta andouille ribeye, sirloin corned beef brisket burgdoggen spare ribs alcatra.	2022-05-13 00:00:00-05	7	first-watch-richardson-2	Dallas
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

SELECT pg_catalog.setval('public.blogposts_id_seq', 13, true);


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

