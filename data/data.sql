--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2022-09-02 09:42:28

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

--
-- TOC entry 4 (class 2615 OID 39542)
-- Name: _a_gestion_projet; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA _a_gestion_projet;


ALTER SCHEMA _a_gestion_projet OWNER TO postgres;

--
-- TOC entry 243 (class 1255 OID 39543)
-- Name: insert_ticket_membre_affecte_rel(); Type: FUNCTION; Schema: _a_gestion_projet; Owner: postgres
--

CREATE FUNCTION _a_gestion_projet.insert_ticket_membre_affecte_rel() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
   a integer[] := NEW.id_membre_affecte;
   i integer; 
BEGIN
FOREACH i IN ARRAY a
   LOOP 
      INSERT INTO _a_gestion_projet.ticket_membre_affecte(id_ticket, id_membre)
      VALUES (NEW.id_ticket, i);
   END LOOP;
RETURN NEW;
end;
$$;


ALTER FUNCTION _a_gestion_projet.insert_ticket_membre_affecte_rel() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 39544)
-- Name: boite_outils; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.boite_outils (
    id_outil integer NOT NULL,
    lib_outil character varying NOT NULL,
    desc_outil character varying NOT NULL,
    url character varying NOT NULL,
    id_categorie integer NOT NULL
);


ALTER TABLE _a_gestion_projet.boite_outils OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 39549)
-- Name: boite_outils_id_outil_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.boite_outils_id_outil_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.boite_outils_id_outil_seq OWNER TO postgres;

--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 211
-- Name: boite_outils_id_outil_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.boite_outils_id_outil_seq OWNED BY _a_gestion_projet.boite_outils.id_outil;


--
-- TOC entry 212 (class 1259 OID 39550)
-- Name: categories; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.categories (
    id_cat integer NOT NULL,
    lib_categorie character varying NOT NULL
);


ALTER TABLE _a_gestion_projet.categories OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 39555)
-- Name: categories_id_cat_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.categories_id_cat_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.categories_id_cat_seq OWNER TO postgres;

--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 213
-- Name: categories_id_cat_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.categories_id_cat_seq OWNED BY _a_gestion_projet.categories.id_cat;


--
-- TOC entry 214 (class 1259 OID 39556)
-- Name: commentaires; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.commentaires (
    id_commentaire integer NOT NULL,
    id_ticket integer NOT NULL,
    id_membre integer NOT NULL,
    texte character varying NOT NULL,
    date_commentaire timestamp without time zone NOT NULL
);


ALTER TABLE _a_gestion_projet.commentaires OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 39561)
-- Name: commentaires_id_commentaire_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.commentaires_id_commentaire_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.commentaires_id_commentaire_seq OWNER TO postgres;

--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 215
-- Name: commentaires_id_commentaire_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.commentaires_id_commentaire_seq OWNED BY _a_gestion_projet.commentaires.id_commentaire;


--
-- TOC entry 216 (class 1259 OID 39562)
-- Name: commentaires_outils; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.commentaires_outils (
    id_commentaire integer NOT NULL,
    id_outil integer NOT NULL,
    id_membre integer NOT NULL,
    texte character varying NOT NULL,
    date_commentaire character varying NOT NULL
);


ALTER TABLE _a_gestion_projet.commentaires_outils OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 39567)
-- Name: commentaires_outils_id_commentaire_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.commentaires_outils_id_commentaire_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.commentaires_outils_id_commentaire_seq OWNER TO postgres;

--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 217
-- Name: commentaires_outils_id_commentaire_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.commentaires_outils_id_commentaire_seq OWNED BY _a_gestion_projet.commentaires_outils.id_commentaire;


--
-- TOC entry 218 (class 1259 OID 39568)
-- Name: groupes; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.groupes (
    id_groupe integer NOT NULL,
    lib_groupe character varying NOT NULL
);


ALTER TABLE _a_gestion_projet.groupes OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 39573)
-- Name: groupes_id_groupe_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.groupes_id_groupe_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.groupes_id_groupe_seq OWNER TO postgres;

--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 219
-- Name: groupes_id_groupe_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.groupes_id_groupe_seq OWNED BY _a_gestion_projet.groupes.id_groupe;


--
-- TOC entry 220 (class 1259 OID 39574)
-- Name: membres; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.membres (
    id_membre integer NOT NULL,
    nom character varying NOT NULL,
    prenom character varying NOT NULL,
    id_groupe integer NOT NULL,
    nb_jours_travailles integer NOT NULL,
    username character varying,
    password character varying,
    email character varying NOT NULL
);


ALTER TABLE _a_gestion_projet.membres OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 39579)
-- Name: membres_id_membre_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.membres_id_membre_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.membres_id_membre_seq OWNER TO postgres;

--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 221
-- Name: membres_id_membre_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.membres_id_membre_seq OWNED BY _a_gestion_projet.membres.id_membre;


--
-- TOC entry 222 (class 1259 OID 39580)
-- Name: projet_membre; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.projet_membre (
    id integer NOT NULL,
    id_projet integer NOT NULL,
    id_membre integer NOT NULL,
    role_membre character varying NOT NULL,
    nb_jours integer NOT NULL
);


ALTER TABLE _a_gestion_projet.projet_membre OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 39585)
-- Name: projet_membre_id_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.projet_membre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.projet_membre_id_seq OWNER TO postgres;

--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 223
-- Name: projet_membre_id_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.projet_membre_id_seq OWNED BY _a_gestion_projet.projet_membre.id;


--
-- TOC entry 224 (class 1259 OID 39586)
-- Name: projet_routine; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.projet_routine (
    id integer NOT NULL,
    id_projet integer NOT NULL,
    id_routine integer NOT NULL
);


ALTER TABLE _a_gestion_projet.projet_routine OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 39589)
-- Name: projet_routine_id_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.projet_routine_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.projet_routine_id_seq OWNER TO postgres;

--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 225
-- Name: projet_routine_id_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.projet_routine_id_seq OWNED BY _a_gestion_projet.projet_routine.id;


--
-- TOC entry 226 (class 1259 OID 39590)
-- Name: projets; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.projets (
    id_projet integer NOT NULL,
    lib_projet character varying NOT NULL,
    description character varying NOT NULL,
    date_debut date,
    date_fin date,
    dossier_reseau character varying,
    url_gitlab character varying,
    url_preprod character varying,
    url_prod character varying,
    id_groupe integer NOT NULL,
    id_statut integer NOT NULL,
    type_projet character varying NOT NULL
);


ALTER TABLE _a_gestion_projet.projets OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 39595)
-- Name: projets_id_projet_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.projets_id_projet_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.projets_id_projet_seq OWNER TO postgres;

--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 227
-- Name: projets_id_projet_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.projets_id_projet_seq OWNED BY _a_gestion_projet.projets.id_projet;


--
-- TOC entry 228 (class 1259 OID 39596)
-- Name: statuts; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.statuts (
    id_statut integer NOT NULL,
    lib_statut character varying NOT NULL,
    statut_class character varying
);


ALTER TABLE _a_gestion_projet.statuts OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 39601)
-- Name: statuts_id_statut_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.statuts_id_statut_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.statuts_id_statut_seq OWNER TO postgres;

