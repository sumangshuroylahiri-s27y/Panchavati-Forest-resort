import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import data from './data.json';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Rooms', href: '#accommodation' },
    { name: 'Cuisine', href: '#cuisine' },
    { name: 'Explore', href: '#explore' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-dark-forest/95 backdrop-blur-md py-2 shadow-xl' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <img 
              src={data.identity.logo} 
              alt="Logo" 
              className="h-[55px] w-auto brightness-110" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML += `<span class="text-gold font-serif text-2xl font-bold tracking-tighter">${data.identity.name.split(' ')[0].toUpperCase()}</span>`;
              }}
            />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-white hover:text-gold transition-colors font-medium tracking-wide text-sm uppercase"
              >
                {link.name}
              </a>
            ))}
            <a 
              href={data.identity.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-white transition-colors text-xl"
              title="Chat on WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="#booking" className="btn-gold">Book Now</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 focus:outline-none"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-forest border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white hover:text-gold py-3 text-base font-medium uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#booking" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block btn-gold text-center mt-4"
              >
                Book Now
              </a>
              <a 
                href={data.identity.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block bg-[#25D366] text-white text-center py-3 mt-2 font-medium uppercase tracking-wider"
              >
                <i className="fa-brands fa-whatsapp mr-2"></i>
                WhatsApp Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.hero.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slideshow */}
      {data.hero.slides.map((slide, index) => (
        <motion.div
          key={slide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: index === currentSlide ? 1 : 0,
            scale: index === currentSlide ? 1 : 1.1
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={slide} 
            alt={`Slide ${index}`} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="section-label text-white/90"
        >
          {data.hero.label}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-4 drop-shadow-2xl"
        >
          {data.hero.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-gold-light text-lg md:text-2xl font-medium tracking-[0.2em] uppercase mb-2"
        >
          {data.hero.sub}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="w-24 h-px bg-gold mb-6"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-white/80 text-sm md:text-base tracking-widest mb-10"
        >
          {data.hero.line}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href={data.hero.buttons[0].link} className="btn-gold">{data.hero.buttons[0].text}</a>
          <a 
            href={`${data.identity.whatsappUrl}&text=Hello, I would like to enquire about a stay at ${data.identity.name}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3 rounded-none transition-all duration-300 font-medium tracking-wider uppercase text-sm flex items-center justify-center gap-2"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
            Book via WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50"
      >
        <i className="fa-solid fa-chevron-down text-xl"></i>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">{data.about.label}</span>
            <h2 className="section-title">{data.about.title}</h2>
            <div className="space-y-6 text-muted leading-relaxed text-lg">
              {data.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-bark/10">
              {data.about.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-serif text-gold mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/2] overflow-hidden rounded-sm shadow-2xl">
              <img 
                src={data.about.image} 
                alt="About Resort" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-deep-green -z-10 rounded-sm" />
            <div className="absolute -top-8 -right-8 w-48 h-48 border-2 border-gold -z-10 rounded-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Accommodation = () => {
  return (
    <section id="accommodation" className="py-24 bg-dark-forest text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-label text-gold-light">{data.accommodation.label}</span>
          <h2 className="section-title text-white">{data.accommodation.title}</h2>
          <p className="text-white/60 text-lg">{data.accommodation.subtext}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {data.accommodation.cards.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group bg-white/5 border border-white/10 overflow-hidden hover:border-gold/50 transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {card.badge && (
                  <div className="absolute top-4 right-4 bg-gold text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                    {card.badge}
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif mb-4 group-hover:text-gold transition-colors">{card.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{card.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {card.features.map(f => (
                    <span key={f} className="text-[10px] uppercase tracking-tighter border border-white/20 px-2 py-1 text-white/40">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href="#booking" className="btn-gold flex-1 text-center">Enquire & Book</a>
                  <a 
                    href={`${data.identity.whatsappUrl}&text=Hi, I'm interested in booking the ${card.name} at ${data.identity.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-none transition-all duration-300 flex items-center justify-center"
                    title="Book on WhatsApp"
                  >
                    <i className="fa-brands fa-whatsapp text-xl"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Cuisine = () => {
  return (
    <section id="cuisine" className="py-24 bg-parchment relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-2 aspect-video rounded-sm overflow-hidden shadow-lg"
            >
              <img src={data.cuisine.images[0]} alt="Food 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-square rounded-sm overflow-hidden shadow-lg"
            >
              <img src={data.cuisine.images[1]} alt="Food 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="aspect-square rounded-sm overflow-hidden shadow-lg"
            >
              <img src={data.cuisine.images[2]} alt="Food 3" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <span className="section-label">{data.cuisine.label}</span>
            <h2 className="section-title">{data.cuisine.title}</h2>
            <p className="text-muted text-lg leading-relaxed mb-8">{data.cuisine.text}</p>
            
            <div className="space-y-4">
              {data.cuisine.chips.map((chip, i) => (
                <div key={i} className="flex items-center space-x-4 bg-white/50 p-4 border-l-4 border-gold shadow-sm">
                  <i className="fa-solid fa-leaf text-gold"></i>
                  <span className="font-medium text-dark-forest">{chip}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Facilities = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">{data.facilities.label}</span>
          <h2 className="section-title">{data.facilities.title}</h2>
          <p className="text-muted max-w-2xl mx-auto">{data.facilities.subtext}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4">
          {data.facilities.items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center space-x-3 group"
            >
              <div className="w-8 h-8 rounded-full bg-moss/10 flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                <i className="fa-solid fa-check text-xs text-moss group-hover:text-white"></i>
              </div>
              <span className="text-sm font-medium text-bark/80">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Explore = () => {
  return (
    <section id="explore" className="py-24 bg-deep-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          <div className="lg:col-span-1">
            <span className="section-label text-gold-light">{data.explore.label}</span>
            <h2 className="section-title text-white">{data.explore.title}</h2>
          </div>
          <div className="lg:col-span-2">
            <p className="text-white/70 text-lg leading-relaxed">{data.explore.intro}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.explore.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-sm overflow-hidden group hover:bg-white/10 transition-all duration-500"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 bg-gold px-4 py-1 text-[10px] uppercase font-bold tracking-widest">
                  {card.distance}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif mb-4 text-gold-light">{card.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reach = () => {
  return (
    <section className="py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">{data.reach.label}</span>
          <h2 className="section-title">{data.reach.title}</h2>
          <p className="text-muted max-w-3xl mx-auto italic">"{data.reach.journey}"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {data.reach.mainCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 border-b-4 border-gold shadow-sm text-center"
            >
              <div className="text-gold text-3xl mb-4">
                <i className={`fa-solid ${card.label.includes('Airport') ? 'fa-plane' : card.label.includes('Railway') ? 'fa-train' : 'fa-bus'}`}></i>
              </div>
              <h4 className="text-xs uppercase tracking-widest text-muted mb-2">{card.label}</h4>
              <div className="text-2xl font-serif text-dark-forest">{card.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="bg-dark-forest/5 p-8 rounded-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.reach.smallDistances.map((dist, i) => (
              <div key={i} className="flex justify-between items-center border-b border-bark/10 pb-2">
                <span className="text-sm text-muted">{dist.label}</span>
                <span className="font-serif text-gold">{dist.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-xs text-muted uppercase tracking-widest bg-white/50 py-4 px-6 border border-bark/5">
            <i className="fa-solid fa-circle-info mr-2 text-gold"></i>
            {data.reach.note}
          </p>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [lightbox, setLightbox] = useState({ isOpen: false, current: 0 });

  const openLightbox = (index) => {
    setLightbox({ isOpen: true, current: index });
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
  };

  const nextSlide = () => {
    setLightbox(prev => ({ ...prev, current: (prev.current + 1) % data.gallery.all.length }));
  };

  const prevSlide = () => {
    setLightbox(prev => ({ ...prev, current: (prev.current - 1 + data.gallery.all.length) % data.gallery.all.length }));
  };

  return (
    <section id="gallery" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">{data.gallery.title}</h2>
        </div>

        <div className="masonry-grid">
          {data.gallery.grid.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              className={`relative overflow-hidden cursor-pointer group ${i === 0 ? 'masonry-item-large' : ''}`}
              onClick={() => openLightbox(i)}
            >
              <img 
                src={img} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-dark-forest/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass-plus text-white text-3xl"></i>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => openLightbox(0)}
            className="btn-gold"
          >
            View All Photos
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          >
            <button onClick={closeLightbox} className="absolute top-8 right-8 text-white text-4xl hover:text-gold transition-colors">
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <button onClick={prevSlide} className="absolute left-4 md:left-8 text-white text-4xl hover:text-gold transition-colors">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            
            <motion.img 
              key={lightbox.current}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={data.gallery.all[lightbox.current]} 
              alt="Lightbox" 
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
            
            <button onClick={nextSlide} className="absolute right-4 md:right-8 text-white text-4xl hover:text-gold transition-colors">
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            <div className="absolute bottom-8 text-white/70 font-medium tracking-widest">
              {lightbox.current + 1} / {data.gallery.all.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const BookingForm = () => {
  const [formData, setFormData] = useState({
    bookingType: 'Room Booking',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    arrivalDate: '',
    departureDate: '',
    adults: '1',
    children: '0',
    roomRequired: 'Not Decided Yet',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsApp = () => {
    const text = `Hello ${data.identity.name}
Booking Enquiry:
Name: ${formData.firstName} ${formData.lastName}
Mobile: ${formData.mobile}
Arrival: ${formData.arrivalDate}
Departure: ${formData.departureDate}
Room: ${formData.roomRequired}
Adults: ${formData.adults} Children: ${formData.children}
Address: ${formData.address}
Message: ${formData.message}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`${data.identity.whatsappUrl}&text=${encodedText}`, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your request! We will contact you shortly.');
  };

  return (
    <section id="booking" className="py-24 bg-dark-forest relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img src="https://images.weserv.nl/?q=100&w=1920&url=www.panchavatiforestresort.com/images/banner.jpg" alt="Bg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-label text-gold-light">{data.bookingForm.label}</span>
          <h2 className="section-title text-white">{data.bookingForm.title}</h2>
          <p className="text-white/60">{data.bookingForm.subtext}</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card space-y-8">
          <div className="flex flex-wrap gap-6 justify-center mb-8">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input 
                type="radio" 
                name="bookingType" 
                value="Tour Booking" 
                checked={formData.bookingType === 'Tour Booking'}
                onChange={handleChange}
                className="accent-gold w-4 h-4"
              />
              <span className="text-white group-hover:text-gold transition-colors">Tour Booking</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input 
                type="radio" 
                name="bookingType" 
                value="Room Booking" 
                checked={formData.bookingType === 'Room Booking'}
                onChange={handleChange}
                className="accent-gold w-4 h-4"
              />
              <span className="text-white group-hover:text-gold transition-colors">Room Booking</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-light">First Name *</label>
              <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-gold outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-light">Last Name *</label>
              <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-gold outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-light">Email *</label>
              <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-gold outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-light">Mobile *</label>
              <input required name="mobile" value={formData.mobile} onChange={handleChange} type="tel" className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-gold outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-light">Arrival Date *</label>
              <input required name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} type="date" className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-gold outline-none transition-all invert" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-light">Departure Date *</label>
              <input required name="departureDate" value={formData.departureDate} onChange={handleChange} type="date" className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-gold outline-none transition-all invert" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-light">Adults *</label>
              <input required name="adults" value={formData.adults} onChange={handleChange} type="number" min="1" className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-gold outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-light">Children (Below 5 yrs)</label>
              <input name="children" value={formData.children} onChange={handleChange} type="number" min="0" className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-gold outline-none transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-light">Room Required</label>
              <select name="roomRequired" value={formData.roomRequired} onChange={handleChange} className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-gold outline-none transition-all appearance-none">
                <option value="Not Decided Yet" className="bg-dark-forest">Not Decided Yet</option>
                <option value="Bamboo Forest Cottage" className="bg-dark-forest">Bamboo Forest Cottage</option>
                <option value="Four-Bedded Family Room" className="bg-dark-forest">Four-Bedded Family Room</option>
                <option value="Eight-Bedded Dormitory" className="bg-dark-forest">Eight-Bedded Dormitory</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-light">Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-gold outline-none transition-all resize-none"></textarea>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold-light">Special Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/20 p-3 text-white focus:border-gold outline-none transition-all resize-none"></textarea>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button type="submit" className="btn-gold flex-1">Send Booking Request</button>
            <button type="button" onClick={handleWhatsApp} className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3 rounded-none transition-all duration-300 font-medium tracking-wider uppercase text-sm flex-1 flex items-center justify-center gap-2">
              <i className="fa-brands fa-whatsapp text-xl"></i>
              Book on WhatsApp
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/40 text-center space-y-2">
            <p>Valid Govt. ID required at check-in (Aadhaar / Driving License / Passport)</p>
            <p>Primary guest must be 18 years or above</p>
            <p>Check-In 12:00 PM · Check-Out 11:00 AM</p>
          </div>
        </form>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Find Us</span>
            <h2 className="section-title">Hotel Address</h2>
            <div className="space-y-8 mt-10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-location-dot text-gold text-xl"></i>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2">Panchavati Forest Resort</h4>
                  <p className="text-muted leading-relaxed">
                    {data.identity.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-phone text-gold text-xl"></i>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2">Call Us</h4>
                  <p className="text-muted">{data.identity.phones.join(' / ')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-envelope text-gold text-xl"></i>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2">Email Us</h4>
                  {data.identity.emails.map((email, i) => (
                    <p key={i} className="text-muted">{email}</p>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-clock text-gold text-xl"></i>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2">Timing</h4>
                  <p className="text-muted">Check-In 12:00 PM | Check-Out 11:00 AM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[420px] rounded-sm overflow-hidden shadow-2xl border-8 border-white"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3568.046808745308!2d88.76689036!3d26.7111111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4697333333333%3A0x8888888888888888!2sPanchavati%20Forest%20Resort%20Lataguri%20Gorumara!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-bark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src={data.identity.logo} 
                alt="Logo" 
                className="h-16 w-auto brightness-125" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML += `<span class="text-gold font-serif text-3xl font-bold tracking-tighter">${data.identity.name.split(' ')[0].toUpperCase()}</span>`;
                }}
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed italic">
              "A New Tourist Destination in Dooars Panorama. Experience the wild like never before."
            </p>
            <div className="flex space-x-4">
              <a href={data.identity.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-all duration-300">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href={data.identity.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-all duration-300">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href={data.identity.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-all duration-300">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href={`mailto:${data.identity.emails[0]}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-all duration-300">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl text-gold-light mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">About Dooars</a></li>
              <li><a href="#accommodation" className="hover:text-gold transition-colors">Accommodation</a></li>
              <li><a href="#cuisine" className="hover:text-gold transition-colors">Cuisine</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors">Gallery</a></li>
              <li><a href="#booking" className="hover:text-gold transition-colors">Book Now</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl text-gold-light mb-8">Explore Dooars</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>Gorumara National Park</li>
              <li>Chapramari Wildlife Sanctuary</li>
              <li>Jaldapara National Park</li>
              <li>Samsing & Suntalekhola</li>
              <li>Jhalong & Bindu</li>
              <li>Totopara</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl text-gold-light mb-8">Booking Info</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>Check-In: 12:00 PM</li>
              <li>Check-Out: 11:00 AM</li>
              <li>PIN: 735101</li>
              <li>Valid Govt. ID Required</li>
              <li>Free Driver Accommodation</li>
              <li>Free Car Parking</li>
              <li>Budget Meals Rs.350 per head</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 text-center text-xs text-white/30 tracking-widest">
          <p>© {new Date().getFullYear()} {data.identity.name} · All Rights Reserved</p>
          <p className="mt-2">{data.identity.location}</p>
        </div>
      </div>
    </footer>
  );
};

const FloatingWhatsApp = () => {
  return (
    <a 
      href={data.identity.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
    >
      <i className="fa-brands fa-whatsapp text-3xl"></i>
      <span className="absolute right-20 bg-white text-bark px-4 py-2 rounded-lg text-sm font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};

export default function App() {
  return (
    <div className="relative selection:bg-gold selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Accommodation />
      <Cuisine />
      <Facilities />
      <Explore />
      <Reach />
      <Gallery />
      <BookingForm />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
