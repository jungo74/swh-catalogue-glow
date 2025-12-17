import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Upload, X, FileText, Clock, Shield, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

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
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
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
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `Type de fichier non autorisé. Acceptés : ${ALLOWED_EXTENSIONS.join(', ')}`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `Fichier trop volumineux. Taille max : ${MAX_FILE_SIZE / (1024 * 1024)}Mo`;
    }
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

      if (file.type.startsWith('image/')) {
        uploadedFile.preview = URL.createObjectURL(file);
      }

      validFiles.push(uploadedFile);
    }

    setUploadedFiles((prev) => [...prev, ...validFiles]);
    
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

    try {
      // Prepare products data for Supabase
      const productsData = items.map(item => ({
        id: item.product._id,
        name: item.product.name,
        slug: item.product.slug,
        category: item.product.category.name,
        quantity: item.quantity,
        image: item.product.images[0],
      }));

      // Insert quote request into Supabase
      const { error } = await supabase
        .from('quote_requests')
        .insert({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone || null,
          customer_company: formData.company || null,
          message: formData.message,
          products: productsData,
        });

      if (error) {
        console.error('Error submitting quote:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue. Veuillez réessayer.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Demande Envoyée !",
        description: "Merci pour votre demande de devis. Nous vous répondrons rapidement !",
      });

      // Clean up
      uploadedFiles.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });

      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setUploadedFiles([]);
      clearCart();
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' o';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
    return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
  };

  // WhatsApp SVG Icon
  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

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
        {/* Page Header with Background */}
        <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-foreground/70" />
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <span className="inline-block px-4 py-1.5 bg-primary-foreground/20 text-primary-foreground font-semibold text-sm rounded-full mb-4 backdrop-blur-sm">
                Contactez-nous
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Parlons de Votre Projet
              </h1>
              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-6">
                Vous avez des questions ou besoin d'un devis personnalisé ? 
                Notre équipe d'experts est à votre écoute.
              </p>
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full text-primary-foreground/90 text-sm">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Nous pouvons fournir tout produit à la demande
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cart Products Section */}
        {items.length > 0 && (
          <section className="py-8 bg-secondary/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl shadow-card p-6 border border-border/50"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Produits Sélectionnés</h2>
                    <p className="text-sm text-muted-foreground">{items.length} produit(s) dans votre demande</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.product._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.product.category.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Contact Content */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-3"
              >
                <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 border border-border/50">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Demander un Devis Gratuit
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Remplissez le formulaire ci-dessous et nous vous répondrons sous 24h.
                    {items.length > 0 && (
                      <span className="block mt-1 text-accent font-medium">
                        {items.length} produit(s) seront inclus dans votre demande.
                      </span>
                    )}
                  </p>
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
                          className="h-12"
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
                          className="h-12"
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
                          placeholder="+212 6 12 34 56 78"
                          className="h-12"
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
                          className="h-12"
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
                        placeholder="Décrivez vos besoins en détail..."
                        rows={5}
                        className="resize-none"
                      />
                    </div>

                    {/* File Upload Section */}
                    <div className="space-y-3">
                      <Label>Pièces Jointes (Optionnel)</Label>
                      <p className="text-sm text-muted-foreground">
                        Joignez des images ou fichiers PDF (max {MAX_FILES} fichiers, {MAX_FILE_SIZE / (1024 * 1024)}Mo chacun)
                      </p>
                      
                      <div 
                        className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
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
                        <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm font-medium text-foreground">
                          Cliquez pour télécharger
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
                      className="w-full h-12 text-base bg-accent hover:bg-accent/90"
                    >
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Envoyer la Demande {items.length > 0 && `(${items.length} produit${items.length > 1 ? 's' : ''})`}
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Info Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Company Info Card */}
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-4">SWH Négoce</h3>
                  <p className="text-primary-foreground/90 text-sm mb-4">
                    Votre partenaire de confiance pour toutes vos fournitures professionnelles au Maroc.
                  </p>
                  <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-lg px-3 py-2">
                    <Shield className="h-4 w-4" />
                    <div>
                      <span className="text-xs opacity-80 block">ICE</span>
                      <span className="font-mono text-sm font-semibold">002075015000049</span>
                    </div>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="space-y-4">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#25D366]/10 border-2 border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform">
                      <WhatsAppIcon />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        WhatsApp
                      </h3>
                      <p className="text-[#25D366] text-sm font-medium">
                        Réponse instantanée
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+212123456789"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-card transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        +212 1 23 45 67 89
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Lun-Ven, 8h00 - 18h00
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:contact@swhnegoce.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-card transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        contact@swhnegoce.com
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Réponse sous 24h
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Notre Adresse
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Zone Industrielle
                        <br />
                        Casablanca, Maroc
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-secondary rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Horaires d'Ouverture</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lundi - Vendredi</span>
                      <span className="font-medium text-foreground">8h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Samedi</span>
                      <span className="font-medium text-foreground">9h00 - 13h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimanche</span>
                      <span className="font-medium text-foreground">Fermé</span>
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
