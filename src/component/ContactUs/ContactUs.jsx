import React from 'react'
import '../../css/contactUs.css'
import cakeImg from '../../assets/cake2.png'

const ContactCard = ({ icon, title, children }) => (
  <div className="cu-card">
    <div className="cu-icon">{icon}</div>
    <div className="cu-title">{title}</div>
    <div className="cu-body">{children}</div>
  </div>
)

export default function ContactUs() {
  const bgVar = { ['--about-bg-image']: `url(${cakeImg})` }
  return (
    <section className="contact-us" style={bgVar}>
      <div className="cu-inner">
        <h2 className="cu-heading">Contact Us</h2>

        <div className="cu-cards">
          <ContactCard icon={<span className="cu-ico geo">📍</span>} title="OUR LOCATION">
            <strong>48, Janadhipathi Mawatha,<br/>Colombo 01, Sri Lanka</strong>
          </ContactCard>

          <ContactCard icon={<span className="cu-ico phone">📞</span>} title="CALL US">
            <strong>+94 771234567</strong>
          </ContactCard>

          <ContactCard icon={<span className="cu-ico mail">✉️</span>} title="DROP US A LINE">
            <strong>sliceofheven@gmail.com</strong>
          </ContactCard>
        </div>

        <div className="cu-social-row">
          <div className="cu-social">
            <div className="cu-social-ico">instagram</div>
            <div className="cu-social-title">INSTAGRAM</div>
            <div className="cu-social-handle">sliceOfHeven</div>
          </div>
          <div className="cu-social">
            <div className="cu-social-ico">facebook</div>
            <div className="cu-social-title">FACEBOOK</div>
            <div className="cu-social-handle">Slice Of Heven</div>
          </div>
          <div className="cu-social">
            <div className="cu-social-ico">linkedin</div>
            <div className="cu-social-title">LINKEDIN</div>
            <div className="cu-social-handle">Slice of Heven</div>
          </div>
          <div className="cu-social">
            <div className="cu-social-ico">web</div>
            <div className="cu-social-title">WEBSITE</div>
            <div className="cu-social-handle">Slice Of Heven</div>
          </div>
        </div>
      </div>
    </section>
  )
}
