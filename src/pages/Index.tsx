import React, { useState, useEffect, useRef } from 'react'
import { Navigation } from '../components/landing/Navigation'
import { Hero } from '../components/landing/Hero'
import { Partners } from '../components/landing/Partners'
import { About } from '../components/landing/About'
import { Services } from '../components/landing/Services'
import { Products } from '../components/landing/Products'
import { WhyChooseUs } from '../components/landing/WhyChooseUs'
import { Portfolio } from '../components/landing/Portifolio'
import { Testimonials } from '../components/landing/Testimonials'
import { Contact } from '../components/landing/Contact'
import { Footer } from '../components/landing/Footer'
import { WhatsAppButton } from '../components/landing/WhatsAppButton'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase, Product, Service, submitContactForm, requestQuote } from '../lib/supabase'
import { AlertCircle, CheckCircle, Loader2, Download, Phone, Mail, MapPin, Clock, Shield, Package, Users, Zap, Wrench, Settings, Calendar, AlertCircle as AlertCircleIcon, FileText } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { Progress } from '../components/ui/progress'
import { toast } from 'sonner'

const Index = () => {
  const { t, language } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    request_type: 'general',
    product_name: '',
    contact_method: 'phone'
  })
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product_service: '',
    quantity: 1,
    location: '',
    requirements: '',
    budget: ''
  })
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    equipment_type: '',
    brand_model: '',
    issue_description: '',
    urgency: 'standard',
    preferred_date: '',
    preferred_time: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [stats, setStats] = useState({
    experience: 0,
    projects: 0,
    support: 0,
    parts: 0
  })

  const contactRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchData()
    animateStats()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch products and services in parallel
      const [productsData, servicesData] = await Promise.all([
        supabase
          .from('product_catalog')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(6),
        supabase
          .from('service_catalog')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
      ])

      if (productsData.error) throw productsData.error
      if (servicesData.error) throw servicesData.error

      setProducts(productsData.data || [])
      setServices(servicesData.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load data. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const animateStats = () => {
    const targets = { experience: 15, projects: 500, support: 100, parts: 100 }
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    Object.keys(targets).forEach((key) => {
      let current = 0
      const target = targets[key as keyof typeof targets]
      const increment = target / steps

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, interval)
    })
  }

  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'generators') return product.category?.toLowerCase().includes('generator')
    if (activeFilter === 'engines') return product.category?.toLowerCase().includes('engine')
    if (activeFilter === 'parts') return product.category?.toLowerCase().includes('part')
    return true
  })

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone: string) => {
    const re = /^(\+254|0)[17]\d{8}$/
    return re.test(phone.replace(/\s/g, ''))
  }

  const validateForm = (formData: any, type: 'contact' | 'quote' | 'booking') => {
    const errors: Record<string, string> = {}

    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = t('validation.minLength').replace('{length}', '2')
    }

    if (!formData.email || !validateEmail(formData.email)) {
      errors.email = t('validation.email')
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = t('validation.phone')
    }

    if (type === 'contact' && (!formData.message || formData.message.trim().length < 10)) {
      errors.message = t('validation.minLength').replace('{length}', '10')
    }

    if (type === 'quote' && !formData.product_service) {
      errors.product_service = t('validation.required')
    }

    if (type === 'booking' && !formData.equipment_type) {
      errors.equipment_type = t('validation.required')
    }

    return errors
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm(contactForm, 'contact')
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      toast.error(t('contact.error'))
      return
    }

    setIsSubmitting(true)
    setFormErrors({})

    try {
      await submitContactForm({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        company: contactForm.company,
        subject: contactForm.subject,
        message: contactForm.message,
        request_type: contactForm.request_type,
        product_name: contactForm.product_name
      })

      toast.success(t('contact.success'))
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        request_type: 'general',
        product_name: '',
        contact_method: 'phone'
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Submission failed. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm(quoteForm, 'quote')
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      toast.error('Please check the form for errors')
      return
    }

    setIsSubmitting(true)
    setFormErrors({})

    try {
      // First create contact submission
      const contactData = await submitContactForm({
        name: quoteForm.name,
        email: quoteForm.email,
        phone: quoteForm.phone,
        company: quoteForm.company,
        subject: `Quote Request for ${quoteForm.product_service}`,
        message: `Quantity: ${quoteForm.quantity}\nLocation: ${quoteForm.location}\nRequirements: ${quoteForm.requirements}\nBudget: ${quoteForm.budget}`,
        request_type: 'quote',
        product_name: quoteForm.product_service
      })

      // Generate quote number
      const now = new Date()
      const quoteNumber = `Q-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`

      // Create quote record
      await requestQuote({
        contact_submission_id: contactData[0]?.id,
        quote_number: quoteNumber,
        status: 'pending',
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: quoteForm.requirements
      })

      toast.success(t('modal.quote.success'))
      setShowQuoteModal(false)
      
      // Reset form
      setQuoteForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        product_service: '',
        quantity: 1,
        location: '',
        requirements: '',
        budget: ''
      })
    } catch (error) {
      console.error('Error submitting quote:', error)
      toast.error('Quote submission failed. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm(bookingForm, 'booking')
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      toast.error('Please check the form for errors')
      return
    }

    setIsSubmitting(true)
    setFormErrors({})

    try {
      await submitContactForm({
        name: bookingForm.name,
        email: bookingForm.email,
        phone: bookingForm.phone,
        subject: `Service Booking: ${bookingForm.equipment_type}`,
        message: `Equipment: ${bookingForm.brand_model}\nIssue: ${bookingForm.issue_description}\nUrgency: ${bookingForm.urgency}\nPreferred: ${bookingForm.preferred_date} ${bookingForm.preferred_time}`,
        request_type: 'service'
      })

      toast.success(t('modal.booking.success'))
      setShowBookingModal(false)
      
      // Reset form
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        equipment_type: '',
        brand_model: '',
        issue_description: '',
        urgency: 'standard',
        preferred_date: '',
        preferred_time: ''
      })
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast.error('Booking submission failed. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openWhatsApp = (prefilledMessage = '') => {
    const message = encodeURIComponent(prefilledMessage || t('whatsapp.message'))
    const phoneNumber = '254718234222'
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const handleProductWhatsApp = (productName: string) => {
    const message = `Hi, I'm interested in the ${productName}. Can you provide more details and pricing?`
    openWhatsApp(message)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading Wings Engineering...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Wings Engineering Services Ltd",
          "image": "https://wings.lovable.app/android-chrome-512x512.png",
          "telephone": "+254718234222",
          "email": "sales@wingsengineeringservices.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "P.O. Box 4529-01002 Madaraka",
            "addressLocality": "Thika",
            "addressRegion": "Nairobi County",
            "postalCode": "01002",
            "addressCountry": "KE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-1.033",
            "longitude": "37.069"
          },
          "url": "https://wings.lovable.app",
          "priceRange": "Contact for quote",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "09:00",
              "closes": "14:00"
            }
          ],
          "sameAs": [
            "https://www.facebook.com/wingsengineeringservices",
            "https://www.instagram.com/wingsengineering"
          ]
        })}
      </script>

      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-in slide-in-from-left duration-1000">
                {t('hero.headline')}
              </h1>
              <p className="text-xl sm:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
                {t('hero.subheadline')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg"
                  onClick={() => setShowQuoteModal(true)}
                >
                  {t('hero.cta.quote')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                  onClick={() => window.location.href = 'tel:+254718234222'}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t('hero.cta.call')}
                </Button>
              </div>
              
              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Clock, value: stats.experience, label: t('hero.stats.experience') },
                  { icon: CheckCircle, value: stats.projects, label: t('hero.stats.projects') },
                  { icon: AlertCircle, value: stats.support, label: t('hero.stats.support') },
                  { icon: Shield, value: stats.parts, label: t('hero.stats.parts') }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="h-8 w-8 text-orange-500 mr-2" />
                      <span className="text-3xl font-bold text-white">{stat.value}+</span>
                    </div>
                    <p className="text-sm text-blue-200">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <Partners />

        {/* About Section */}
        <section id="about" className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {t('about.title')}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t('about.content')}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[t('about.features.experience'), t('about.features.parts'), t('about.features.support'), t('about.features.specialist')].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{t('about.trust.legal')}</p>
                  </div>
                  <div className="flex items-start">
                    <Badge className="mr-2">✓</Badge>
                    <p className="text-sm text-gray-600">{t('about.trust.certified')}</p>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{t('about.trust.local')}</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Wings Engineering workshop in Thika"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-sm">
                  <h3 className="font-bold text-gray-900 mb-2">Thika Headquarters</h3>
                  <p className="text-sm text-gray-600">P.O. Box 4529-01002 Madaraka, Thika</p>
                  <Button variant="link" className="p-0 h-auto text-blue-600 mt-2">
                    Get Directions →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 lg:py-24 bg-white" ref={servicesRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t('services.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive engineering solutions for industrial and commercial clients across East Africa
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service, index) => {
                const icons = [Zap, Wrench, Settings, Calendar, AlertCircleIcon, FileText]
                const Icon = icons[index] || Settings
                
                return (
                  <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="h-10 w-10 text-blue-600" />
                        <Badge variant={service.mobile_service ? "default" : "secondary"}>
                          {service.mobile_service ? 'Mobile' : 'On-site'}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mt-4">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {service.requirements?.slice(0, 3).map((req, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{req}</span>
                          </div>
                        ))}
                      </div>
                      {service.base_price && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-lg font-semibold text-gray-900">
                            From {service.currency} {service.base_price.toLocaleString()}
                            {service.price_type && <span className="text-sm font-normal text-gray-600"> / {service.price_type}</span>}
                          </p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={() => {
                          setSelectedService(service)
                          setShowBookingModal(true)
                        }}
                      >
                        {t('services.cta.book')}
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('contact')}
              >
                View All Services
              </Button>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 lg:py-24 bg-gray-50" ref={productsRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t('products.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                High-quality generators, engines, and genuine spare parts from trusted brands
              </p>
            </div>

            {/* Filter Tabs */}
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                <TabsTrigger value="all" onClick={() => setActiveFilter('all')}>
                  {t('products.filter.all')}
                </TabsTrigger>
                <TabsTrigger value="generators" onClick={() => setActiveFilter('generators')}>
                  {t('products.filter.generators')}
                </TabsTrigger>
                <TabsTrigger value="engines" onClick={() => setActiveFilter('engines')}>
                  {t('products.filter.engines')}
                </TabsTrigger>
                <TabsTrigger value="parts" onClick={() => setActiveFilter('parts')}>
                  {t('products.filter.parts')}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                <p className="mt-2 text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Check back soon for our latest products</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
                      {product.primary_image_url ? (
                        <img 
                          src={product.primary_image_url} 
                          alt={product.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Package className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                      {product.stock_quantity > 0 ? (
                        <Badge className="absolute top-3 right-3 bg-green-500">In Stock</Badge>
                      ) : (
                        <Badge variant="destructive" className="absolute top-3 right-3">Out of Stock</Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <CardDescription>{product.brand} {product.model}</CardDescription>
                        </div>
                        {product.price && (
                          <span className="text-lg font-bold text-gray-900">
                            {product.currency} {product.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {product.power_kva && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t('products.specs.power')}:</span>
                            <span className="font-medium">{product.power_kva} kVA</span>
                          </div>
                        )}
                        {product.engine_brand && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t('products.specs.engine')}:</span>
                            <span className="font-medium">{product.engine_brand} {product.engine_model}</span>
                          </div>
                        )}
                        {product.fuel_type && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t('products.specs.fuel')}:</span>
                            <span className="font-medium">{product.fuel_type}</span>
                          </div>
                        )}
                        {product.voltage && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t('products.specs.voltage')}:</span>
                            <span className="font-medium">{product.voltage}</span>
                          </div>
                        )}
                      </div>
                      {product.short_description && (
                        <p className="mt-4 text-sm text-gray-600 line-clamp-2">{product.short_description}</p>
                      )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                      <Button 
                        className="w-full"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {t('products.cta.details')}
                      </Button>
                      <div className="flex gap-2 w-full">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setQuoteForm(prev => ({ ...prev, product_service: product.name }))
                            setShowQuoteModal(true)
                          }}
                        >
                          {t('products.cta.quote')}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleProductWhatsApp(product.name)}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  // Navigate to full products page or expand section
                  setActiveFilter('all')
                }}
              >
                {t('products.viewAll')}
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Portfolio Section */}
        <Portfolio />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Section */}
        <section id="contact" className="py-16 lg:py-24 bg-white" ref={contactRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get in touch with our engineering team for quotes, service bookings, or technical consultations
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.form.name')} *</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className={formErrors.name ? 'border-red-500' : ''}
                      />
                      {formErrors.name && (
                        <p className="text-sm text-red-500">{formErrors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact.form.email')} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className={formErrors.email ? 'border-red-500' : ''}
                      />
                      {formErrors.email && (
                        <p className="text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                      <Input
                        id="phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className={formErrors.phone ? 'border-red-500' : ''}
                        placeholder="+254 718 234 222"
                      />
                      {formErrors.phone && (
                        <p className="text-sm text-red-500">{formErrors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t('contact.form.company')}</Label>
                      <Input
                        id="company"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="request_type">{t('contact.form.type')}</Label>
                    <Select
                      value={contactForm.request_type}
                      onValueChange={(value) => setContactForm({ ...contactForm, request_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quote">{t('contact.form.type.quote')}</SelectItem>
                        <SelectItem value="service">{t('contact.form.type.service')}</SelectItem>
                        <SelectItem value="parts">{t('contact.form.type.parts')}</SelectItem>
                        <SelectItem value="general">{t('contact.form.type.general')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product_name">{t('contact.form.product')}</Label>
                    <Input
                      id="product_name"
                      value={contactForm.product_name}
                      onChange={(e) => setContactForm({ ...contactForm, product_name: e.target.value })}
                      placeholder="e.g., 50kVA Generator, Engine Repair, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message')} *</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className={formErrors.message ? 'border-red-500' : ''}
                    />
                    {formErrors.message && (
                      <p className="text-sm text-red-500">{formErrors.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>{t('contact.form.contact')}</Label>
                    <RadioGroup
                      value={contactForm.contact_method}
                      onValueChange={(value) => setContactForm({ ...contactForm, contact_method: value })}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="contact-phone" />
                        <Label htmlFor="contact-phone">{t('contact.form.contact.phone')}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="contact-email" />
                        <Label htmlFor="contact-email">{t('contact.form.contact.email')}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whatsapp" id="contact-whatsapp" />
                        <Label htmlFor="contact-whatsapp">{t('contact.form.contact.whatsapp')}</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      t('contact.form.submit')
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('contact.info.title')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">{t('contact.info.address')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <a href="tel:+254718234222" className="text-gray-600 hover:text-blue-600">
                          {t('contact.info.phone')}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <a href="mailto:sales@wingsengineeringservices.com" className="text-gray-600 hover:text-blue-600">
                          {t('contact.info.email')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('contact.info.hours.title')}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('contact.info.hours.weekdays')}</span>
                      <span className="font-medium">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('contact.info.hours.saturday')}</span>
                      <span className="font-medium">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('contact.info.hours.sunday')}</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Location Map</h3>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63820.19694522153!2d37.06925939999999!3d-1.0332693999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4f3b3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sThika%2C%20Kenya!5e0!3m2!1sen!2sus!4v1234567890123"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Wings Engineering Thika Location"
                    />
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <MapPin className="mr-2 h-4 w-4" />
                    Get Directions on Google Maps
                  </Button>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1" onClick={() => openWhatsApp()}>
                    <Phone className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => window.location.href = 'tel:+254718234222'}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Quote Request Modal */}
      <Dialog open={showQuoteModal} onOpenChange={setShowQuoteModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('modal.quote.title')}</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll send you a detailed quote within 48 hours
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleQuoteSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quote-name">{t('contact.form.name')} *</Label>
                <Input
                  id="quote-name"
                  value={quoteForm.name}
                  onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                  className={formErrors.name ? 'border-red-500' : ''}
                />
                {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-email">{t('contact.form.email')} *</Label>
                <Input
                  id="quote-email"
                  type="email"
                  value={quoteForm.email}
                  onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                  className={formErrors.email ? 'border-red-500' : ''}
                />
                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quote-phone">{t('contact.form.phone')}</Label>
                <Input
                  id="quote-phone"
                  value={quoteForm.phone}
                  onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                  className={formErrors.phone ? 'border-red-500' : ''}
                />
                {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-company">{t('contact.form.company')}</Label>
                <Input
                  id="quote-company"
                  value={quoteForm.company}
                  onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-product">{t('contact.form.product')} *</Label>
              <Input
                id="quote-product"
                value={quoteForm.product_service}
                onChange={(e) => setQuoteForm({ ...quoteForm, product_service: e.target.value })}
                className={formErrors.product_service ? 'border-red-500' : ''}
                placeholder="e.g., 50kVA Generator, Engine Parts, Maintenance Service"
              />
              {formErrors.product_service && <p className="text-sm text-red-500">{formErrors.product_service}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quote-quantity">{t('modal.quote.quantity')}</Label>
                <Input
                  id="quote-quantity"
                  type="number"
                  min="1"
                  value={quoteForm.quantity}
                  onChange={(e) => setQuoteForm({ ...quoteForm, quantity: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-budget">{t('modal.quote.budget')}</Label>
                <Select
                  value={quoteForm.budget}
                  onValueChange={(value) => setQuoteForm({ ...quoteForm, budget: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-500k">Under KES 500,000</SelectItem>
                    <SelectItem value="500k-1m">KES 500,000 - 1M</SelectItem>
                    <SelectItem value="1m-5m">KES 1M - 5M</SelectItem>
                    <SelectItem value="5m-plus">KES 5M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-location">{t('modal.quote.location')}</Label>
              <Input
                id="quote-location"
                value={quoteForm.location}
                onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                placeholder="City, specific address or site location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-requirements">{t('modal.quote.requirements')}</Label>
              <Textarea
                id="quote-requirements"
                rows={3}
                value={quoteForm.requirements}
                onChange={(e) => setQuoteForm({ ...quoteForm, requirements: e.target.value })}
                placeholder="Any specific requirements, timeline, or additional details"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowQuoteModal(false)}>
                {t('modal.close')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  t('modal.quote.submit')
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('modal.booking.title')}</DialogTitle>
            <DialogDescription>
              Book a service appointment with our engineering team
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="booking-name">{t('contact.form.name')} *</Label>
                <Input
                  id="booking-name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className={formErrors.name ? 'border-red-500' : ''}
                />
                {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-email">{t('contact.form.email')} *</Label>
                <Input
                  id="booking-email"
                  type="email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  className={formErrors.email ? 'border-red-500' : ''}
                />
                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-phone">{t('contact.form.phone')}</Label>
              <Input
                id="booking-phone"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                className={formErrors.phone ? 'border-red-500' : ''}
              />
              {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-equipment">{t('modal.booking.equipment')} *</Label>
              <Select
                value={bookingForm.equipment_type}
                onValueChange={(value) => setBookingForm({ ...bookingForm, equipment_type: value })}
              >
                <SelectTrigger className={formErrors.equipment_type ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select equipment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="generator">Generator</SelectItem>
                  <SelectItem value="engine">Engine</SelectItem>
                  <SelectItem value="electrical">Electrical System</SelectItem>
                  <SelectItem value="other">Other Equipment</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.equipment_type && <p className="text-sm text-red-500">{formErrors.equipment_type}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-brand">{t('modal.booking.brand')}</Label>
              <Input
                id="booking-brand"
                value={bookingForm.brand_model}
                onChange={(e) => setBookingForm({ ...bookingForm, brand_model: e.target.value })}
                placeholder="e.g., Lister Petter LPW4, 50kVA Generator"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-issue">{t('modal.booking.issue')}</Label>
              <Textarea
                id="booking-issue"
                rows={3}
                value={bookingForm.issue_description}
                onChange={(e) => setBookingForm({ ...bookingForm, issue_description: e.target.value })}
                placeholder="Describe the issue or service required"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="booking-urgency">{t('modal.booking.urgency')}</Label>
                <Select
                  value={bookingForm.urgency}
                  onValueChange={(value) => setBookingForm({ ...bookingForm, urgency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">{t('modal.booking.urgency.emergency')}</SelectItem>
                    <SelectItem value="urgent">{t('modal.booking.urgency.urgent')}</SelectItem>
                    <SelectItem value="standard">{t('modal.booking.urgency.standard')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-date">{t('modal.booking.date')}</Label>
                <Input
                  id="booking-date"
                  type="date"
                  value={bookingForm.preferred_date}
                  onChange={(e) => setBookingForm({ ...bookingForm, preferred_date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-time">{t('modal.booking.time')}</Label>
              <Select
                value={bookingForm.preferred_time}
                onValueChange={(value) => setBookingForm({ ...bookingForm, preferred_time: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                  <SelectItem value="evening">Evening (4PM - 6PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowBookingModal(false)}>
                {t('modal.close')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  t('modal.booking.submit')
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogDescription>
                {selectedProduct.brand} {selectedProduct.model}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {selectedProduct.primary_image_url && (
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.primary_image_url}
                    alt={selectedProduct.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Specifications</h4>
                  <dl className="space-y-2">
                    {selectedProduct.power_kva && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Power Rating:</dt>
                        <dd className="font-medium">{selectedProduct.power_kva} kVA ({selectedProduct.power_kw} kW)</dd>
                      </div>
                    )}
                    {selectedProduct.engine_brand && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Engine:</dt>
                        <dd className="font-medium">{selectedProduct.engine_brand} {selectedProduct.engine_model}</dd>
                      </div>
                    )}
                    {selectedProduct.engine_type && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Engine Type:</dt>
                        <dd className="font-medium">{selectedProduct.engine_type}</dd>
                      </div>
                    )}
                    {selectedProduct.cylinders && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Cylinders:</dt>
                        <dd className="font-medium">{selectedProduct.cylinders}</dd>
                      </div>
                    )}
                    {selectedProduct.fuel_type && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Fuel Type:</dt>
                        <dd className="font-medium">{selectedProduct.fuel_type}</dd>
                      </div>
                    )}
                    {selectedProduct.voltage && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Voltage:</dt>
                        <dd className="font-medium">{selectedProduct.voltage}</dd>
                      </div>
                    )}
                    {selectedProduct.frequency && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Frequency:</dt>
                        <dd className="font-medium">{selectedProduct.frequency} Hz</dd>
                      </div>
                    )}
                    {selectedProduct.rpm && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">RPM:</dt>
                        <dd className="font-medium">{selectedProduct.rpm}</dd>
                      </div>
                    )}
                    {selectedProduct.weight_kg && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Weight:</dt>
                        <dd className="font-medium">{selectedProduct.weight_kg} kg</dd>
                      </div>
                    )}
                    {selectedProduct.dimensions && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Dimensions:</dt>
                        <dd className="font-medium">{selectedProduct.dimensions}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                  {selectedProduct.key_features && selectedProduct.key_features.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedProduct.key_features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No features listed</p>
                  )}

                  {selectedProduct.applications && selectedProduct.applications.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-900 mt-4 mb-3">Applications</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.applications.map((app, index) => (
                          <Badge key={index} variant="secondary">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {selectedProduct.full_description && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                  <p className="text-gray-600">{selectedProduct.full_description}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Stock Status</p>
                  <p className={`text-lg font-semibold ${selectedProduct.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedProduct.stock_quantity > 0 ? `${selectedProduct.stock_quantity} in stock` : 'Out of stock'}
                  </p>
                </div>
                {selectedProduct.price && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedProduct.currency} {selectedProduct.price.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => {
                    setQuoteForm(prev => ({ ...prev, product_service: selectedProduct.name }))
                    setShowQuoteModal(true)
                    setSelectedProduct(null)
                  }}
                >
                  {t('products.cta.quote')}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleProductWhatsApp(selectedProduct.name)}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {t('products.cta.whatsapp')}
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default Index
