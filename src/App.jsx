import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Phone, Mail, Users, Wine, GlassWater, ChevronDown, CheckCircle, Loader2, Plus, Minus } from 'lucide-react';
import formbricks from '@formbricks/js';

import heroImage from './assets/images/hero-bar.jpg';
import serviceBartending from './assets/images/service-bartending.jpg';
import serviceClasses from './assets/images/service-classes.jpg';
import serviceMixers from './assets/images/service-mixers.jpg';
import gallery1 from './assets/images/gallery-1.jpg';
import gallery2 from './assets/images/gallery-2.jpg';
import gallery3 from './assets/images/gallery-3.jpg';
import gallery4 from './assets/images/gallery-4.jpg';
import logo from './assets/images/logo.png';
import logoWhite from './assets/images/logo-white.png';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formType, setFormType] = useState('general'); // 'general', 'bartending', 'classes', 'mixers'
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  // Initialize Formbricks
  useEffect(() => {
    formbricks.init({
      environmentId: "cml5u7npovwl8ad01sxmi1jc5", // TODO: User needs to replace this
      apiHost: "https://app.formbricks.com",
    });
  }, []);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Capture data from form
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // 1. Track with Formbricks (for storage/analytics)
      // Ensure you have created a 'contact_submission' action trigger in Formbricks dashboard
      await formbricks.track('contact_submission', data);

      // 2. Send to Pabbly Connect (for email/automation)
      await fetch("https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZjMDYzMjA0M2Q1MjY5NTUzYzUxMzEi_pc", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setFormStatus('success');
      e.target.reset();

      // Reset form status after 5 seconds to allow new submissions
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus('error');
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = (type) => {
    setFormType(type);
    scrollToSection('contact');
  };

  const FORM_CONFIG = {
    general: {
      title: "Contact Us",
      subtitle: "Please fill out the form below and we will get back to you shortly.",
      fields: (
        <>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500">Full Name</label>
              <input name="name" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Full Name" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500">Email Address</label>
              <input name="email" type="email" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Email Address" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500">Message</label>
              <textarea name="message" rows="6" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="How can we help you?" required></textarea>
            </div>
          </div>
        </>
      )
    },
    classes: {
      title: "Cocktail Classes",
      subtitle: (
        <>
          Minimum of 10 participants per 2 hour private class.<br />
          Pricing will depend on cocktail selection/class content desired.<br />
          Please fill out form below, we will email you to follow up!
        </>
      ),
      fields: (
        <>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Full Name</label>
            <input name="name" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Full Name" required />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500">Email Address</label>
              <input name="email" type="email" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Email" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500">Phone</label>
              <input name="phone" type="tel" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Phone" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Preferred Contact Method</label>
            <select name="preferredContact" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" required>
              <option value="">– Preferred Contact Method –</option>
              <option value="Email">Email</option>
              <option value="Call">Call</option>
              <option value="Text">Text</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">What Are We Celebrating?</label>
            <select name="occasion" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" required>
              <option value="">– What Are We Celebrating? –</option>
              <option value="Just For Fun">Just For Fun</option>
              <option value="Company Event">Company Event</option>
              <option value="Engagement Party">Engagement Party</option>
              <option value="Birthday Party">Birthday Party</option>
              <option value="Graduation Party">Graduation Party</option>
              <option value="Baby Shower">Baby Shower</option>
              <option value="Bridal Shower">Bridal Shower</option>
              <option value="Bachelorette/Bachelor Party">Bachelorette/Bachelor Party</option>
              <option value="Holiday Party">Holiday Party</option>
              <option value="Housewarming Party">Housewarming Party</option>
              <option value="Dinner Party">Dinner Party</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Class Location Description</label>
            <input name="classLocation" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Class Location Description" required />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500"># of Guests</label>
              <input name="guestCount" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="# of Guests" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500">Event Date</label>
              <input name="date" type="date" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Desired Start Time</label>
            <input name="desiredStartTime" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Desired Start Time" required />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Additional Details</label>
            <textarea name="details" rows="4" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Additional Details" required></textarea>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">How did you hear about us?</label>
            <select name="referralSource" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" required>
              <option value="">– How did you hear about us? –</option>
              <option value="Instagram">Instagram</option>
              <option value="Previous Event Guest">Previous Event Guest</option>
              <option value="Google">Google</option>
              <option value="Facebook">Facebook</option>
            </select>
          </div>
        </>
      )
    },
    mixers: {
      title: "Mixers",
      subtitle: (
        <>
          Simply add your own spirit of choice, or enjoy as a refreshing non-alcoholic sip.<br />

          Pricing: $40 per 1-liter bottle (approximately 12 servings).<br />

          Optional garnishes available for an additional fee.<br />

          For optimal freshness and flavor, please consume within 4 days of the bottling date.
        </>
      ),
      fields: (
        <>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Full Name</label>
            <input name="name" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Full Name" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Email Address</label>
            <input name="email" type="email" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Email" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Phone</label>
            <input name="phone" type="tel" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Phone" required />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Preferred Contact Method</label>
            <select name="preferredContact" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" required>
              <option value="">– Preferred Contact Method –</option>
              <option value="Email">Email</option>
              <option value="Call">Call</option>
              <option value="Text">Text</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500">Pick-Up Date Desired</label>
              <input name="pickupDate" type="date" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500">How Many People Do You Need To Serve?</label>
              <input name="guestCount" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="How Many People Do You Need To Serve?" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Allergies</label>
            <input name="allergies" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Allergies" required />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Tell us more- is this for any particular event or just for fun?</label>
            <textarea name="details" rows="4" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Tell us more- is this for any particular event or just for fun?" required></textarea>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Need To Rent Self Serve Canisters?</label>
            <select name="canisterRental" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" required>
              <option value="">– Need To Rent Self Serve Canisters? –</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </>
      )
    },
    bartending: {
      title: "Let Us Elevate Your Event",
      subtitle: "Private event bartending for weddings, corporate events, and parties.",
      fields: (
        <>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Full Name</label>
            <input name="name" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Full Name" required />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Relation To Event</label>
            <input name="relation" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Self, Bride, Event Planner, etc." required />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500">Email Address</label>
              <input name="email" type="email" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Email" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500">Phone</label>
              <input name="phone" type="tel" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Phone" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Preferred Contact Method</label>
            <select name="preferredContact" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" required>
              <option value="">– Preferred Contact Method –</option>
              <option value="Email">Email</option>
              <option value="Call">Call</option>
              <option value="Text">Text</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">What Are We Celebrating?</label>
            <input name="occasion" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="What Are We Celebrating?" required />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500">Event Date</label>
              <input name="date" type="date" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-stone-500"># of Guests</label>
              <input name="guestCount" type="text" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="# of Guests" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Do you need to rent a bar from us?</label>
            <select name="barRental" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" required>
              <option value="">– Do you need to rent a bar from us? –</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Not Sure">Not Sure</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-stone-500">Additional Details</label>
            <textarea name="details" rows="4" className="w-full bg-white/80 border border-stone-300 p-3 focus:outline-none focus:border-stone-800 transition-colors font-body font-light" placeholder="Additional Details" required></textarea>
          </div>

          <div className="text-sm font-body font-light text-stone-500 space-y-4">
            <p>Base services include high quality plastic drink ware, fruit & edible flower garnishes, a custom bar menu, ice, neutral napkins, straws & wooden drink skewers</p>
            <p>Add-Ons Offered: Signature Cocktails, Mocktails, Glassware Rental, Water Refill Station, Bar Rental, Personalized Ice/Drink Skewers/Napkins/Garnishes, Custom Bar Menu (cloth, engraved wood or stone), Champagne or Spritz Tower, Mixed Shots</p>
          </div>
        </>
      )
    }
  };

  const faqData = [
    {
      question: "What Are Your Prices?",
      answer: (
        <>
          We customize each package to meet the needs of your unique event. For this reason, we would love to hear as many details as possible first, in order to give you the most accurate quote by filing out our inquiry form. Base prices for cocktail classes and mixers are listed on each corresponding page per service. If you’re not sure exactly what you need, we are happy to help by arranging a call with you to get the process started! Simply <button onClick={() => handleContactClick('general')} className="underline hover:text-stone-800 transition-colors cursor-pointer">reach out to us using the form</button>.
        </>
      )
    },
    {
      question: "What’s The Booking/Payment Process Like?",
      answer: "We will follow up with you within 48 hours from your initial inquiry to send additional questions about your event, which will allow us to provide you an estimate. We require a non refundable 50% deposit and completion of our contract to reserve your event date. We will then arrange a call to discuss event details as well as drink/flavor profiles. If you are booking a wedding, we will arrange a private tasting date. Remainder of payment is due no less than 30 days prior to your event."
    },
    {
      question: "Do You Carry Insurance?",
      answer: "Always! We carry General Liability and Liquor Liability Insurance for all events."
    },
    {
      question: "Do You Offer Mocktails or Low ABV Options?",
      answer: "We want everyone to be able to enjoy our drinks! All of our services can be mocktail based or made with lower ABV options. Since liquor is not included in our estimates due to state regulations, our pricing is the same for cocktails or mocktails."
    },
    {
      question: "What If I Don’t Need The Bartending Service But Want Your Drinks?",
      answer: "We offer freshly made batched non-alcoholic mixers for bulk pick up! Simply add your own liquor or liquor alternative, pour over ice and enjoy. See the corresponding mixer inquiry page for pricing and additional rental offerings. All orders must be finalized at a minimum of 7 days prior to your anticipated pick up date."
    }
  ];

  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border-b border-stone-200 last:border-0">
        <button
          className="w-full py-6 flex justify-between items-center text-left group cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-display text-xl text-stone-800 group-hover:text-stone-600 transition-colors uppercase tracking-wide">
            {question}
          </span>
          <span className={`transform transition-transform duration-300 text-stone-400 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={20} />
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
            }`}
        >
          <p className="font-body font-light text-stone-600 leading-relaxed text-base md:text-lg">
            {answer}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans text-stone-800 selection:bg-stone-300 bg-cream-light">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img src={logo} alt="The Cleveland Cocktail Co." className="w-[100px] h-auto object-contain" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-body font-light tracking-wide text-base uppercase">
            {['Services', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'Contact') handleContactClick('general');
                  else scrollToSection(item.toLowerCase());
                }}
                className="hover:text-stone-500 transition-colors relative group cursor-pointer"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-800 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-cream-light border-b border-stone-200 p-6 md:hidden flex flex-col space-y-4 shadow-xl">
            {['Services', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'Contact') handleContactClick('general');
                  else scrollToSection(item.toLowerCase());
                }}
                className="text-left font-body text-lg uppercase tracking-widest py-2 border-b border-stone-200 last:border-0"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Craft Cocktail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-16 animate-fade-in-up">
          <h2 className="font-body font-light text-lg md:text-xl tracking-[0.3em] mb-4 uppercase">Est. Cleveland, Ohio</h2>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
            A Mobile <br /> Bartending Experience
          </h1>
          <p className="font-body font-light text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-stone-100">
            Supplying North-East Ohio with high-quality, aesthetically pleasing drinks and bar rental options.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => handleContactClick('bartending')}
              className="bg-cream text-stone-900 px-8 py-3 rounded-sm font-body uppercase tracking-widest hover:bg-white transition-colors duration-300 cursor-pointer"
            >
              Book Your Event
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="border border-white text-white px-8 py-3 rounded-sm font-body uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-colors duration-300 cursor-pointer"
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <ChevronDown size={32} />
        </div>
      </header>

      {/* Intro / Philosophy Section */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="block font-body text-sm tracking-[0.2em] text-stone-500 mb-6 uppercase">Our Philosophy</span>
          <p className="font-display text-3xl md:text-4xl leading-relaxed text-stone-700">
            "We believe that the beverages we drink should receive the same level of attention to freshness and quality as the food we eat."
          </p>
          <div className="w-24 h-px bg-stone-400 mx-auto my-8"></div>
          <p className="font-body font-light text-stone-600 leading-loose max-w-2xl mx-auto text-lg">
            We proudly source our farm-to-cocktail ingredients from markets within the Greater Cleveland area.
            Our team will always hand-squeeze, fresh-press, and infuse seasonal ingredients in-house, ensuring each sip of your drink is a moment to savor.
            Simply supply your own liquor and event location—then let us take care of the rest!
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-cream-light">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-6">Our Services</h2>
          <p className="font-body font-light text-stone-600 text-center max-w-2xl mx-auto mb-16 text-lg">
            Our services include private event bartending, hosting cocktail classes and made-to-order pre-batched N/A cocktail mixers available for pick up.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img
                  src={serviceBartending}
                  alt="Event Bartending"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 text-center">
                <GlassWater className="mx-auto mb-4 text-stone-400" size={32} />
                <h3 className="font-display text-2xl mb-4">Event Bartending</h3>
                <p className="font-body font-light text-stone-600 mb-6 text-base">
                  Private event bartending for weddings, corporate events, and parties. We bring the bar to you.
                </p>
                <button onClick={() => handleContactClick('bartending')} className="text-xs font-bold uppercase tracking-widest border-b border-stone-300 pb-1 hover:border-stone-800 transition-colors cursor-pointer">
                  Inquire Now
                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div id="classes" className="group relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img
                  src={serviceClasses}
                  alt="Cocktail Classes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 text-center">
                <Users className="mx-auto mb-4 text-stone-400" size={32} />
                <h3 className="font-display text-2xl mb-4">Cocktail Classes</h3>
                <p className="font-body font-light text-stone-600 mb-6 text-base">
                  Host a private class! Perfect for bachelorette parties, team building, or just for fun. Minimum 10 participants.
                </p>
                <button onClick={() => handleContactClick('classes')} className="text-xs font-bold uppercase tracking-widest border-b border-stone-300 pb-1 hover:border-stone-800 transition-colors cursor-pointer">
                  Book a Class
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div id="mixers" className="group relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img
                  src={serviceMixers}
                  alt="Batched Mixers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 text-center">
                <Wine className="mx-auto mb-4 text-stone-400" size={32} />
                <h3 className="font-display text-2xl mb-4">Batched Mixers</h3>
                <p className="font-body font-light text-stone-600 mb-6 text-base">
                  Freshly made batched non-alcoholic mixers for bulk pick up. Simply add your own liquor.
                </p>
                <button onClick={() => handleContactClick('mixers')} className="text-xs font-bold uppercase tracking-widest border-b border-stone-300 pb-1 hover:border-stone-800 transition-colors cursor-pointer">
                  Order Mixers
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1 bg-white">
        {[
          gallery1,
          gallery2,
          gallery3,
          gallery4
        ].map((src, i) => (
          <div key={i} className="aspect-square relative group overflow-hidden cursor-pointer">
            <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-px bg-stone-300 mx-auto"></div>
          </div>

          <div className="bg-white">
            {faqData.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="contact" className="py-24 bg-cream relative">
        <div className="max-w-3xl mx-auto px-6 bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-sm shadow-sm border border-white">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl mb-4">{FORM_CONFIG[formType]?.title || FORM_CONFIG.general.title}</h2>
            <p className="font-body font-light text-stone-600">{FORM_CONFIG[formType]?.subtitle || FORM_CONFIG.general.subtitle}</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Hidden field for form type to track tracking source */}
            <input type="hidden" name="formType" value={formType} />

            {FORM_CONFIG[formType] ? FORM_CONFIG[formType].fields : FORM_CONFIG.general.fields}

            {!FORM_CONFIG[formType] && (
              /* Default Fallback Fields (Safety) */
              FORM_CONFIG.general.fields
            )}

            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={formStatus === 'submitting' || formStatus === 'success'}
                className={`bg-stone-800 text-cream-light px-10 py-4 uppercase tracking-widest text-sm hover:bg-stone-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto min-w-[200px] cursor-pointer ${formStatus === 'success' ? 'bg-green-700 hover:bg-green-800' : ''}`}
              >
                {formStatus === 'submitting' && <Loader2 className="animate-spin" size={18} />}
                {formStatus === 'success' && <CheckCircle size={18} />}
                {formStatus === 'idle' && 'Send Inquiry'}
                {formStatus === 'submitting' && 'Sending...'}
                {formStatus === 'success' && 'Sent Successfully'}
              </button>
              {formStatus === 'error' && <p className="text-red-500 text-xs mt-2 uppercase tracking-wide">Something went wrong. Please try again.</p>}
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6 border-t border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="text-center md:text-left">
            <img src={logoWhite} alt="The Cleveland Cocktail Co." className="w-[175px] h-auto object-contain mb-4" />
            <p className="font-body font-light text-sm">Mobile Craft Cocktail Service</p>
          </div>

          <div className="flex space-x-8">
            <a href="https://www.instagram.com/theclevelandcocktailcompany" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors duration-300 flex flex-col items-center gap-2 group">
              <div className="p-3 border border-stone-700 rounded-full group-hover:border-cream transition-colors">
                <Instagram size={20} />
              </div>
              <span className="text-[10px] uppercase tracking-widest">Instagram</span>
            </a>
            <a href="mailto:theclevelandcocktailcompany@gmail.com" className="hover:text-cream transition-colors duration-300 flex flex-col items-center gap-2 group">
              <div className="p-3 border border-stone-700 rounded-full group-hover:border-cream transition-colors">
                <Mail size={20} />
              </div>
              <span className="text-[10px] uppercase tracking-widest">Email</span>
            </a>
            <a href="tel:216-618-1444" className="hover:text-cream transition-colors duration-300 flex flex-col items-center gap-2 group">
              <div className="p-3 border border-stone-700 rounded-full group-hover:border-cream transition-colors">
                <Phone size={20} />
              </div>
              <span className="text-[10px] uppercase tracking-widest">Phone</span>
            </a>
          </div>

        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 text-center text-xs font-light tracking-widest uppercase flex flex-col gap-2">
          <span>&copy; {new Date().getFullYear()} Cleveland Cocktail Company. All rights reserved.</span>
          <a href="https://www.weblytics.digital/" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-stone-400 transition-colors">Website by Weblytics</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
