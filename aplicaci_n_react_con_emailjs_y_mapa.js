import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function App() {
  const form = useRef();
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  // REEMPLAZAR ESTAS 3 VARIABLES CON TUS CREDENCIALES DE EMAILJS
  const SERVICE_ID = 'TU_SERVICE_ID';
  const TEMPLATE_ID = 'TU_TEMPLATE_ID';
  const PUBLIC_KEY = 'TU_PUBLIC_KEY';

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setStatus({ loading: false, success: true, error: null });
          form.current.reset();
        },
        (error) => {
          console.error('Error al enviar:', error.text);
          setStatus({
            loading: false,
            success: false,
            error: 'Ocurrió un error al enviar el mensaje. Verifica la configuración de EmailJS.',
          });
        }
      );
  };

  return (
    <div style={styles.page}>
      {/* Encabezado */}
      <header style={styles.header}>
        <div style={styles.container}>
          <span style={styles.badge}>UPATecO • Programación Web II</span>
          <h1 style={styles.title}>Portal de Contacto Institucional</h1>
          <p style={styles.subtitle}>
            Comunícate con nosotros o visítanos en la sede central de la Universidad Provincial de Administración, Tecnología y Oficios.
          </p>
        </div>
      </header>

      {/* Contenido Principal: Grid de 2 Columnas */}
      <main style={styles.container}>
        <div style={styles.grid}>
          {/* Columna 1: Formulario con EmailJS */}
          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Envíanos un mensaje</h2>
            <p style={styles.cardDescription}>
              Completa los campos a continuación para remitir tu consulta a nuestro correo electrónico.
            </p>

            <form ref={form} onSubmit={sendEmail} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="user_name">
                  Nombre completo
                </label>
                <input
                  id="user_name"
                  type="text"
                  name="user_name"
                  required
                  placeholder="Ej: Juan Pérez"
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="user_email">
                  Correo Electrónico
                </label>
                <input
                  id="user_email"
                  type="email"
                  name="user_email"
                  required
                  placeholder="juanperez@example.com"
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="message">
                  Mensaje / Consulta
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Escribe tu mensaje detallado aquí..."
                  style={{ ...styles.input, resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                style={status.loading ? { ...styles.button, opacity: 0.7 } : styles.button}
              >
                {status.loading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>

              {status.success && (
                <div style={styles.alertSuccess}>
                  ¡Tu mensaje ha sido enviado exitosamente! Te responderemos a la brevedad.
                </div>
              )}

              {status.error && (
                <div style={styles.alertError}>
                  {status.error}
                </div>
              )}
            </form>
          </section>

          {/* Columna 2: Mapa de UPATecO */}
          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Nuestra Ubicación</h2>
            <p style={styles.cardDescription}>
              Sede Central UPATecO — Ingreso Barrio Pereyra Rozas, Ciudad de Salta, Salta, Argentina.
            </p>

            <div style={styles.mapContainer}>
              <iframe
                title="Ubicación UPATecO"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.768615012549!2d-65.411626!3d-24.757041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc4264c76c971%3A0x5ffb7316c3bf2248!2sUPATecO!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div style={styles.infoBox}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563' }}>
                📍 <strong>Dirección:</strong> Av. Constitución / B° Pereyra Rozas, Salta.<br />
                📞 <strong>Teléfono de contacto:</strong> 0387 556-9961<br />
                🌐 <strong>Web institucional:</strong> https://upateco.edu.ar
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer style={styles.footer}>
        <p style={{ margin: 0 }}>
          Recuperatorio TP Final - Programación Web II | Docente: Lic. Carlos Pacheco
        </p>
      </footer>
    </div>
  );
}

// Estilos limpios y modernos embebidos
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f3f4f6',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1f2937',
  },
  header: {
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    padding: '2.5rem 1rem',
    textAlign: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  container: {
    maxWidth: '1100px',
    width: '100%',
    margin: '0 auto',
    padding: '0 1rem',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '0.75rem',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '2rem',
    fontWeight: '700',
  },
  subtitle: {
    margin: 0,
    fontSize: '1rem',
    opacity: 0.9,
    maxWidth: '650px',
    marginInline: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    margin: '2.5rem 0',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
    display: 'flex',
    flexDirection: 'column',
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: '0.5rem',
    fontSize: '1.4rem',
    color: '#1e3a8a',
  },
  cardDescription: {
    marginTop: 0,
    marginBottom: '1.25rem',
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '0.85rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'background-color 0.2s',
  },
  alertSuccess: {
    marginTop: '0.75rem',
    padding: '0.75rem',
    backgroundColor: '#d1fae5',
    color: '#065f46',
    borderRadius: '6px',
    fontSize: '0.9rem',
  },
  alertError: {
    marginTop: '0.75rem',
    padding: '0.75rem',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '6px',
    fontSize: '0.9rem',
  },
  mapContainer: {
    flexGrow: 1,
    minHeight: '300px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
  },
  infoBox: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    textAlign: 'center',
    padding: '1.25rem',
    fontSize: '0.875rem',
  },
};