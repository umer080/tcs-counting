document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate the corresponding dot
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= testimonialSlides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = testimonialSlides.length - 1;
        }
        showSlide(currentSlide);
    }
    
    // Event listeners for testimonial controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Click on dots to navigate to specific slide
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Simulate form submission
            formStatus.textContent = '';
            formStatus.classList.remove('success', 'error');
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formDataObj.email)) {
                    formStatus.textContent = getCurrentLanguage() === 'en' ? 
                        'Please enter a valid email address.' : 
                        'Ole hyvä ja syötä kelvollinen sähköpostiosoite.';
                    formStatus.classList.add('error');
                } else {
                    // Success case
                    formStatus.textContent = getCurrentLanguage() === 'en' ? 
                        'Thank you! Your message has been sent successfully.' : 
                        'Kiitos! Viestisi on lähetetty onnistuneesti.';
                    formStatus.classList.add('success');
                    contactForm.reset();
                    
                    // In a real implementation, you would send the form data to your server here
                    console.log('Form data:', formDataObj);
                    
                    // Email would be sent to: asiakaspalvelu.tcs@gmail.com
                }
                
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Language switching functionality
    const langEn = document.getElementById('lang-en');
    const langFi = document.getElementById('lang-fi');
    
    // Language translations
    const translations = {
        en: {
            // Navigation
            'nav-services': 'Services',
            'nav-about': 'About Us',
            'nav-contact': 'Contact',
            
            // Hero section
            'hero-title': 'Specialized Accounting Services for Taxi Entrepreneurs',
            'hero-subtitle': 'Expert financial solutions for Uber and Bolt platform drivers',
            'hero-cta': 'Get Started',
            
            // Services section
            'services-title': 'Our Services',
            'service1-title': 'Taxi Business Accounting',
            'service1-desc': 'Specialized accounting services tailored for taxi entrepreneurs operating on Uber and Bolt platforms.',
            'service2-title': 'Tax Optimization',
            'service2-desc': 'Strategic tax planning to maximize deductions and minimize tax liability for your taxi business.',
            'service3-title': 'Financial Reporting',
            'service3-desc': 'Clear, accurate financial reports to help you understand your business performance and make informed decisions.',
            'service4-title': 'Digital Accounting',
            'service4-desc': 'Fully electronic accounting services for efficient, paperless financial management.',
            
            // About section
            'about-title': 'About TCS Counting Services',
            'about-desc1': 'TCS Counting Services Oy specializes in providing accounting services specifically designed for taxi entrepreneurs in Finland. We understand the unique financial challenges and opportunities in the taxi industry, especially for those working with Uber and Bolt platforms.',
            'about-desc2': 'Our team of experienced accountants is dedicated to helping your taxi business thrive through accurate financial management and strategic tax planning. We operate entirely electronically, making our services convenient and accessible for busy entrepreneurs.',
            'feature1': 'Specialized in taxi business accounting',
            'feature2': 'Expert knowledge of Uber and Bolt platforms',
            'feature3': 'Fully electronic services',
            'feature4': 'Personalized financial guidance',
            
            // Testimonials
            'testimonials-title': 'What Our Clients Say',
            'testimonial1-text': 'TCS Counting Services has transformed how I manage my taxi business finances. Their expertise with Uber platform accounting has saved me both time and money.',
            'testimonial1-author': 'Mikko J.',
            'testimonial1-position': 'Uber Driver, Helsinki',
            'testimonial2-text': 'As a Bolt driver, I needed an accountant who understands the platform\'s payment system. TCS provides exactly that expertise, with excellent digital service.',
            'testimonial2-author': 'Liisa K.',
            'testimonial2-position': 'Bolt Driver, Espoo',
            'testimonial3-text': 'The tax optimization advice from TCS has been invaluable for my small taxi company. Their electronic service makes everything so convenient.',
            'testimonial3-author': 'Antti M.',
            'testimonial3-position': 'Taxi Entrepreneur, Vantaa',
            
            // Contact section
            'contact-title': 'Contact Us',
            'contact-email-title': 'Email',
            'contact-location-title': 'Location',
            'contact-location': 'Finland',
            'contact-desc': 'We provide specialized accounting services for taxi entrepreneurs using Uber and Bolt platforms. Contact us today to discuss how we can help your business thrive.',
            'form-name': 'Name',
            'form-email': 'Email',
            'form-phone': 'Phone',
            'form-message': 'Message',
            'form-submit': 'Send Message',
            
            // Footer
            'footer-tagline': 'Specialized accounting for taxi entrepreneurs',
            'footer-quick-links': 'Quick Links',
            'footer-services': 'Services',
            'footer-about': 'About Us',
            'footer-contact': 'Contact',
            'footer-contact-us': 'Contact Us',
            'footer-rights': 'All rights reserved.'
        },
        fi: {
            // Navigation
            'nav-services': 'Palvelut',
            'nav-about': 'Tietoa meistä',
            'nav-contact': 'Yhteystiedot',
            
            // Hero section
            'hero-title': 'Erikoistuneet kirjanpitopalvelut taksiyrittäjille',
            'hero-subtitle': 'Asiantuntevat taloushallinnon ratkaisut Uber- ja Bolt-alustojen kuljettajille',
            'hero-cta': 'Aloita tästä',
            
            // Services section
            'services-title': 'Palvelumme',
            'service1-title': 'Taksialan kirjanpito',
            'service1-desc': 'Erikoistuneet kirjanpitopalvelut räätälöity taksiyrittäjille, jotka toimivat Uber- ja Bolt-alustoilla.',
            'service2-title': 'Verosuunnittelu',
            'service2-desc': 'Strateginen verosuunnittelu vähennysten maksimoimiseksi ja taksiyrityksesi verovastuun minimoimiseksi.',
            'service3-title': 'Talousraportointi',
            'service3-desc': 'Selkeät, tarkat taloudelliset raportit auttavat ymmärtämään yrityksesi suorituskykyä ja tekemään tietoon perustuvia päätöksiä.',
            'service4-title': 'Digitaalinen kirjanpito',
            'service4-desc': 'Täysin sähköiset kirjanpitopalvelut tehokkaaseen, paperittomaan taloushallintoon.',
            
            // About section
            'about-title': 'Tietoa TCS Counting Services -yrityksestä',
            'about-desc1': 'TCS Counting Services Oy on erikoistunut tarjoamaan kirjanpitopalveluja erityisesti taksiyrittäjille Suomessa. Ymmärrämme taksialan ainutlaatuiset taloudelliset haasteet ja mahdollisuudet, erityisesti Uber- ja Bolt-alustoilla toimiville.',
            'about-desc2': 'Kokeneiden kirjanpitäjiemme tiimi on omistautunut auttamaan taksiyrityksesi menestymistä tarkan taloudenhoidon ja strategisen verosuunnittelun avulla. Toimimme täysin sähköisesti, mikä tekee palveluistamme käteviä ja helposti saatavilla kiireisille yrittäjille.',
            'feature1': 'Erikoistunut taksialan kirjanpitoon',
            'feature2': 'Asiantuntijatietoa Uber- ja Bolt-alustoista',
            'feature3': 'Täysin sähköiset palvelut',
            'feature4': 'Henkilökohtainen talousneuvonta',
            
            // Testimonials
            'testimonials-title': 'Mitä asiakkaamme sanovat',
            'testimonial1-text': 'TCS Counting Services on muuttanut tapani hoitaa taksiyritykseni taloutta. Heidän asiantuntemuksensa Uber-alustan kirjanpidosta on säästänyt minulta sekä aikaa että rahaa.',
            'testimonial1-author': 'Mikko J.',
            'testimonial1-position': 'Uber-kuljettaja, Helsinki',
            'testimonial2-text': 'Bolt-kuljettajana tarvitsin kirjanpitäjän, joka ymmärtää alustan maksujärjestelmää. TCS tarjoaa juuri tätä asiantuntemusta, erinomaisella digitaalisella palvelulla.',
            'testimonial2-author': 'Liisa K.',
            'testimonial2-position': 'Bolt-kuljettaja, Espoo',
            'testimonial3-text': 'TCS:n vero-optimointineuvot ovat olleet korvaamattomia pienelle taksiyritykselleni. Heidän sähköinen palvelunsa tekee kaikesta niin kätevää.',
            'testimonial3-author': 'Antti M.',
            'testimonial3-position': 'Taksiyrittäjä, Vantaa',
            
            // Contact section
            'contact-title': 'Ota yhteyttä',
            'contact-email-title': 'Sähköposti',
            'contact-location-title': 'Sijainti',
            'contact-location': 'Suomi',
            'contact-desc': 'Tarjoamme erikoistuneita kirjanpitopalveluja taksiyrittäjille, jotka käyttävät Uber- ja Bolt-alustoja. Ota yhteyttä tänään keskustellaksesi, kuinka voimme auttaa yritystäsi menestymään.',
            'form-name': 'Nimi',
            'form-email': 'Sähköposti',
            'form-phone': 'Puhelin',
            'form-message': 'Viesti',
            'form-submit': 'Lähetä viesti',
            
            // Footer
            'footer-tagline': 'Erikoistunutta kirjanpitoa taksiyrittäjille',
            'footer-quick-links': 'Pikalinkit',
            'footer-services': 'Palvelut',
            'footer-about': 'Tietoa meistä',
            'footer-contact': 'Yhteystiedot',
            'footer-contact-us': 'Ota yhteyttä',
            'footer-rights': 'Kaikki oikeudet pidätetään.'
        }
    };
    
    // Get current language
    function getCurrentLanguage() {
        return langEn.classList.contains('active') ? 'en' : 'fi';
    }
    
    // Apply translations
    function applyTranslations(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        
        // Update language buttons
        if (lang === 'en') {
            langEn.classList.add('active');
            langFi.classList.remove('active');
        } else {
            langFi.classList.add('active');
            langEn.classList.remove('active');
        }
        
        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Language button event listeners
    langEn.addEventListener('click', () => {
        applyTranslations('en');
    });
    
    langFi.addEventListener('click', () => {
        applyTranslations('fi');
    });
    
    // Initialize with preferred language or default to English
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    applyTranslations(preferredLanguage);
    
    // Check if user's browser language is Finnish and they haven't set a preference
    if (!localStorage.getItem('preferredLanguage')) {
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'fi') {
            applyTranslations('fi');
        }
    }
});