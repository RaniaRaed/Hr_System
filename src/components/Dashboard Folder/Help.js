import React, { useState } from 'react';
import './Help.css';

function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const faqData = [
    { question: 'How do I reset my password?', answer: 'Go to account settings and select "Reset Password."' },
    { question: 'Who can approve my leave request?', answer: 'Your manager or admin can approve leave requests.' },
    // Add more FAQ items as needed
  ];

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm) ||
    faq.answer.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="help-page">
      <h1>Help & Support</h1>
      
      {/* Search bar */}
      <input 
        type="text" 
        placeholder="Search help topics..." 
        value={searchTerm} 
        onChange={handleSearchChange} 
        className="help-search-bar"
      />

      {/* Sections with accordion style */}
      <section className="help-section">
        <h2 onClick={() => toggleSection('overview')}>
          Overview {activeSection === 'overview' ? '-' : '+'}
        </h2>
        {activeSection === 'overview' && (
          <p>Welcome to the HR System Help Page. Here, you can find guidance on using the system effectively.</p>
        )}
      </section>

      <section className="help-section">
        <h2 onClick={() => toggleSection('dashboard')}>
          Using the Dashboard {activeSection === 'dashboard' ? '-' : '+'}
        </h2>
        {activeSection === 'dashboard' && (
          <p>Access your employee or admin dashboard to view information relevant to your role. The dashboard provides quick access to leave requests, events, and more.</p>
        )}
      </section>

      <section className="help-section">
        <h2 onClick={() => toggleSection('leaveRequests')}>
          Leave Requests {activeSection === 'leaveRequests' ? '-' : '+'}
        </h2>
        {activeSection === 'leaveRequests' && (
          <p>To submit a leave request, go to the "Leave Requests" section, fill out the request form, and submit it for approval. You will be notified of the status of your request.</p>
        )}
      </section>

      <section className="help-section">
        <h2 onClick={() => toggleSection('events')}>
          Events {activeSection === 'events' ? '-' : '+'}
        </h2>
        {activeSection === 'events' && (
          <p>View upcoming events in the "Events" section. You can see event details and RSVP if necessary.</p>
        )}
      </section>

      {/* FAQ Section with collapsible answers */}
      <section className="help-section">
        <h2>FAQs</h2>
        <ul className="faq-list">
          {filteredFAQs.map((faq, index) => (
            <li key={index} onClick={() => toggleSection(`faq${index}`)}>
              <strong>{faq.question}</strong>
              {activeSection === `faq${index}` && <p>{faq.answer}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* Contact Form */}
      <section className="help-section">
        <h2>Contact Support</h2>
        <form className="contact-form">
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Message:
            <textarea name="message" rows="4" required></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default Help;
