-- Ajouter des politiques RLS explicites pour bloquer SELECT, UPDATE et DELETE publics
-- Seul le service role (backend) pourra accéder aux données

-- Politique SELECT restrictive - personne ne peut lire via l'API publique
CREATE POLICY "No public read access"
ON public.quote_requests
FOR SELECT
TO anon, authenticated
USING (false);

-- Politique UPDATE restrictive - personne ne peut modifier via l'API publique
CREATE POLICY "No public update access"
ON public.quote_requests
FOR UPDATE
TO anon, authenticated
USING (false);

-- Politique DELETE restrictive - personne ne peut supprimer via l'API publique
CREATE POLICY "No public delete access"
ON public.quote_requests
FOR DELETE
TO anon, authenticated
USING (false);