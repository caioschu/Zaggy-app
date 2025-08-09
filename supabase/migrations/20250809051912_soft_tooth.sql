/*
  # Corrigir políticas RLS para permitir cadastro

  1. Políticas Corrigidas
    - Permitir INSERT de perfis durante cadastro
    - Permitir INSERT de perfis específicos (entregador/empresa)
    - Corrigir políticas existentes

  2. Segurança
    - Manter RLS habilitado
    - Usuários só podem criar/editar próprios perfis
    - Políticas específicas por tipo de usuário
*/

-- Remover políticas existentes problemáticas
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Criar políticas corretas para profiles
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Corrigir políticas para entregador_profiles
DROP POLICY IF EXISTS "Entregadores can read own profile" ON entregador_profiles;
DROP POLICY IF EXISTS "Entregadores can update own profile" ON entregador_profiles;

CREATE POLICY "Entregadores can insert own profile"
  ON entregador_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Entregadores can read own profile"
  ON entregador_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Entregadores can update own profile"
  ON entregador_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Manter política existente para empresas lerem perfis de entregadores
CREATE POLICY "Empresas can read entregador profiles for vagas"
  ON entregador_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'empresa'
    )
  );

-- Corrigir políticas para empresa_profiles
DROP POLICY IF EXISTS "Empresas can read own profile" ON empresa_profiles;
DROP POLICY IF EXISTS "Empresas can update own profile" ON empresa_profiles;

CREATE POLICY "Empresas can insert own profile"
  ON empresa_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Empresas can read own profile"
  ON empresa_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Empresas can update own profile"
  ON empresa_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());