package com.example.backend.ControllerTest;

import com.example.backend.Service.TrendService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@WebAppConfiguration
public class TrendControllerTest {
    @Autowired
    private WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;

    @MockBean
    private TrendService trendService;

    @BeforeEach()
    public void setup() throws Exception{
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    @WithMockUser(username = "root",password = "pedia_search",roles = "ADMIN")
    public void CreateTrendTest() throws Exception{
        RequestBuilder req = MockMvcRequestBuilders.post("/trend/create")
                .param("startTime","2020-09-04 17:00:00")
                .param("endTime","2020-09-04 17:20:00")
                .param("size","10")
                .accept(MediaType.ALL)
                .contentType(MediaType.ALL);

        MvcResult result = mockMvc.perform(req)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }

    @Test
    public void GetTrendTest() throws Exception{
        RequestBuilder req = MockMvcRequestBuilders.get("/trend/get")
                .accept(MediaType.ALL)
                .contentType(MediaType.ALL);

        MvcResult result = mockMvc.perform(req)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }
}
