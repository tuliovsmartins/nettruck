package classified.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;

import classified.Config.Encrypt;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	public Encrypt encrypt;
	
	@Autowired
	CustomSuccessHandler customSuccessHandler;
	
	@Autowired
	private DatabaseConfig databaseConfig;
	
	
	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
    	
    	auth.jdbcAuthentication().dataSource(databaseConfig.dataSource())
	    	.usersByUsernameQuery("SELECT email as username, password, confirmed as enabled, CONCAT(SUBSTRING_INDEX(name, ' ', 1),' ',SUBSTRING_INDEX(name, ' ', -1)) AS name FROM users where email=?")
	    	.authoritiesByUsernameQuery("SELECT email as username, role FROM users where email=?")
	    	.passwordEncoder(encrypt.passwordEncoder());
    	
    	
    }
	

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http
	        .authorizeRequests()
	        .antMatchers("/index/**","/cadastro", "/confirm/**", "/createUser", "/complete", "/js/**", "/css/**", "/img/**", "/fonts/**","/font-awesome/**", "/", "/login", "/crowlefipe").permitAll()
	        .anyRequest().authenticated()
	        .and()
	        .httpBasic()
	        .and()
	    .formLogin()
	        .loginPage("/login")
	        .permitAll()
	        .successHandler(customSuccessHandler)
	        .and()
	     .sessionManagement()
			.maximumSessions(1)
			.sessionRegistry(sessionRegistry())
			.expiredUrl("/logout")
			.and().and().csrf().disable()
		.logout()
			.clearAuthentication(true)
			.logoutSuccessUrl("/")
			.deleteCookies("JSESSIONID")
			.invalidateHttpSession(true)
		    .and()
		.exceptionHandling()
			.accessDeniedPage("/ops")
			.and()
		.rememberMe()
			.tokenValiditySeconds(1209600);
		
	}
	
	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();
	}
}
