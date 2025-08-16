-- Create default role
CREATE TABLE "roles" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  permissions TEXT[],
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "roles" (id, name, description, permissions, "isActive", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'USER',
  'Default user role with basic permissions',
  ARRAY['read:own', 'write:own'],
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (name) DO NOTHING; 