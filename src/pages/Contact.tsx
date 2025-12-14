import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send, Upload, X, FileText } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Security constants for file upload
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];

interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
}

const ContactPage = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `Type de fichier non autorisé. Acceptés : ${ALLOWED_EXTENSIONS.join(', ')}`;
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `Fichier trop volumineux. Taille max : ${MAX_FILE_SIZE / (1024 * 1024)}Mo`;
    }
    
    // Check file extension matches content type (security)
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return `Extension non valide. Acceptées : ${ALLOWED_EXTENSIONS.join(', ')}`;
    }
    
    return null;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (uploadedFiles.length + files.length > MAX_FILES) {
      toast({
        title: "Trop de fichiers",
        description: `Maximum ${MAX_FILES} fichiers autorisés`,
        variant: "destructive",
      });
      return;
    }

    const validFiles: UploadedFile[] = [];
    
    for (const file of files) {
      const error = validateFile(file);
      if (error) {
        toast({
          title: "Fichier invalide",
          description: `${file.name}: ${error}`,
          variant: "destructive",
        });
        continue;
      }

      const uploadedFile: UploadedFile = {
        file,
        id: crypto.randomUUID(),
      };

      // Create preview for images
      if (file.type.startsWith('image/')) {
        uploadedFile.preview = URL.createObjectURL(file);
      }

      validFiles.push(uploadedFile);
    }

    setUploadedFiles((prev) => [...prev, ...validFiles]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, you would upload files to a secure server here
    // using FormData and a backend endpoint with proper validation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Envoyé",
      description: "Merci pour votre demande. Nous vous répondrons rapidement !",
    });

    // Cleanup file previews
    uploadedFiles.forEach((f) => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });

    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    setUploadedFiles([]);
    setIsSubmitting(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' o';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
    return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
  };

  return (
    <>
      <Helmet>
        <title>Nous Contacter - SWH Négoce</title>
        <meta
          name="description"
          content="Contactez SWH Négoce pour vos demandes de devis, questions sur nos produits d'hygiène et consommables. Notre équipe est là pour vous aider."
        />
      </Helmet>
      <Layout>
        {/* Page Header */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Nous Contacter
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Vous avez des questions ou besoin d'un devis ? Nous sommes là pour 
                vous aider. Notre équipe vous répondra rapidement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Demander un Devis
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom Complet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        maxLength={100}
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Adresse Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        maxLength={255}
                        placeholder="jean@entreprise.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        maxLength={20}
                        placeholder="+33 1 23 45 67 89"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Nom de l'Entreprise</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        maxLength={100}
                        placeholder="Votre Entreprise SARL"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Votre Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      maxLength={2000}
                      placeholder="Décrivez vos besoins..."
                      rows={5}
                    />
                  </div>

                  {/* File Upload Section */}
                  <div className="space-y-3">
                    <Label>Pièces Jointes (Optionnel)</Label>
                    <p className="text-sm text-muted-foreground">
                      Joignez des images ou fichiers PDF (max {MAX_FILES} fichiers, {MAX_FILE_SIZE / (1024 * 1024)}Mo chacun)
                    </p>
                    
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={ALLOWED_EXTENSIONS.join(',')}
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Cliquez pour télécharger ou glissez-déposez
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG, WebP, PDF
                      </p>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2 mt-4">
                        {uploadedFiles.map((uploadedFile) => (
                          <div
                            key={uploadedFile.id}
                            className="flex items-center gap-3 p-3 bg-secondary rounded-lg"
                          >
                            {uploadedFile.preview ? (
                              <img
                                src={uploadedFile.preview}
                                alt="Aperçu"
                                className="w-10 h-10 object-cover rounded"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {uploadedFile.file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(uploadedFile.file.size)}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(uploadedFile.id)}
                              className="shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Envoyer le Message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:pl-8"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Nos Coordonnées
                </h2>
                <p className="text-muted-foreground mb-8">
                  Vous préférez nous contacter directement ? Utilisez l'un des 
                  canaux suivants. Nous répondons généralement sous 24 heures.
                </p>

                <div className="space-y-6">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        WhatsApp
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Réponses rapides aux heures de bureau
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+1234567890"
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        +1 (234) 567-890
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Lun-Ven, 8h00 - 18h00
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:contact@swhnegoce.com"
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        contact@swhnegoce.com
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Réponse sous 24 heures
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Notre Adresse
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        123 Zone Industrielle
                        <br />
                        Ville, Pays 12345
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ContactPage;