--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 229
-- Name: statuts_id_statut_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.statuts_id_statut_seq OWNED BY _a_gestion_projet.statuts.id_statut;


--
-- TOC entry 230 (class 1259 OID 39602)
-- Name: ticket_membre_affecte; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.ticket_membre_affecte (
    id integer NOT NULL,
    id_ticket integer NOT NULL,
    id_membre integer NOT NULL
);


ALTER TABLE _a_gestion_projet.ticket_membre_affecte OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 39605)
-- Name: ticket_membre_affecte_id_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.ticket_membre_affecte_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.ticket_membre_affecte_id_seq OWNER TO postgres;

--
-- TOC entry 3505 (class 0 OID 0)
-- Dependencies: 231
-- Name: ticket_membre_affecte_id_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.ticket_membre_affecte_id_seq OWNED BY _a_gestion_projet.ticket_membre_affecte.id;


--
-- TOC entry 232 (class 1259 OID 39606)
-- Name: tickets; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.tickets (
    id_ticket integer NOT NULL,
    id_membre integer NOT NULL,
    id_projet integer NOT NULL,
    id_statut integer NOT NULL,
    texte character varying NOT NULL,
    date_ticket timestamp without time zone NOT NULL,
    id_urgence integer NOT NULL,
    id_membre_affecte integer[]
);


ALTER TABLE _a_gestion_projet.tickets OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 39611)
-- Name: tickets_id_ticket_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.tickets_id_ticket_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.tickets_id_ticket_seq OWNER TO postgres;

--
-- TOC entry 3506 (class 0 OID 0)
-- Dependencies: 233
-- Name: tickets_id_ticket_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.tickets_id_ticket_seq OWNED BY _a_gestion_projet.tickets.id_ticket;


--
-- TOC entry 234 (class 1259 OID 39612)
-- Name: tickets_urgence; Type: TABLE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TABLE _a_gestion_projet.tickets_urgence (
    id_urgence integer NOT NULL,
    lib_urgence character varying NOT NULL,
    lib_class character varying
);


ALTER TABLE _a_gestion_projet.tickets_urgence OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 39617)
-- Name: tickets_urgence_id_urgence_seq; Type: SEQUENCE; Schema: _a_gestion_projet; Owner: postgres
--

CREATE SEQUENCE _a_gestion_projet.tickets_urgence_id_urgence_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE _a_gestion_projet.tickets_urgence_id_urgence_seq OWNER TO postgres;

--
-- TOC entry 3507 (class 0 OID 0)
-- Dependencies: 235
-- Name: tickets_urgence_id_urgence_seq; Type: SEQUENCE OWNED BY; Schema: _a_gestion_projet; Owner: postgres
--

ALTER SEQUENCE _a_gestion_projet.tickets_urgence_id_urgence_seq OWNED BY _a_gestion_projet.tickets_urgence.id_urgence;


--
-- TOC entry 236 (class 1259 OID 39618)
-- Name: v_categories_infos; Type: VIEW; Schema: _a_gestion_projet; Owner: postgres
--

CREATE VIEW _a_gestion_projet.v_categories_infos AS
 WITH count_tools AS (
         SELECT boite_outils.id_categorie,
            count(*) AS nb_outils
           FROM _a_gestion_projet.boite_outils
          GROUP BY boite_outils.id_categorie
        )
 SELECT a.id_cat,
    a.lib_categorie,
    b.nb_outils
   FROM (_a_gestion_projet.categories a
     LEFT JOIN count_tools b ON ((b.id_categorie = a.id_cat)));


ALTER TABLE _a_gestion_projet.v_categories_infos OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 39623)
-- Name: v_commentaires_infos; Type: VIEW; Schema: _a_gestion_projet; Owner: postgres
--

CREATE VIEW _a_gestion_projet.v_commentaires_infos AS
 SELECT a.id_commentaire,
    a.id_ticket,
    a.id_membre,
    a.texte,
    a.date_commentaire,
    c.nom,
    c.prenom
   FROM (_a_gestion_projet.commentaires a
     LEFT JOIN _a_gestion_projet.membres c ON ((a.id_membre = c.id_membre)));


ALTER TABLE _a_gestion_projet.v_commentaires_infos OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 39627)
-- Name: v_commentaires_outils_infos; Type: VIEW; Schema: _a_gestion_projet; Owner: postgres
--

CREATE VIEW _a_gestion_projet.v_commentaires_outils_infos AS
 SELECT a.id_commentaire,
    a.id_outil,
    a.id_membre,
    a.texte,
    a.date_commentaire,
    c.nom,
    c.prenom
   FROM (_a_gestion_projet.commentaires_outils a
     LEFT JOIN _a_gestion_projet.membres c ON ((a.id_membre = c.id_membre)));


ALTER TABLE _a_gestion_projet.v_commentaires_outils_infos OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 39631)
-- Name: v_membres_metrics; Type: VIEW; Schema: _a_gestion_projet; Owner: postgres
--

CREATE VIEW _a_gestion_projet.v_membres_metrics AS
 SELECT a.id_membre,
    sum(b.nb_jours) AS nb_jours_proj,
    max(a.nb_jours_travailles) AS nb_jours_travailles,
    round((((sum(b.nb_jours))::numeric / (max(a.nb_jours_travailles))::numeric) * (100)::numeric), 1) AS ratio_dispo
   FROM (_a_gestion_projet.membres a
     LEFT JOIN _a_gestion_projet.projet_membre b ON ((a.id_membre = b.id_membre)))
  GROUP BY a.id_membre;


ALTER TABLE _a_gestion_projet.v_membres_metrics OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 39636)
-- Name: v_outils_infos; Type: VIEW; Schema: _a_gestion_projet; Owner: postgres
--

CREATE VIEW _a_gestion_projet.v_outils_infos AS
 SELECT a.id_outil,
    a.lib_outil,
    a.desc_outil,
    a.url,
    a.id_categorie,
    b.lib_categorie
   FROM (_a_gestion_projet.boite_outils a
     LEFT JOIN _a_gestion_projet.categories b ON ((a.id_categorie = b.id_cat)));


ALTER TABLE _a_gestion_projet.v_outils_infos OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 39640)
-- Name: v_projets_infos; Type: VIEW; Schema: _a_gestion_projet; Owner: postgres
--

CREATE VIEW _a_gestion_projet.v_projets_infos AS
 WITH count_links AS (
         SELECT projet_routine.id_routine,
            count(*) AS nb_relations
           FROM _a_gestion_projet.projet_routine
          GROUP BY projet_routine.id_routine
        )
 SELECT a.id_projet,
    a.lib_projet,
    a.description,
    a.date_debut,
    a.date_fin,
    a.dossier_reseau,
    a.url_gitlab,
    a.url_preprod,
    a.url_prod,
    a.id_groupe,
    a.id_statut,
    a.type_projet,
    b.nb_relations
   FROM (_a_gestion_projet.projets a
     LEFT JOIN count_links b ON ((a.id_projet = b.id_routine)));


ALTER TABLE _a_gestion_projet.v_projets_infos OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 39645)
-- Name: v_tickets_infos; Type: VIEW; Schema: _a_gestion_projet; Owner: postgres
--

