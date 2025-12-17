-- Supprimer les anciennes politiques RLS
DROP POLICY IF EXISTS "Public can view their own requests by email" ON public.quote_requests;
DROP POLICY IF EXISTS "Anyone can create quote requests" ON public.quote_requests;

-- Créer une politique INSERT sécurisée (les visiteurs peuvent soumettre des demandes)
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Aucune politique SELECT publique - les données clients ne sont accessibles que via le service role (backend)
-- Cela protège les emails, téléphones, noms et informations produits des clients

-- Si vous ajoutez une authentification admin plus tard, vous pourrez ajouter:
-- CREATE POLICY "Admins can view all quote requests"
-- ON public.quote_requests
-- FOR SELECT
-- TO authenticated
-- USING (public.has_role(auth.uid(), 'admin'));