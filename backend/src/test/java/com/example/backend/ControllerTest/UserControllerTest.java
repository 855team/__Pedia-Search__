package com.example.backend.ControllerTest;

import com.example.backend.Controller.UserController;
import com.example.backend.Service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.*;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@SpringBootTest
@WebAppConfiguration
public class UserControllerTest {
    @Autowired
    private WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;

    @Autowired
    private UserController userController;

    @MockBean
    private UserService userService;

    @BeforeEach()
    public void setup() throws Exception{
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void RegisterTest() throws Exception{
        RequestBuilder req = MockMvcRequestBuilders.post("/user/register")
                .param("username","test")
                .param("password","test")
                .accept(MediaType.ALL)
                .contentType(MediaType.ALL);
        when(userService.Register(anyString(),anyString())).thenReturn(1);

        MvcResult result = mockMvc.perform(req)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }

    @Test
    public void FindRecordTest() throws Exception{
        RequestBuilder req = MockMvcRequestBuilders.post("/user/queryrecord")
                .principal(()-> "test")
                .accept(MediaType.ALL)
                .contentType(MediaType.ALL);

        List<Map<String,Object>> mapList = new LinkedList<>();
        Map<String,Object> map = new HashMap<>();
        map.put("keyword","test1");
        map.put("last_keyword","test2");
        map.put("query_time",new Date());
        mapList.add(map);

        when(userService.QueryRecord(anyString())).thenReturn(mapList);

        MvcResult result = mockMvc.perform(req)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }

    @Test
    public void SaveRecordTest() throws Exception{
        RequestBuilder req = MockMvcRequestBuilders.post("/user/saverecord")
                .principal(()-> "test")
                .param("keyword","test1")
                .param("last_keyword","test2")
                .accept(MediaType.ALL)
                .contentType(MediaType.ALL);

        MvcResult result = mockMvc.perform(req)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }

    @Test
    public void CheckLogin() throws Exception{
        RequestBuilder req = MockMvcRequestBuilders.post("/user/checklogin")
                .principal(()-> "test")
                .accept(MediaType.ALL)
                .contentType(MediaType.ALL);

        MvcResult result = mockMvc.perform(req)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }
}