CREATE VIEW _a_gestion_projet.v_tickets_infos AS
 WITH count_comments AS (
         SELECT a_1.id_ticket,
            count(e_1.*) AS nb_commentaires
           FROM (_a_gestion_projet.tickets a_1
             LEFT JOIN _a_gestion_projet.commentaires e_1 ON ((a_1.id_ticket = e_1.id_ticket)))
          GROUP BY a_1.id_ticket
        ), group_membres_affectes AS (
         SELECT a_1.id_ticket,
            string_agg((((b_1.prenom)::text || ' '::text) || (b_1.nom)::text), ', '::text) AS membre_nom,
            string_agg((b_1.email)::text, ', '::text) AS membre_mail
           FROM (_a_gestion_projet.ticket_membre_affecte a_1
             LEFT JOIN _a_gestion_projet.membres b_1 ON ((a_1.id_membre = b_1.id_membre)))
          GROUP BY a_1.id_ticket
        )
 SELECT a.id_ticket,
    a.texte,
    a.date_ticket,
    b.id_membre,
    b.nom,
    b.prenom,
    b.id_groupe,
    b.nb_jours_travailles,
    c.id_projet,
    c.lib_projet,
    c.description,
    c.date_debut,
    c.date_fin,
    c.dossier_reseau,
    c.url_gitlab,
    c.url_preprod,
    c.url_prod,
    d.id_statut,
    d.lib_statut,
    e.nb_commentaires,
    f.id_urgence,
    f.lib_urgence,
    f.lib_class,
    g.membre_nom,
    a.id_membre_affecte,
    g.membre_mail,
    c.id_statut AS id_statut_proj,
    cc.lib_statut AS lib_statut_proj,
    d.statut_class
   FROM (((((((_a_gestion_projet.tickets a
     LEFT JOIN _a_gestion_projet.membres b ON ((a.id_membre = b.id_membre)))
     LEFT JOIN _a_gestion_projet.projets c ON ((a.id_projet = c.id_projet)))
     LEFT JOIN _a_gestion_projet.statuts cc ON ((c.id_statut = cc.id_statut)))
     LEFT JOIN _a_gestion_projet.statuts d ON ((a.id_statut = d.id_statut)))
     LEFT JOIN count_comments e ON ((a.id_ticket = e.id_ticket)))
     LEFT JOIN _a_gestion_projet.tickets_urgence f ON ((a.id_urgence = f.id_urgence)))
     LEFT JOIN group_membres_affectes g ON ((a.id_ticket = g.id_ticket)));


ALTER TABLE _a_gestion_projet.v_tickets_infos OWNER TO postgres;

--
-- TOC entry 3254 (class 2604 OID 39650)
-- Name: boite_outils id_outil; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.boite_outils ALTER COLUMN id_outil SET DEFAULT nextval('_a_gestion_projet.boite_outils_id_outil_seq'::regclass);


--
-- TOC entry 3255 (class 2604 OID 39651)
-- Name: categories id_cat; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.categories ALTER COLUMN id_cat SET DEFAULT nextval('_a_gestion_projet.categories_id_cat_seq'::regclass);


--
-- TOC entry 3256 (class 2604 OID 39652)
-- Name: commentaires id_commentaire; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.commentaires ALTER COLUMN id_commentaire SET DEFAULT nextval('_a_gestion_projet.commentaires_id_commentaire_seq'::regclass);


--
-- TOC entry 3257 (class 2604 OID 39653)
-- Name: commentaires_outils id_commentaire; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.commentaires_outils ALTER COLUMN id_commentaire SET DEFAULT nextval('_a_gestion_projet.commentaires_outils_id_commentaire_seq'::regclass);


--
-- TOC entry 3258 (class 2604 OID 39654)
-- Name: groupes id_groupe; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.groupes ALTER COLUMN id_groupe SET DEFAULT nextval('_a_gestion_projet.groupes_id_groupe_seq'::regclass);


--
-- TOC entry 3259 (class 2604 OID 39655)
-- Name: membres id_membre; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.membres ALTER COLUMN id_membre SET DEFAULT nextval('_a_gestion_projet.membres_id_membre_seq'::regclass);


--
-- TOC entry 3260 (class 2604 OID 39656)
-- Name: projet_membre id; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projet_membre ALTER COLUMN id SET DEFAULT nextval('_a_gestion_projet.projet_membre_id_seq'::regclass);


--
-- TOC entry 3261 (class 2604 OID 39657)
-- Name: projet_routine id; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projet_routine ALTER COLUMN id SET DEFAULT nextval('_a_gestion_projet.projet_routine_id_seq'::regclass);


--
-- TOC entry 3262 (class 2604 OID 39658)
-- Name: projets id_projet; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projets ALTER COLUMN id_projet SET DEFAULT nextval('_a_gestion_projet.projets_id_projet_seq'::regclass);


--
-- TOC entry 3263 (class 2604 OID 39659)
-- Name: statuts id_statut; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.statuts ALTER COLUMN id_statut SET DEFAULT nextval('_a_gestion_projet.statuts_id_statut_seq'::regclass);


--
-- TOC entry 3264 (class 2604 OID 39660)
-- Name: ticket_membre_affecte id; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.ticket_membre_affecte ALTER COLUMN id SET DEFAULT nextval('_a_gestion_projet.ticket_membre_affecte_id_seq'::regclass);


--
-- TOC entry 3265 (class 2604 OID 39661)
-- Name: tickets id_ticket; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.tickets ALTER COLUMN id_ticket SET DEFAULT nextval('_a_gestion_projet.tickets_id_ticket_seq'::regclass);


--
-- TOC entry 3266 (class 2604 OID 39662)
-- Name: tickets_urgence id_urgence; Type: DEFAULT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.tickets_urgence ALTER COLUMN id_urgence SET DEFAULT nextval('_a_gestion_projet.tickets_urgence_id_urgence_seq'::regclass);


