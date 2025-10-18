-- data set généré par LLM

BEGIN;

WITH t_insert AS (
  INSERT INTO taches (titre, description, date_creation, date_echeance, priorite, est_termine)
  VALUES
    ('Rédiger le rapport sprint', 'Préparer le compte-rendu et les KPIs du sprint en cours.', NOW() - INTERVAL '3 days', NOW() + INTERVAL '2 days', 3, FALSE),
    ('Acheter fruits et légumes', 'Pommes, bananes, tomates, carottes, oignons.', NOW() - INTERVAL '1 day', NOW() + INTERVAL '1 day', 2, FALSE),
    ('Prendre RDV dentiste', 'Contrôle semestriel et détartrage.', NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', 1, FALSE),
    ('Payer facture électricité', 'Facture de septembre à régler.', NOW() - INTERVAL '20 days', NOW() - INTERVAL '5 days', 3, TRUE),
    ('Session sport', '30 minutes de cardio + étirements.', NOW() - INTERVAL '2 days', NOW() + INTERVAL '5 days', 1, FALSE),
    ('Livrer maquette client', 'Envoyer la maquette Figma v2 et le récap des feedbacks.', NOW() - INTERVAL '5 days', NOW() + INTERVAL '3 days', 3, FALSE),
    ('Préparer liste de Noël', 'Idées cadeaux famille et amis.', NOW(), NULL, 1, FALSE),
    ('Scanner documents', 'Contrat de prestation et RIB pour archivage.', NOW() - INTERVAL '4 days', NOW() + INTERVAL '1 day', 2, FALSE),
    ('Cuisine batch cooking', 'Préparer 5 repas pour la semaine.', NOW() - INTERVAL '1 day', NOW() + INTERVAL '6 days', 2, FALSE),
    ('Urgence: corriger bug prod', 'Erreur 500 sur /api/login depuis 2h, logs à analyser.', NOW() - INTERVAL '2 hours', NOW() + INTERVAL '6 hours', 3, FALSE)
  RETURNING id, titre
),
cats AS (
  SELECT id, nom
  FROM categories
  WHERE nom IN ('Travail','Personnel','Courses','Sante','Urgent')
)

INSERT INTO taches_categories (tache_id, categorie_id)
SELECT t.id, c.id
FROM (
  VALUES
    ('Rédiger le rapport sprint','Travail'),
    ('Rédiger le rapport sprint','Urgent'),
    ('Livrer maquette client','Travail'),
    ('Urgence: corriger bug prod','Travail'),
    ('Urgence: corriger bug prod','Urgent'),
    ('Acheter fruits et légumes','Courses'),
    ('Cuisine batch cooking','Courses'),
    ('Prendre RDV dentiste','Sante'),
    ('Session sport','Sante'),
    ('Payer facture électricité','Personnel'),
    ('Scanner documents','Personnel'),
    ('Préparer liste de Noël','Personnel')
) AS pairs(titre, nom)
INNER JOIN t_insert t ON t.titre = pairs.titre
INNER JOIN cats c ON c.nom = pairs.nom;

COMMIT;
