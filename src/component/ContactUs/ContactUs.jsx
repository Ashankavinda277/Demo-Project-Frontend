import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaInstagram, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaGlobe,
  FaCheckCircle
} from 'react-icons/fa';
import '../../css/contactUs.css';

export default function ContactUs() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section className="contact-page-wrapper">
      {/* Banner */}
      <div className="contact-hero-banner">
        <div className="container">
          <span className="eyebrow">Get in Touch</span>
          <h1 className="contact-page-title">We’d Love to Hear From You</h1>
          <p className="contact-hero-subtitle">
            Whether you are planning a bespoke wedding cake, need celebration advice, or have a general inquiry, our bakers are at your service.
          </p>
        </div>
      </div>

      <div className="container contact-main-container">
        {/* Contact Info Cards */}
        <div className="contact-cards-grid">
          <div className="contact-info-card">
            <div className="info-card-icon"><FaMapMarkerAlt /></div>
            <h3>Visit Our Patisserie</h3>
            <p>48, Janadhipathi Mawatha,<br />Colombo 01, Sri Lanka</p>
            <span className="info-card-badge">Storefront Open Daily</span>
          </div>

          <div className="contact-info-card">
            <div className="info-card-icon"><FaPhoneAlt /></div>
            <h3>Speak with a Baker</h3>
            <p><strong>Hotline:</strong> +94 77 123 4567<br /><strong>Landline:</strong> 011 234 5678</p>
            <span className="info-card-badge">Instant Order Assistance</span>
          </div>

          <div className="contact-info-card">
            <div className="info-card-icon"><FaEnvelope /></div>
            <h3>Email Inquiries</h3>
            <p>orders@sliceofheaven.lk<br />hello@sliceofheaven.lk</p>
            <span className="info-card-badge">Fast Response Time</span>
          </div>

          <div className="contact-info-card">
            <div className="info-card-icon"><FaClock /></div>
            <h3>Baking & Delivery Hours</h3>
            <p><strong>Mon – Sun:</strong> 8:00 AM – 9:00 PM<br /><strong>Delivery:</strong> 9:00 AM – 8:00 PM</p>
            <span className="info-card-badge">365 Days a Year</span>
          </div>
        </div>

        {/* Inquiry Form & Socials Grid */}
        <div className="contact-content-split">
          {/* Left: Custom Cake Inquiry Form */}
          <div className="contact-form-card">
            <h2>Send Us a Message</h2>
            <p className="form-lead">Have a custom cake concept or special request? Drop us a note below.</p>

            {formSent && (
              <div className="inquiry-success-alert">
                <FaCheckCircle className="success-ico" />
                <span>Thank you! Your message has been sent. Our team will contact you shortly.</span>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="inquiry-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kasun Perera" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Your Email *</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="kasun@example.com" 
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+94 7X XXX XXXX" 
                  />
                </div>
                <div className="form-group">
                  <label>Inquiry Topic *</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="custom-cake">Custom Birthday / Wedding Cake</option>
                    <option value="corporate-order">Corporate / Large Event Catering</option>
                    <option value="order-status">Existing Order Inquiry</option>
                    <option value="feedback">Compliment / Feedback</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Your Message / Cake Concept *</label>
                <textarea 
                  rows="4" 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about flavors, theme, guest count, or date..." 
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg submit-inquiry-btn">
                Send Inquiry
              </button>
            </form>
          </div>

          {/* Right: Social & Location Details */}
          <div className="contact-social-card">
            <h2>Follow Our Sweet Journey</h2>
            <p>Connect with us on social media for daily cake artistry, behind-the-scenes baking, and flash discounts.</p>

            <div className="social-links-grid">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-box">
                <div className="social-box-icon"><FaInstagram /></div>
                <div className="social-box-text">
                  <strong>Instagram</strong>
                  <span>@sliceofheaven.lk</span>
                </div>
              </a>

              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-box">
                <div className="social-box-icon"><FaFacebookF /></div>
                <div className="social-box-text">
                  <strong>Facebook</strong>
                  <span>Slice of Heaven Patisserie</span>
                </div>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-box">
                <div className="social-box-icon"><FaLinkedinIn /></div>
                <div className="social-box-text">
                  <strong>LinkedIn</strong>
                  <span>Slice of Heaven Bakery</span>
                </div>
              </a>

              <a href="https://sliceofheaven.lk" target="_blank" rel="noopener noreferrer" className="social-box">
                <div className="social-box-icon"><FaGlobe /></div>
                <div className="social-box-text">
                  <strong>Official Website</strong>
                  <span>www.sliceofheaven.lk</span>
                </div>
              </a>
            </div>

            <div className="bakery-promise-box">
              <h3>Custom Orders Note</h3>
              <p>For custom 2-tier and 3-tier wedding cakes, we recommend placing orders at least 3-5 days in advance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
