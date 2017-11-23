package classified.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

@Service
public class MailSenderService {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;

	public void sendEmail(String address, String template, Object object, String lespass) throws MessagingException {

		final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
		final Context email = new Context();
		String imageResourceName = "../img/logo.png";
		email.setVariable("object", object);
		email.setVariable("lesspass", lespass);
		email.setVariable("imageResourceName", imageResourceName);

		final String htmlContent = this.templateEngine.process("emails/"+template, email);
		message.addInline("logo.png", new FileSystemResource(imageResourceName), "image/png");
		message.setText(htmlContent, true);
		message.setFrom(new InternetAddress("signin@sitedoscaminhao.com"));
		message.setReplyTo(new InternetAddress(address));
		message.setTo(new InternetAddress(address));
		message.setSubject("Confirmação de cadastro");
		
		mailSender.send(mimeMessage);
	}
	
	public void sendEmail(String address, String template, Object object) throws MessagingException {

		final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
		final Context email = new Context();
		String imageResourceName = "../img/logo.png";
		email.setVariable("object", object);
		email.setVariable("imageResourceName", imageResourceName);

		final String htmlContent = this.templateEngine.process("emails/"+template, email);
		message.addInline("logo.png", new FileSystemResource(imageResourceName), "image/png");
		message.setText(htmlContent, true);
		message.setFrom(new InternetAddress("contato@blowmindsolutions.com.br"));
		message.setReplyTo(new InternetAddress(address));
		message.setTo(new InternetAddress(address));
		message.setSubject("Confirmação de cadastro");
		
		mailSender.send(mimeMessage);
	}
}
