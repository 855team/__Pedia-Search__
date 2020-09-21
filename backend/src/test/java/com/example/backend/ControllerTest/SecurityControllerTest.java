package com.example.backend.ControllerTest;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.Cookie;

import java.util.Iterator;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.logout;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.unauthenticated;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@WebAppConfiguration
public class SecurityControllerTest {
    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() throws Exception{
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).apply(springSecurity()).build();
    }

    @Test
    public void LoginSuccessTest() throws Exception{
        mockMvc
                .perform(formLogin("/login").user("root").password("pedia_search"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(authenticated());
    }

    @Test
    public void LoginFailTest() throws Exception{
        mockMvc
                .perform(formLogin("/login").user("nihility").password("123456"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(unauthenticated());
    }

    @Test
    @Rollback(true)
    @WithMockUser(username = "test",password = "123321",roles = "USER")
    public void AccessDeniedTest() throws Exception{
        RequestBuilder req = post("/user/grant")
                .param("username","root")
                .accept(MediaType.ALL)
                .contentType(MediaType.ALL);

        MvcResult result = mockMvc.perform(req)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(authenticated())
                .andReturn();
    }

    @Test
    public void LogoutTest() throws Exception{
        MvcResult login_result = mockMvc.perform(
                formLogin("/login")
                .user("root").password("pedia_search"))
                .andReturn();

        MockHttpSession session = (MockHttpSession) login_result.getRequest().getSession();

        mockMvc.perform(post("/logout").session(session))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(unauthenticated());
    }

    @Test
    public void NoLoginTest() throws Exception{
        RequestBuilder req = post("/user/checklogin")
                .accept(MediaType.ALL)
                .contentType(MediaType.ALL);

        MvcResult result = mockMvc.perform(req)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(unauthenticated())
                .andReturn();
    }

    @Test
    public void SessionInvalidationTest() throws Exception {
        MvcResult login_result = mockMvc.perform(post("/login")
                .param("username","root")
                .param("password","pedia_search"))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        MockHttpSession session = (MockHttpSession)
                login_result.getRequest().getSession();

        MvcResult logout_result = mockMvc.perform(
                post("/logout")
                        .session(session))
                .andReturn();

        RequestBuilder req = post("/user/checklogin")
                .accept(MediaType.ALL)
                .contentType(MediaType.ALL)
                .session(session);

        MvcResult timeout_result = mockMvc.perform(req)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(unauthenticated())
                .andReturn();
    }
}
