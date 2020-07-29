package com.example.backend.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.AuthenticationProvider;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired(required = false)
    private UserDetailsService userDetailsService;

    @Autowired(required = false)
    private ObjectMapper objectMapper;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .authenticationProvider(authenticationProvider())
                .httpBasic()
                //未登录时，进行json格式的提示
                .authenticationEntryPoint((request,response,authException) -> {
                    response.setContentType("application/json;charset=utf-8");
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    PrintWriter out = response.getWriter();
                    Map<String,Object> map = new HashMap<String,Object>();
                    map.put("code",403);
                    map.put("message","未登录");
                    out.write(objectMapper.writeValueAsString(map));
                    out.flush();
                    out.close();
                })

                .and().authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/user/**").permitAll()
                .anyRequest().authenticated()//必须授权才能访问

                .and()
                .formLogin()
                .permitAll()
                .failureHandler((request,response,ex) -> {
                    response.setContentType("application/json;charset=utf-8");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

                    PrintWriter out = response.getWriter();
                    Map<String,Object> map = new HashMap<String,Object>();
                    map.put("code",401);
                    if (ex instanceof UsernameNotFoundException || ex instanceof BadCredentialsException) {
                        map.put("message","用户名或密码错误");
                    }
//                    else if (ex instanceof DisabledException) {
//                        map.put("message","账户被禁用");
//                    } else {
//                        map.put("message","登录失败!");
//                    }
                    out.write(objectMapper.writeValueAsString(map));
                    out.flush();
                    out.close();
                })
                //登录成功，返回json
                .successHandler((request,response,authentication) -> {
                    SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
                    System.out.println(ft.format(new Date())+" --- Login: "+authentication.getName());


                    Map<String,Object> map = new HashMap<String,Object>();
                    map.put("code",200);
                    map.put("message","登录成功");
                    map.put("data",authentication);
                    response.setContentType("application/json;charset=utf-8");
                    PrintWriter out = response.getWriter();
                    out.write(objectMapper.writeValueAsString(map));
                    out.flush();
                    out.close();
                })

//                .and()
//                .exceptionHandling()
//                //没有权限，返回json
//                .accessDeniedHandler((request,response,ex) -> {
//                    response.setContentType("application/json;charset=utf-8");
//                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//
//                    PrintWriter out = response.getWriter();
//                    Map<String,Object> map = new HashMap<String,Object>();
//                    map.put("code",403);
//                    map.put("message", "权限不足");
//                    out.write(objectMapper.writeValueAsString(map));
//                    out.flush();
//                    out.close();
//                })

                .and()
                .logout()
                //退出成功，返回json
                .logoutSuccessHandler((request,response,authentication) -> {

                    SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
                    System.out.println(ft.format(new Date())+" --- Logout");

                    Map<String,Object> map = new HashMap<String,Object>();
                    map.put("code",200);
                    map.put("message","退出成功");
                    map.put("data",authentication);
                    response.setContentType("application/json;charset=utf-8");
                    PrintWriter out = response.getWriter();
                    out.write(objectMapper.writeValueAsString(map));
                    out.flush();
                    out.close();
                })
                .deleteCookies()
                .permitAll();

        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .invalidSessionStrategy((HttpServletRequest request, HttpServletResponse response) -> {
                    SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
                    System.out.println(ft.format(new Date())+" --- Session Timeout");

                    response.setContentType("application/json;charset=UTF-8");
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);

                    PrintWriter out = response.getWriter();
                    Map<String,Object> map = new HashMap<String,Object>();
                    map.put("code",403);
                    map.put("message","session无效，请重新登录");

                    out.write(objectMapper.writeValueAsString(map));
                    out.flush();
                    out.close();
                });
//                .maximumSessions(1)
//                .expiredSessionStrategy((SessionInformationExpiredEvent event)  -> {
//                    HttpServletResponse response = event.getResponse();
//                    response.setContentType("application/json;charset=UTF-8");
//                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//
//                    PrintWriter out = response.getWriter();
//                    Map<String,Object> map = new HashMap<String,Object>();
//                    map.put("code",403);
//                    map.put("message","您的账号已在其他地方登陆");
//
//                    out.write(objectMapper.writeValueAsString(map));
//                    out.flush();
//                    out.close();
//                    }
//                );

        http.headers().addHeaderWriter((HttpServletRequest request, HttpServletResponse response) -> {
            response.setHeader("Access-Control-Allow-Credentials","true");
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        });
        //开启跨域访问
        http.cors();
        //开启模拟请求，比如API POST测试工具的测试，不开启时，API POST为报403错误
        http.csrf().disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/search/**");
        web.ignoring().antMatchers("/user/register");
        web.ignoring().antMatchers("/actuator/**");
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        //对默认的UserDetailsService进行覆盖
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder());
        return authenticationProvider;
    }
}
