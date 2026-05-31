
-- Create resumes table
CREATE TABLE public.resumes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  linkedin TEXT,
  github TEXT,
  objective TEXT,
  education JSONB DEFAULT '[]'::jsonb,
  experience JSONB DEFAULT '[]'::jsonb,
  skills TEXT,
  projects JSONB DEFAULT '[]'::jsonb,
  certifications TEXT,
  languages TEXT,
  extracurricular TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public form submission)
CREATE POLICY "Anyone can submit a resume"
  ON public.resumes FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can view resumes (admin)
CREATE POLICY "Authenticated users can view resumes"
  ON public.resumes FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update resumes (status changes)
CREATE POLICY "Authenticated users can update resumes"
  ON public.resumes FOR UPDATE
  TO authenticated
  USING (true);

-- Only authenticated users can delete resumes
CREATE POLICY "Authenticated users can delete resumes"
  ON public.resumes FOR DELETE
  TO authenticated
  USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
