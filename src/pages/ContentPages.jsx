import { AboutSAARK } from '../components/home';
import ContactForm from '../components/home/ContactForm';

function AboutPage() {
  return <AboutSAARK />;
}

function ContactPage() {
  return <ContactForm />;
}

function GenericContentPage({ title, subtitle, children }) {
  return (
    <section className="content-section">
      <div className="page-hero">
        <div className="container">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      <div className="container">{children}</div>
    </section>
  );
}

export { AboutPage, ContactPage, GenericContentPage };
