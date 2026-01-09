const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(options) {
    try {
      const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        ...(options.attachments && { attachments: options.attachments }),
      };

      const info = await this.transporter.sendMail(message);
      console.log(`Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error("Email send error:", error);
      throw error;
    }
  }

  // Send registration confirmation to user
  async sendRegistrationConfirmation(userData, formationData) {
    const verificationUrl = `${
      process.env.CLIENT_URL || "http://localhost:3000"
    }/verify/${userData.verification_token}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; color: white; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f8fafc; border: 1px solid #e2e8f0; }
          .footer { padding: 20px; text-align: center; color: #64748b; font-size: 14px; border-top: 1px solid #e2e8f0; }
          .button { display: inline-block; background: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
          .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .detail-label { color: #64748b; }
          .detail-value { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Inscription Confirmée !</h1>
          <p>Merci de vous être inscrit à notre formation</p>
        </div>
        
        <div class="content">
          <p>Bonjour <strong>${userData.full_name}</strong>,</p>
          
          <p>Votre inscription à la formation <strong>"${
            formationData.title
          }"</strong> a été reçue avec succès.</p>
          
          <div class="details">
            <h3 style="margin-top: 0;">📋 Détails de l'inscription</h3>
            <div class="detail-row">
              <span class="detail-label">Formation :</span>
              <span class="detail-value">${formationData.title}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Niveau :</span>
              <span class="detail-value">${formationData.level}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date de début :</span>
              <span class="detail-value">${new Date(
                formationData.start_date
              ).toLocaleDateString("fr-FR")}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Prix :</span>
              <span class="detail-value">${formationData.price} ${
      formationData.currency
    }</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Référence :</span>
              <span class="detail-value">${userData.id
                .substring(0, 8)
                .toUpperCase()}</span>
            </div>
          </div>
          
          <p style="color: #059669; font-weight: bold;">
            ⚠️ Important : Veuillez vérifier votre email pour finaliser votre inscription
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" class="button">
              Vérifier mon Email
            </a>
          </div>
          
          <p>Ce lien expirera dans 24 heures. Si vous ne pouvez pas cliquer sur le bouton, copiez-collez ce lien :</p>
          <p style="background: #f1f5f9; padding: 10px; border-radius: 5px; word-break: break-all;">
            ${verificationUrl}
          </p>
          
          <p>Une fois votre email vérifié, vous recevrez toutes les informations nécessaires pour commencer la formation.</p>
          
          <p>Si vous avez des questions, n'hésitez pas à nous contacter :</p>
          <ul>
            <li>📧 Email : ${process.env.SUPPORT_EMAIL}</li>
            <li>📞 Téléphone : ${process.env.SUPPORT_PHONE}</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ${
      process.env.FROM_NAME
    }. Tous droits réservés.</p>
          <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: userData.email,
      subject: `[${formationData.title}] Confirmation d'inscription`,
      html,
    });
  }

  // Send admin notification
  async sendAdminNotification(userData, formationData, adminEmail) {
    const adminDashboardUrl = `${
      process.env.ADMIN_URL || "http://localhost:3000/admin"
    }/registrations`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
          .alert { background: #dcfce7; border: 1px solid #86efac; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
          .button { display: inline-block; background: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; }
          .stat { display: inline-block; background: #f1f5f9; padding: 10px 20px; border-radius: 6px; margin: 5px; }
        </style>
      </head>
      <body>
        <h2 style="color: #4f46e5;">🔔 Nouvelle Inscription - Formation</h2>
        
        <div class="alert">
          <h3 style="color: #059669; margin-top: 0;">🚨 Nouvelle inscription reçue !</h3>
          <p>Un nouvel étudiant s'est inscrit à l'une de vos formations.</p>
        </div>
        
        <div class="details">
          <h3>👤 Informations de l'étudiant</h3>
          <p><strong>Nom complet :</strong> ${userData.full_name}</p>
          <p><strong>Email :</strong> ${userData.email}</p>
          <p><strong>Téléphone :</strong> ${
            userData.phone || "Non spécifié"
          }</p>
          <p><strong>Rôle actuel :</strong> ${
            userData.current_role || userData.role || "Non spécifié"
          }</p>
          <p><strong>Date d'inscription :</strong> ${new Date(
            userData.created_at
          ).toLocaleString("fr-FR")}</p>
        </div>
        
        <div class="details">
          <h3>📚 Détails de la formation</h3>
          <p><strong>Formation :</strong> ${formationData.title}</p>
          <p><strong>Catégorie :</strong> ${formationData.category}</p>
          <p><strong>Niveau :</strong> ${formationData.level}</p>
          <p><strong>Prix :</strong> ${formationData.price} ${
      formationData.currency
    }</p>
          <p><strong>Date de début :</strong> ${new Date(
            formationData.start_date
          ).toLocaleDateString("fr-FR")}</p>
          <p><strong>Participants :</strong> ${
            formationData.current_participants
          }/${formationData.max_participants}</p>
        </div>
        
        <div style="margin: 30px 0;">
          <h4>📊 Statistiques actuelles de la formation :</h4>
          <div>
            <span class="stat">👥 ${
              formationData.current_participants
            } participants</span>
            <span class="stat">💰 ${formationData.price} ${
      formationData.currency
    }/personne</span>
            <span class="stat">🎯 ${Math.round(
              (formationData.current_participants /
                formationData.max_participants) *
                100
            )}% rempli</span>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${adminDashboardUrl}" class="button">
            👁️ Voir dans l'Admin
          </a>
        </div>
        
        <div style="color: #64748b; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p><strong>Informations de contact de l'étudiant :</strong></p>
          <p>Email : ${userData.email}</p>
          <p>Téléphone : ${userData.phone || "Non fourni"}</p>
          <p>Message : ${userData.message || "Aucun message"}</p>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: adminEmail,
      subject: `🚨 Nouvelle inscription : ${userData.full_name} - ${formationData.title}`,
      html,
    });
  }

  // Send payment confirmation
  async sendPaymentConfirmation(userData, formationData, paymentData) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .success { background: #dcfce7; border: 1px solid #86efac; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
          .receipt { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
          .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #e5e7eb; }
          .receipt-row.total { border-bottom: 2px solid #4f46e5; font-weight: bold; }
        </style>
      </head>
      <body>
        <div style="text-align: center;">
          <h1 style="color: #059669;">✅ Paiement Confirmé !</h1>
          <p>Votre paiement a été traité avec succès.</p>
        </div>
        
        <div class="success">
          <h2 style="color: #059669; margin-top: 0;">🎉 Félicitations !</h2>
          <p>Vous êtes officiellement inscrit à la formation :</p>
          <h3>"${formationData.title}"</h3>
        </div>
        
        <div class="receipt">
          <h3>📄 Reçu de paiement</h3>
          <div class="receipt-row">
            <span>Référence :</span>
            <span><strong>${
              paymentData.reference || userData.id.substring(0, 8).toUpperCase()
            }</strong></span>
          </div>
          <div class="receipt-row">
            <span>Date :</span>
            <span>${new Date().toLocaleDateString("fr-FR")}</span>
          </div>
          <div class="receipt-row">
            <span>Méthode :</span>
            <span>${paymentData.method || "Carte de crédit"}</span>
          </div>
          <div class="receipt-row">
            <span>Montant :</span>
            <span>${formationData.price} ${formationData.currency}</span>
          </div>
          <div class="receipt-row">
            <span>TVA :</span>
            <span>Inclus</span>
          </div>
          <div class="receipt-row total">
            <span>Total payé :</span>
            <span>${formationData.price} ${formationData.currency}</span>
          </div>
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>📅 Prochaines étapes</h3>
          <ol>
            <li>Accédez à votre espace étudiant</li>
            <li>Téléchargez les documents de la formation</li>
            <li>Rejoignez le groupe WhatsApp/Telegram</li>
            <li>Préparez-vous pour la première session</li>
          </ol>
        </div>
        
        <p style="text-align: center;">
          <strong>Pour commencer :</strong> Consultez votre espace étudiant ou attendez notre email avec les accès.
        </p>
        
        <div style="text-align: center; color: #64748b; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p>Ce reçu est valable à des fins fiscales.</p>
          <p>Pour toute question, contactez : ${process.env.SUPPORT_EMAIL}</p>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: userData.email,
      subject: `✅ Confirmation de paiement - ${formationData.title}`,
      html,
    });
  }

  // Send welcome email after verification
  async sendWelcomeEmail(userData, formationData) {
    const loginUrl = `${
      process.env.CLIENT_URL || "http://localhost:3000"
    }/login`;
    const studentPortalUrl = `${
      process.env.CLIENT_URL || "http://localhost:3000"
    }/student`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .welcome { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; color: white; text-align: center; border-radius: 10px; }
          .resources { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px; }
          .icon { font-size: 40px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="welcome">
          <div class="icon">🎓</div>
          <h1 style="margin-top: 0;">Bienvenue ${userData.full_name} !</h1>
          <p>Votre inscription à "${
            formationData.title
          }" est maintenant confirmée !</p>
        </div>
        
        <h2>🚀 Vous êtes prêt à commencer !</h2>
        <p>Voici vos prochaines étapes :</p>
        
        <div class="resources">
          <h3>📚 Ressources disponibles immédiatement :</h3>
          <ul>
            <li>📖 Syllabus et plan de formation</li>
            <li>🎥 Vidéos d'introduction</li>
            <li>💻 Environnement de développement</li>
            <li>👥 Accès à la communauté</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${studentPortalUrl}" class="button">
            🎯 Accéder à mon espace étudiant
          </a>
          <a href="${loginUrl}" class="button" style="background: #059669;">
            🔐 Se connecter
          </a>
        </div>
        
        <div style="background: #fffbeb; padding: 20px; border-radius: 8px; border: 1px solid #fde68a; margin: 20px 0;">
          <h3>📅 Calendrier des sessions</h3>
          <p><strong>Première session :</strong> ${new Date(
            formationData.start_date
          ).toLocaleDateString("fr-FR")}</p>
          <p><strong>Fréquence :</strong> ${
            formationData.schedule || "À définir"
          }</p>
          <p><strong>Lieu :</strong> ${formationData.location || "En ligne"}</p>
        </div>
        
        <div style="margin: 30px 0;">
          <h3>📞 Support et contact</h3>
          <p>Notre équipe est là pour vous aider :</p>
          <ul>
            <li>📧 Email : ${process.env.SUPPORT_EMAIL}</li>
            <li>📞 Téléphone : ${process.env.SUPPORT_PHONE}</li>
            <li>💬 WhatsApp : ${
              process.env.SUPPORT_WHATSAPP || process.env.SUPPORT_PHONE
            }</li>
          </ul>
        </div>
        
        <div style="text-align: center; color: #64748b; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p>Nous sommes ravis de vous avoir parmi nous !</p>
          <p><strong>L'équipe ${process.env.FROM_NAME}</strong></p>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: userData.email,
      subject: `🎓 Bienvenue dans ${formationData.title} !`,
      html,
    });
  }
}

module.exports = new EmailService();