--
-- TOC entry 3464 (class 0 OID 39544)
-- Dependencies: 210
-- Data for Name: boite_outils; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.boite_outils VALUES (6, 'Kepler.gl', 'Outil web de visualisation spatiale', 'https://kepler.gl/', 11);
INSERT INTO _a_gestion_projet.boite_outils VALUES (8, 'Powerslide', 'Exemple : https://www.powerslide.io/opendata/data_immobilier_france?hsLang=fr&utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz--frdeoa6JOTKjBCXkowJxCyqucfSLLl7NLAbK8TUAOwJx-wS2hgWffBLnXQ8neRn-TnjJZ

Suggéré par EB ; à discuter', 'https://www.powerslide.io/', 11);
INSERT INTO _a_gestion_projet.boite_outils VALUES (9, 'data.cquest', 'Données ouvertes retravaillées par Christian Quest', 'http://data.cquest.org/', 5);
INSERT INTO _a_gestion_projet.boite_outils VALUES (10, 'FlowingData', 'Blog partageant des visualisations graphiques ; également sur Twitter : https://twitter.com/flowingdata', 'https://flowingdata.com/', 11);
INSERT INTO _a_gestion_projet.boite_outils VALUES (11, 'D3.js', 'Librairie JavaScript', 'https://d3js.org/', 11);
INSERT INTO _a_gestion_projet.boite_outils VALUES (12, 'Morphocode', 'Visualisations graphiques innovantes sur l''urbanisme en particulier', 'https://morphocode.com/', 11);
INSERT INTO _a_gestion_projet.boite_outils VALUES (13, 'Astuces PostgreSQL', 'Des astuces SQL (env. PostgreSQL, 2017)', 'https://abelvm.github.io/sql/sql-tricks/?utm_content=buffer91c33&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer', 5);
INSERT INTO _a_gestion_projet.boite_outils VALUES (14, 'Awesome GIS', 'Liste de ressources SIG', 'https://github.com/sshuair/awesome-gis', 1);
INSERT INTO _a_gestion_projet.boite_outils VALUES (15, 'CARTO', 'Analyse spatiale', 'https://carto.com/', 11);
INSERT INTO _a_gestion_projet.boite_outils VALUES (16, 'Mapbox', '« Mapbox Studio is like Photoshop, for maps. »', 'https://www.mapbox.com/', 11);
INSERT INTO _a_gestion_projet.boite_outils VALUES (17, 'Mapbox API', 'Dont Mapbox GL JS', 'https://docs.mapbox.com/', 13);
INSERT INTO _a_gestion_projet.boite_outils VALUES (18, 'OpenLayers', 'OpenLayers facilite l''insertion d''une carte dynamique dans n''importe quelle page Web. Il peut afficher des tuiles de carte, des données vectorielles et des marqueurs chargés à partir de n''importe quelle source. OpenLayers a été développé pour favoriser l''utilisation d''informations géographiques de toutes sortes. Il est entièrement gratuit, open source JavaScript.', 'https://openlayers.org/', 13);


--
-- TOC entry 3466 (class 0 OID 39550)
-- Dependencies: 212
-- Data for Name: categories; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.categories VALUES (1, 'SIG');
INSERT INTO _a_gestion_projet.categories VALUES (2, 'Développement web');
INSERT INTO _a_gestion_projet.categories VALUES (5, 'Base de données');
INSERT INTO _a_gestion_projet.categories VALUES (7, 'Infrastructure');
INSERT INTO _a_gestion_projet.categories VALUES (9, 'Intégration de données');
INSERT INTO _a_gestion_projet.categories VALUES (10, 'Programmation informatique');
INSERT INTO _a_gestion_projet.categories VALUES (11, 'Visualisation de données');
INSERT INTO _a_gestion_projet.categories VALUES (12, 'Interrogation des données');
INSERT INTO _a_gestion_projet.categories VALUES (13, 'APIs');


--
-- TOC entry 3468 (class 0 OID 39556)
-- Dependencies: 214
-- Data for Name: commentaires; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.commentaires VALUES (24, 62, 1, 'Testé ici : http://srv-gitlab.audiar.net/rfroger/assets-dataudiar/-/blob/master/js/chart-operations.js#L674', '2021-10-27 13:51:57.55');
INSERT INTO _a_gestion_projet.commentaires VALUES (25, 65, 1, 'Recherche de prestataire en cours (Dalibo ou indépendant)', '2021-10-29 10:04:03.096');
INSERT INTO _a_gestion_projet.commentaires VALUES (26, 64, 1, 'Installé ici : http://srv-gitlab.audiar.net:8095/login/', '2021-11-02 15:19:47.594');
INSERT INTO _a_gestion_projet.commentaires VALUES (27, 64, 1, 'Création de compte sur demande', '2021-11-03 09:46:15.701');
INSERT INTO _a_gestion_projet.commentaires VALUES (28, 64, 1, 'Documentation d''installation ici : http://srv-gitlab.audiar.net/rfroger/global-documentation/blob/master/install_apache_superset.md', '2021-11-03 09:46:24');
INSERT INTO _a_gestion_projet.commentaires VALUES (29, 65, 1, 'Discussion mercredi 17/11 à 8h45 avec Rodolphe pour présenter nos attentes et évaluer la capacité de faire ainsi que les délais', '2021-11-15 09:10:58.616');
INSERT INTO _a_gestion_projet.commentaires VALUES (30, 65, 1, 'Rodolphe Quiédeville (indépendant)', '2021-11-15 09:11:27.755');


--
-- TOC entry 3470 (class 0 OID 39562)
-- Dependencies: 216
-- Data for Name: commentaires_outils; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--



--
-- TOC entry 3472 (class 0 OID 39568)
-- Dependencies: 218
-- Data for Name: groupes; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.groupes VALUES (1, 'Mon groupe test');


--
-- TOC entry 3474 (class 0 OID 39574)
-- Dependencies: 220
-- Data for Name: membres; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.membres VALUES (1, 'Froger', 'Rémi', 1, 199, 'rfroger', '$2y$10$LrJAsmH10K04/aLuB2H4fObHzWuoES4sLEAhZ1Uy0FGOL8cKar0XG', 'toto@mail.com');
INSERT INTO _a_gestion_projet.membres VALUES (23, 'Test', 'Compte', 1, 199, 'test', '$2y$10$LrJAsmH10K04/aLuB2H4fObHzWuoES4sLEAhZ1Uy0FGOL8cKar0XG', 'toto@mail.com');
INSERT INTO _a_gestion_projet.membres VALUES (2, 'Tolstoï', 'Léon', 1, 199, 'ltolstoi', '$2y$10$LrJAsmH10K04/aLuB2H4fObHzWuoES4sLEAhZ1Uy0FGOL8cKar0XG', 'toto@mail.com');
INSERT INTO _a_gestion_projet.membres VALUES (11, 'Dostoïevski', 'Fiodor', 1, 199, 'fdostoievski', '$2y$10$LrJAsmH10K04/aLuB2H4fObHzWuoES4sLEAhZ1Uy0FGOL8cKar0XG', 'toto@mail.com');
INSERT INTO _a_gestion_projet.membres VALUES (15, 'Pouchkine', 'Alexandre', 1, 182, 'apouchkine', '$2y$10$LrJAsmH10K04/aLuB2H4fObHzWuoES4sLEAhZ1Uy0FGOL8cKar0XG', 'toto@mail.com');
INSERT INTO _a_gestion_projet.membres VALUES (16, 'Tourgueniev', 'Ivan', 1, 199, 'itourgueniev', '$2y$10$LrJAsmH10K04/aLuB2H4fObHzWuoES4sLEAhZ1Uy0FGOL8cKar0XG', 'toto@mail.com');
INSERT INTO _a_gestion_projet.membres VALUES (17, 'Gorki', 'Maxime', 1, 169, 'mgorki', '$2y$10$LrJAsmH10K04/aLuB2H4fObHzWuoES4sLEAhZ1Uy0FGOL8cKar0XG', 'toto@mail.com');
INSERT INTO _a_gestion_projet.membres VALUES (19, 'Tchekhov', 'Anton', 1, 179, 'atchekhov', '$2y$10$LrJAsmH10K04/aLuB2H4fObHzWuoES4sLEAhZ1Uy0FGOL8cKar0XG', 'toto@mail.com');


--
-- TOC entry 3476 (class 0 OID 39580)
-- Dependencies: 222
-- Data for Name: projet_membre; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.projet_membre VALUES (50, 13, 16, 'Production de données', 30);
INSERT INTO _a_gestion_projet.projet_membre VALUES (52, 15, 15, 'Production de données', 40);
INSERT INTO _a_gestion_projet.projet_membre VALUES (55, 16, 16, 'Production de données', 20);
INSERT INTO _a_gestion_projet.projet_membre VALUES (58, 17, 17, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (59, 25, 17, '?', 24);
INSERT INTO _a_gestion_projet.projet_membre VALUES (60, 26, 17, '?', 15);
INSERT INTO _a_gestion_projet.projet_membre VALUES (61, 28, 17, '?', 8);
INSERT INTO _a_gestion_projet.projet_membre VALUES (62, 29, 17, '?', 7);
INSERT INTO _a_gestion_projet.projet_membre VALUES (64, 38, 17, '?', 10);
INSERT INTO _a_gestion_projet.projet_membre VALUES (65, 39, 17, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (66, 40, 17, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (67, 42, 17, '?', 1);
INSERT INTO _a_gestion_projet.projet_membre VALUES (68, 44, 17, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (69, 45, 17, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (70, 54, 17, 'Suivi des données', 10);
INSERT INTO _a_gestion_projet.projet_membre VALUES (72, 61, 17, 'Pilote', 30);
INSERT INTO _a_gestion_projet.projet_membre VALUES (73, 64, 17, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (74, 13, 19, 'Pilote', 29);
INSERT INTO _a_gestion_projet.projet_membre VALUES (75, 19, 19, 'Pilote', 60);
INSERT INTO _a_gestion_projet.projet_membre VALUES (76, 21, 19, '?', 2);
INSERT INTO _a_gestion_projet.projet_membre VALUES (77, 27, 19, '?', 4);
INSERT INTO _a_gestion_projet.projet_membre VALUES (78, 33, 19, '?', 2);
INSERT INTO _a_gestion_projet.projet_membre VALUES (79, 34, 19, '?', 1);
INSERT INTO _a_gestion_projet.projet_membre VALUES (80, 64, 19, '?', 3);
INSERT INTO _a_gestion_projet.projet_membre VALUES (81, 36, 19, '?', 1);
INSERT INTO _a_gestion_projet.projet_membre VALUES (82, 37, 19, 'Pilote', 14);
INSERT INTO _a_gestion_projet.projet_membre VALUES (83, 39, 19, '?', 40);
INSERT INTO _a_gestion_projet.projet_membre VALUES (84, 41, 19, '?', 1);
INSERT INTO _a_gestion_projet.projet_membre VALUES (85, 52, 19, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (86, 14, 1, 'Développement web', 25);
INSERT INTO _a_gestion_projet.projet_membre VALUES (87, 15, 1, 'Développement web', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (88, 23, 1, '?', 10);
INSERT INTO _a_gestion_projet.projet_membre VALUES (89, 35, 1, 'Développement web', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (90, 37, 1, 'Développement web', 25);
INSERT INTO _a_gestion_projet.projet_membre VALUES (91, 41, 1, '?', 2);
INSERT INTO _a_gestion_projet.projet_membre VALUES (47, 11, 1, 'Intégrateur', 30);
INSERT INTO _a_gestion_projet.projet_membre VALUES (71, 59, 1, 'Développement web', 35);
INSERT INTO _a_gestion_projet.projet_membre VALUES (92, 27, 2, '?', 45);
INSERT INTO _a_gestion_projet.projet_membre VALUES (93, 33, 2, '?', 2);
INSERT INTO _a_gestion_projet.projet_membre VALUES (94, 39, 2, '?', 20);
INSERT INTO _a_gestion_projet.projet_membre VALUES (95, 42, 2, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (96, 65, 2, '?', 10);
INSERT INTO _a_gestion_projet.projet_membre VALUES (97, 11, 2, 'Intégrateur', 50);
INSERT INTO _a_gestion_projet.projet_membre VALUES (98, 54, 2, 'Développement web et intégrateur', 30);
INSERT INTO _a_gestion_projet.projet_membre VALUES (100, 66, 15, '?', 2);
INSERT INTO _a_gestion_projet.projet_membre VALUES (101, 27, 15, '?', 2);
INSERT INTO _a_gestion_projet.projet_membre VALUES (102, 28, 15, '?', 25);
INSERT INTO _a_gestion_projet.projet_membre VALUES (103, 32, 15, '?', 4);
INSERT INTO _a_gestion_projet.projet_membre VALUES (104, 33, 15, '?', 2);
INSERT INTO _a_gestion_projet.projet_membre VALUES (99, 64, 15, '?', 3);
INSERT INTO _a_gestion_projet.projet_membre VALUES (105, 13, 15, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (106, 37, 15, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (107, 39, 15, '?', 25);
INSERT INTO _a_gestion_projet.projet_membre VALUES (108, 44, 15, '?', 2);
INSERT INTO _a_gestion_projet.projet_membre VALUES (109, 45, 15, '?', 2);
INSERT INTO _a_gestion_projet.projet_membre VALUES (110, 53, 15, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (111, 65, 15, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (112, 63, 15, '?', 30);
INSERT INTO _a_gestion_projet.projet_membre VALUES (113, 23, 16, '?', 5);
INSERT INTO _a_gestion_projet.projet_membre VALUES (114, 17, 16, '?', 15);
INSERT INTO _a_gestion_projet.projet_membre VALUES (115, 18, 16, '?', 10);
INSERT INTO _a_gestion_projet.projet_membre VALUES (116, 20, 16, '?', 15);
INSERT INTO _a_gestion_projet.projet_membre VALUES (117, 21, 16, '?', 20);
INSERT INTO _a_gestion_projet.projet_membre VALUES (118, 25, 16, '?', 10);
INSERT INTO _a_gestion_projet.projet_membre VALUES (119, 30, 16, '?', 15);
INSERT INTO _a_gestion_projet.projet_membre VALUES (120, 31, 16, '?', 15);
INSERT INTO _a_gestion_projet.projet_membre VALUES (121, 38, 16, '?', 1);
INSERT INTO _a_gestion_projet.projet_membre VALUES (122, 43, 16, '?', 10);
INSERT INTO _a_gestion_projet.projet_membre VALUES (123, 67, 1, '?', 0);
INSERT INTO _a_gestion_projet.projet_membre VALUES (124, 67, 2, '?', 0);


--
-- TOC entry 3478 (class 0 OID 39586)
-- Dependencies: 224
-- Data for Name: projet_routine; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.projet_routine VALUES (2, 35, 11);
INSERT INTO _a_gestion_projet.projet_routine VALUES (5, 54, 11);
INSERT INTO _a_gestion_projet.projet_routine VALUES (6, 35, 64);


--
-- TOC entry 3480 (class 0 OID 39590)
-- Dependencies: 226
-- Data for Name: projets; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.projets VALUES (11, 'Intégration de données', 'Liste de nouvelles données à intégrer', '2021-10-12', '2030-12-12', '', '', '', '', 1, 1, 'Routine');
INSERT INTO _a_gestion_projet.projets VALUES (54, 'Baro''Métropole', 'A définir', '2020-12-29', '2021-12-28', '', 'http://srv-gitlab.audiar.net/rfroger/baro-beta', 'http://srv-gitlab.audiar.net:4000/', 'https://baro.audiar.org/', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (43, 'Etude évaluation à mi-parcours de l''ANRU', 'A définir', '2020-12-31', '2021-12-30', '', '', '', '', 1, 3, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (14, 'Observatoire du foncier / développement web', 'Volet production de l''outil numérique', '2020-12-31', '2021-12-30', '', 'http://srv-gitlab.audiar.net/rfroger/obs-foncier', 'http://srv-gitlab.audiar.net:8092/', 'https://obs-foncier.audiar.org', 1, 3, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (36, 'Observatoire de l''habitat - Bretagne romantique', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (37, 'Observatoire des copropriétés', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (38, 'Observatoire du logement étudiant OTLE', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (39, 'Veille sur le parc social', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (40, 'Suivi du PLH de Rennes Métropole', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (41, 'Suivi du PLH autres territoires', 'Lamballe Terre & Mer', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (42, 'Suivi jeunesse', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (44, 'Les fonctions logistiques de l''aire urbaine', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (45, 'Spécialisation des fonctions économiques sur l''aire urbaine', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (46, 'Anneau métropolitain 2050', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (47, 'Etude quadrant TCSP', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (48, 'Canal d''Ille-et-Rance', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (49, 'Vilaine amont', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (50, 'Parcours métropolitain', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (51, 'Tableau de bord, évaluation du SCoT', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (52, 'Classification pôle de proximité', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (53, 'PLU Lamballe-Armor', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (30, 'Potentiel de densification des ZA', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (13, 'Observatoire du foncier / données', 'Volet données du projet', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (15, 'MOS', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (16, 'Reconquête et nature en ville', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (17, 'Urbanisme et santé', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (18, 'CEBR : consommation d''eau potable', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (19, 'EMD 2018', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (20, 'Logistique urbaine', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (21, 'Tableau de bord suivi PDU', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (23, 'Planification énergétique', 'A définir', '2021-01-01', '2021-12-30', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (24, 'Ecosystème industrie', 'A définir', '20221-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (25, 'VizioEco', 'MAJ annuelle des données emplois et notes rapides', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (26, 'Observatoire du tourisme', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (27, 'Observatoire de l''économie VigiEco', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (28, 'Observatoire du commerce de détail', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (29, 'Observatoire du commerce de centre-ville de Rennes', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (31, 'Attractivité des ZAE de proximité', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (32, 'Location de courte durée Airbnb Rennes', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (33, 'Observatoire des finances locales', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (34, 'Prospective démographie scolaire', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (56, 'hkhkjh', 'kjhkjhk', '2018-01-01', '2019-01-01', '', '', '', '', 1, 3, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (35, 'Observatoire de l''habitat', 'Suivi des marchés', '2020-12-30', '2021-12-29', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (60, 'R&D : développement web', 'Tâches de fond sur l''amélioration des programmes liés au web', '1999-12-31', '2030-12-31', '', '', '', '', 1, 1, 'Routine');
INSERT INTO _a_gestion_projet.projets VALUES (59, 'R&D : visualisation des données', 'Recherche et test de nouvelles représentations graphiques des données', '1999-12-31', '2030-12-31', '', '', '', '', 1, 1, 'Routine');
INSERT INTO _a_gestion_projet.projets VALUES (61, 'Catalogage des données', 'Inventaire des données (hors SIG seulement ?)', '1999-12-31', '2030-12-30', '', '', '', '', 1, 1, 'Routine');
INSERT INTO _a_gestion_projet.projets VALUES (62, 'Veille technologique', 'Activités de veille (à mieux définir)', '2010-01-01', '2030-01-01', '', '', '', '', 1, 1, 'Routine');
INSERT INTO _a_gestion_projet.projets VALUES (63, 'Routines SIG', 'A définir', '2010-01-01', '2030-01-01', '', '', '', '', 1, 1, 'Routine');
INSERT INTO _a_gestion_projet.projets VALUES (64, 'Suivi des marchés fonciers ', 'A définir', '2010-01-01', '2030-01-01', '', '', '', '', 1, 1, 'Routine');
INSERT INTO _a_gestion_projet.projets VALUES (65, 'Relations avec Datagences Bretagne', 'En lien avec Gwendal', '2020-01-01', '2030-01-01', '', '', '', '', 1, 1, 'Routine');
INSERT INTO _a_gestion_projet.projets VALUES (66, 'Ecosystème industrie', 'A définir', '2021-01-01', '2021-12-31', '', '', '', '', 1, 1, 'Projet');
INSERT INTO _a_gestion_projet.projets VALUES (67, 'Infrastructure (Stéphane Guigourez) ', 'Lien avec SG sur les tâches concernant l''infrastructure (informatique et réseau)', '2020-01-01', '9999-01-01', '', '', '', '', 1, 1, 'Routine');


--
-- TOC entry 3482 (class 0 OID 39596)
-- Dependencies: 228
-- Data for Name: statuts; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.statuts VALUES (1, 'Ouvert', 'success');
INSERT INTO _a_gestion_projet.statuts VALUES (2, 'En cours', 'warning');
INSERT INTO _a_gestion_projet.statuts VALUES (3, 'Terminé', 'danger');


--
-- TOC entry 3484 (class 0 OID 39602)
-- Dependencies: 230
-- Data for Name: ticket_membre_affecte; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (28, 62, 2);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (29, 62, 1);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (30, 63, 2);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (31, 63, 1);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (32, 64, 11);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (33, 64, 17);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (34, 64, 2);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (35, 64, 16);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (36, 64, 15);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (37, 64, 1);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (38, 64, 19);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (39, 65, 11);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (40, 65, 17);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (41, 65, 2);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (42, 65, 16);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (43, 65, 15);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (44, 65, 23);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (45, 65, 1);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (46, 65, 19);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (47, 66, 11);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (48, 66, 17);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (49, 66, 2);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (50, 66, 16);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (51, 66, 15);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (52, 66, 1);
INSERT INTO _a_gestion_projet.ticket_membre_affecte VALUES (53, 66, 19);


--
-- TOC entry 3486 (class 0 OID 39606)
-- Dependencies: 232
-- Data for Name: tickets; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.tickets VALUES (62, 1, 59, 3, 'Test diagramme Sankey avec Chart.js', '2021-10-26 13:49:36.064', 1, '{2,1}');
INSERT INTO _a_gestion_projet.tickets VALUES (63, 1, 60, 1, 'Pour toutes les applications utilisant les modules cartographiques du paquet assets-dataudiar : mise en place d''un filtre cartographique à partir d''un clique sur une classe de la légende (je clique sur une catégorie de la légende -> la carte n''affiche que cette catégorie)', '2021-10-28 15:45:27.454', 1, '{2,1}');
INSERT INTO _a_gestion_projet.tickets VALUES (65, 1, 67, 1, 'Migration vers PostgreSQL version > 10.*', '2021-10-29 09:38:51.076', 2, '{11,17,2,16,15,23,1,19}');
INSERT INTO _a_gestion_projet.tickets VALUES (64, 1, 67, 3, '[Fait] Installation d''Apache Superset pour la première semaine de novembre sur le serveur srv-gitlab dans un premier temps

Lien : http://srv-gitlab.audiar.net:8095/

Création de compte sur demande', '2021-10-29 09:33:38.561', 1, '{11,17,2,16,15,1,19}');
INSERT INTO _a_gestion_projet.tickets VALUES (66, 1, 60, 1, 'Création d''un nouveau gabarit d''application web cartographique avec une interface centrée sur la carte et des améliorations à apporter sur les interactions cartographiques (à partir du module assets-dataudiar (http://srv-gitlab.audiar.net/rfroger/assets-dataudiar)

Ce gabarit devra intégrer des nouvelles interactions cartographiques, dont le système de survol comme sur Morphocode (https://explorer.morphocode.com/map) - c''est-à-dire la possibilité de définir un cercle (ou autre forme géographique) d''une certaine taille permettant de filtrer les entités cartographiques au survol (comme un cache) et mettant directement à jour les graphiques dépendant de ces entités

Prévoir d''isoler une ou plusieurs cartes (par exemple map.audiar.org/maps afficherait tous les projets cartographiques configurés dans ce modèle - via config/config-dashboard.json ; map.audiar.org/map?themes=copro,carreaux,depl afficheraient seulement les thèmes interrogés)

Temps : travail en tâche de fond par RF, surtout à partir de janvier 2022 et présentation des avancées au fur et à mesure ; le projet d''application de l''observatoire des copropriétés sera pensé pour accueillir ce gabarit', '2021-11-15 09:26:33.016', 2, '{11,17,2,16,15,1,19}');


--
-- TOC entry 3488 (class 0 OID 39612)
-- Dependencies: 234
-- Data for Name: tickets_urgence; Type: TABLE DATA; Schema: _a_gestion_projet; Owner: postgres
--

INSERT INTO _a_gestion_projet.tickets_urgence VALUES (1, 'Faible', 'success');
INSERT INTO _a_gestion_projet.tickets_urgence VALUES (2, 'Moyen', 'warning');
INSERT INTO _a_gestion_projet.tickets_urgence VALUES (3, 'Urgent', 'danger');


--
-- TOC entry 3508 (class 0 OID 0)
-- Dependencies: 211
-- Name: boite_outils_id_outil_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.boite_outils_id_outil_seq', 18, true);


--
-- TOC entry 3509 (class 0 OID 0)
-- Dependencies: 213
-- Name: categories_id_cat_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.categories_id_cat_seq', 13, true);


--
-- TOC entry 3510 (class 0 OID 0)
-- Dependencies: 215
-- Name: commentaires_id_commentaire_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.commentaires_id_commentaire_seq', 30, true);


--
-- TOC entry 3511 (class 0 OID 0)
-- Dependencies: 217
-- Name: commentaires_outils_id_commentaire_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.commentaires_outils_id_commentaire_seq', 7, true);


--
-- TOC entry 3512 (class 0 OID 0)
-- Dependencies: 219
-- Name: groupes_id_groupe_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.groupes_id_groupe_seq', 1, true);


--
-- TOC entry 3513 (class 0 OID 0)
-- Dependencies: 221
-- Name: membres_id_membre_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.membres_id_membre_seq', 23, true);


--
-- TOC entry 3514 (class 0 OID 0)
-- Dependencies: 223
-- Name: projet_membre_id_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.projet_membre_id_seq', 124, true);


--
-- TOC entry 3515 (class 0 OID 0)
-- Dependencies: 225
-- Name: projet_routine_id_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.projet_routine_id_seq', 6, true);


--
-- TOC entry 3516 (class 0 OID 0)
-- Dependencies: 227
-- Name: projets_id_projet_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.projets_id_projet_seq', 67, true);


--
-- TOC entry 3517 (class 0 OID 0)
-- Dependencies: 229
-- Name: statuts_id_statut_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.statuts_id_statut_seq', 3, true);


--
-- TOC entry 3518 (class 0 OID 0)
-- Dependencies: 231
-- Name: ticket_membre_affecte_id_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.ticket_membre_affecte_id_seq', 53, true);


--
-- TOC entry 3519 (class 0 OID 0)
-- Dependencies: 233
-- Name: tickets_id_ticket_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.tickets_id_ticket_seq', 66, true);


--
-- TOC entry 3520 (class 0 OID 0)
-- Dependencies: 235
-- Name: tickets_urgence_id_urgence_seq; Type: SEQUENCE SET; Schema: _a_gestion_projet; Owner: postgres
--

SELECT pg_catalog.setval('_a_gestion_projet.tickets_urgence_id_urgence_seq', 3, true);


--
-- TOC entry 3268 (class 2606 OID 39664)
-- Name: boite_outils boite_outils_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.boite_outils
    ADD CONSTRAINT boite_outils_pkey PRIMARY KEY (id_outil);


--
-- TOC entry 3270 (class 2606 OID 39666)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id_cat);


--
-- TOC entry 3274 (class 2606 OID 39668)
-- Name: commentaires_outils commentaires_outils_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.commentaires_outils
    ADD CONSTRAINT commentaires_outils_pkey PRIMARY KEY (id_commentaire);


--
-- TOC entry 3272 (class 2606 OID 39670)
-- Name: commentaires commentaires_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.commentaires
    ADD CONSTRAINT commentaires_pkey PRIMARY KEY (id_commentaire);


--
-- TOC entry 3276 (class 2606 OID 39672)
-- Name: groupes groupes_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.groupes
    ADD CONSTRAINT groupes_pkey PRIMARY KEY (id_groupe);


--
-- TOC entry 3278 (class 2606 OID 39674)
-- Name: membres membres_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.membres
    ADD CONSTRAINT membres_pkey PRIMARY KEY (id_membre);


--
-- TOC entry 3280 (class 2606 OID 39676)
-- Name: projet_membre projet_membre_id_projet_id_membre_key; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projet_membre
    ADD CONSTRAINT projet_membre_id_projet_id_membre_key UNIQUE (id_projet, id_membre);


--
-- TOC entry 3282 (class 2606 OID 39678)
-- Name: projet_membre projet_membre_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projet_membre
    ADD CONSTRAINT projet_membre_pkey PRIMARY KEY (id);


--
-- TOC entry 3284 (class 2606 OID 39680)
-- Name: projet_routine projet_routine_id_projet_id_routine_key; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projet_routine
    ADD CONSTRAINT projet_routine_id_projet_id_routine_key UNIQUE (id_projet, id_routine);


--
-- TOC entry 3286 (class 2606 OID 39682)
-- Name: projet_routine projet_routine_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projet_routine
    ADD CONSTRAINT projet_routine_pkey PRIMARY KEY (id);


--
-- TOC entry 3288 (class 2606 OID 39684)
-- Name: projets projets_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projets
    ADD CONSTRAINT projets_pkey PRIMARY KEY (id_projet);


--
-- TOC entry 3290 (class 2606 OID 39686)
-- Name: statuts statuts_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.statuts
    ADD CONSTRAINT statuts_pkey PRIMARY KEY (id_statut);


--
-- TOC entry 3292 (class 2606 OID 39688)
-- Name: ticket_membre_affecte ticket_membre_affecte_id_ticket_id_membre_key; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.ticket_membre_affecte
    ADD CONSTRAINT ticket_membre_affecte_id_ticket_id_membre_key UNIQUE (id_ticket, id_membre);


--
-- TOC entry 3294 (class 2606 OID 39690)
-- Name: ticket_membre_affecte ticket_membre_affecte_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.ticket_membre_affecte
    ADD CONSTRAINT ticket_membre_affecte_pkey PRIMARY KEY (id);


--
-- TOC entry 3296 (class 2606 OID 39692)
-- Name: tickets ticket_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.tickets
    ADD CONSTRAINT ticket_pkey PRIMARY KEY (id_ticket);


--
-- TOC entry 3298 (class 2606 OID 39694)
-- Name: tickets_urgence tickets_urgence_pkey; Type: CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.tickets_urgence
    ADD CONSTRAINT tickets_urgence_pkey PRIMARY KEY (id_urgence);


--
-- TOC entry 3317 (class 2620 OID 39695)
-- Name: tickets insert_ticket_membre_relation; Type: TRIGGER; Schema: _a_gestion_projet; Owner: postgres
--

CREATE TRIGGER insert_ticket_membre_relation AFTER INSERT ON _a_gestion_projet.tickets FOR EACH ROW EXECUTE FUNCTION _a_gestion_projet.insert_ticket_membre_affecte_rel();


--
-- TOC entry 3299 (class 2606 OID 39696)
-- Name: boite_outils boite_outils_id_categorie_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.boite_outils
    ADD CONSTRAINT boite_outils_id_categorie_fkey FOREIGN KEY (id_categorie) REFERENCES _a_gestion_projet.categories(id_cat);


--
-- TOC entry 3300 (class 2606 OID 39701)
-- Name: commentaires commentaires_id_membre_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.commentaires
    ADD CONSTRAINT commentaires_id_membre_fkey FOREIGN KEY (id_membre) REFERENCES _a_gestion_projet.membres(id_membre);


--
-- TOC entry 3301 (class 2606 OID 39706)
-- Name: commentaires commentaires_id_ticket_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.commentaires
    ADD CONSTRAINT commentaires_id_ticket_fkey FOREIGN KEY (id_ticket) REFERENCES _a_gestion_projet.tickets(id_ticket) ON DELETE CASCADE;


--
-- TOC entry 3302 (class 2606 OID 39711)
-- Name: commentaires_outils commentaires_outils_id_member_fk; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.commentaires_outils
    ADD CONSTRAINT commentaires_outils_id_member_fk FOREIGN KEY (id_membre) REFERENCES _a_gestion_projet.membres(id_membre) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3303 (class 2606 OID 39716)
-- Name: commentaires_outils commentaires_outils_id_outil_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.commentaires_outils
    ADD CONSTRAINT commentaires_outils_id_outil_fkey FOREIGN KEY (id_outil) REFERENCES _a_gestion_projet.boite_outils(id_outil) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3304 (class 2606 OID 39721)
-- Name: membres membres_id_groupe_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.membres
    ADD CONSTRAINT membres_id_groupe_fkey FOREIGN KEY (id_groupe) REFERENCES _a_gestion_projet.groupes(id_groupe);


--
-- TOC entry 3305 (class 2606 OID 39726)
-- Name: projet_membre projet_membre_id_membre_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projet_membre
    ADD CONSTRAINT projet_membre_id_membre_fkey FOREIGN KEY (id_membre) REFERENCES _a_gestion_projet.membres(id_membre) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3306 (class 2606 OID 39731)
-- Name: projet_membre projet_membre_id_projet_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projet_membre
    ADD CONSTRAINT projet_membre_id_projet_fkey FOREIGN KEY (id_projet) REFERENCES _a_gestion_projet.projets(id_projet) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3307 (class 2606 OID 39736)
-- Name: projet_routine projet_routine_id_projet_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projet_routine
    ADD CONSTRAINT projet_routine_id_projet_fkey FOREIGN KEY (id_projet) REFERENCES _a_gestion_projet.projets(id_projet) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3308 (class 2606 OID 39741)
-- Name: projet_routine projet_routine_id_routine_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projet_routine
    ADD CONSTRAINT projet_routine_id_routine_fkey FOREIGN KEY (id_routine) REFERENCES _a_gestion_projet.projets(id_projet) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3309 (class 2606 OID 39746)
-- Name: projets projets_id_groupe_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projets
    ADD CONSTRAINT projets_id_groupe_fkey FOREIGN KEY (id_groupe) REFERENCES _a_gestion_projet.groupes(id_groupe);


--
-- TOC entry 3310 (class 2606 OID 39751)
-- Name: projets projets_id_statut_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.projets
    ADD CONSTRAINT projets_id_statut_fkey FOREIGN KEY (id_statut) REFERENCES _a_gestion_projet.statuts(id_statut);


--
-- TOC entry 3313 (class 2606 OID 39756)
-- Name: tickets ticket_id_membre_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.tickets
    ADD CONSTRAINT ticket_id_membre_fkey FOREIGN KEY (id_membre) REFERENCES _a_gestion_projet.membres(id_membre);


--
-- TOC entry 3314 (class 2606 OID 39761)
-- Name: tickets ticket_id_projet_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.tickets
    ADD CONSTRAINT ticket_id_projet_fkey FOREIGN KEY (id_projet) REFERENCES _a_gestion_projet.projets(id_projet) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3315 (class 2606 OID 39766)
-- Name: tickets ticket_id_statut_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.tickets
    ADD CONSTRAINT ticket_id_statut_fkey FOREIGN KEY (id_statut) REFERENCES _a_gestion_projet.statuts(id_statut);


--
-- TOC entry 3311 (class 2606 OID 39771)
-- Name: ticket_membre_affecte ticket_membre_affecte_id_membre_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.ticket_membre_affecte
    ADD CONSTRAINT ticket_membre_affecte_id_membre_fkey FOREIGN KEY (id_membre) REFERENCES _a_gestion_projet.membres(id_membre) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3312 (class 2606 OID 39776)
-- Name: ticket_membre_affecte ticket_membre_affecte_id_ticket_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.ticket_membre_affecte
    ADD CONSTRAINT ticket_membre_affecte_id_ticket_fkey FOREIGN KEY (id_ticket) REFERENCES _a_gestion_projet.tickets(id_ticket) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3316 (class 2606 OID 39781)
-- Name: tickets tickets_id_urgence_fkey; Type: FK CONSTRAINT; Schema: _a_gestion_projet; Owner: postgres
--

ALTER TABLE ONLY _a_gestion_projet.tickets
    ADD CONSTRAINT tickets_id_urgence_fkey FOREIGN KEY (id_urgence) REFERENCES _a_gestion_projet.tickets_urgence(id_urgence);


-- Completed on 2022-09-02 09:42:28

--
-- PostgreSQL database dump complete
--

